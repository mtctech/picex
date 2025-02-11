import { IBlock } from '@/blocks';
import * as fabric from 'fabric';
import { SerializedObjectProps } from 'fabric';
import { Reducer } from 'react';

declare module 'fabric' {
	interface Canvas {
		history?: FabricHistory;
		// historyUndo?: unknown[];
		// historyRedo?: unknown[];
		// undo(): void;
		// redo(): void;
		// clearHistory(): void;
		// onHistory(): void;
		// offHistory(): void;
	}

	interface CanvasEvents {
		'history:append': () => void;
		'history:clear': () => void;
		'history:undo': () => void;
		'history:redo': () => void;
	}
}

enum HistoryTypes {
	ADDED,
	REMOVED,
	MODIFIED,
}
type HistoryAction = () => HistoryAction | Promise<HistoryAction>;
type HistoryItem =
	| {
			type: HistoryTypes;
			object: fabric.FabricObject;
			data: ReturnType<fabric.FabricObject['toObject']>;
			index: number;
	  }
	| HistoryAction;

class FabricHistory {
	historyUndo: HistoryItem[] = [];

	historyRedo: HistoryItem[] = [];

	protected _historyProcessing = false;
	protected _historyDisabled = false;

	constructor(private canvas: fabric.Canvas) {
		this.canvas.on({
			'object:added': (e) => this._saveHistory(e, HistoryTypes.ADDED),
			'object:removed': (e) => this._saveHistory(e, HistoryTypes.REMOVED),
			'object:modified': (e) => this._saveHistory(e, HistoryTypes.MODIFIED),
			'text:changed': (e) => this._saveHistory(e, HistoryTypes.MODIFIED),
			// maybe path support in future
		});
	}

	isProcessing() {
		return this._historyProcessing;
	}

	disable() {
		this._historyDisabled = true;
	}

	enable() {
		this._historyDisabled = false;
	}

	async undo() {
		this._historyProcessing = true;

		const p = this.historyUndo.pop();
		if (p) {
			this._saveReverse(p, true);
			const action = await this._applyState(p);
			if (action) {
				this.append(action, true);
			}

			this.canvas.fire('history:undo');
		}

		this._historyProcessing = false;
	}

	async redo() {
		this._historyProcessing = true;

		const p = this.historyRedo.pop();
		if (p) {
			this._saveReverse(p);
			const action = await this._applyState(p);
			if (action) {
				this.append(action);
			}

			this.canvas.fire('history:redo');
		}

		this._historyProcessing = false;
	}

	append(item: HistoryItem, undoing = false) {
		if (this._historyDisabled) return;

		if (undoing) {
			this.historyRedo.push(item);
		} else {
			this.historyUndo.push(item);
			if (!this._historyProcessing) {
				this.historyRedo = [];
			}
		}
		this.canvas.fire('history:append');
	}

	clear() {
		this.historyUndo = [];
		this.historyRedo = [];
		this.canvas.fire('history:clear');
	}

	_saveReverse(item: HistoryItem, undoing = false) {
		if (typeof item === 'function') {
			return;
		}
		const { object, data, type } = item;
		const snapshot = {
			type: {
				[HistoryTypes.REMOVED]: HistoryTypes.ADDED,
				[HistoryTypes.ADDED]: HistoryTypes.REMOVED,
				[HistoryTypes.MODIFIED]: HistoryTypes.MODIFIED,
			}[type],
			object,
			index: this.canvas.getObjects().indexOf(object),
			data: type === HistoryTypes.MODIFIED ? object.toObject() : data,
		};

		this.append(snapshot, undoing);
	}

	_saveHistory(
		{
			target,
			transform,
		}: {
			target: fabric.FabricObject;
			transform?: {
				original?: fabric.Transform['original'];
			};
		},
		type: HistoryTypes,
	) {
		if (this._historyProcessing || !target || !target.evented) return;

		const snapshot = {
			type,
			object: target,
			index: this.canvas.getObjects().indexOf(target),
			data: transform?.original ?? target.toObject(),
		};

		this.append(snapshot);
	}

	async _applyState(snapshot: HistoryItem) {
		if (typeof snapshot === 'function') {
			return snapshot();
		}

		const { object, type, data, index } = snapshot;
		switch (type) {
			case HistoryTypes.ADDED:
				this.canvas.remove(object);
				break;
			case HistoryTypes.REMOVED:
				this.canvas.add(object);
				this.canvas.moveObjectTo(object, index);
				break;
			case HistoryTypes.MODIFIED:
				const target = this.canvas._objects.find(
					(x) => x === object || x.id === object.id,
				);
				if (target) {
					const options = await fabric.util.enlivenObjectEnlivables(data);
					target.set(options);
				}
				break;
		}
		object.setCoords();
		this.canvas.renderAll();
	}
}

export function wrapHistory(
	reducer: Reducer<IPicexContext, PicexContextAction>,
) {
	return (state: IPicexContext, action: PicexContextAction) => {
		const { fcanvas } = state;

		// const { blocks } = fcanvas;
		const nextState = reducer(state, action);
		// const { blocks: nextBlocks } = nextState;

		if (fcanvas && !fcanvas?.history) {
			fcanvas.history = new FabricHistory(fcanvas);
		}

		// if (!fcanvas?._objects.length || !fcanvas?.contains(nextBlocks[0]!)) {
		// 	fcanvas?.history?.clear();
		// }

		return nextState;
	};
}
