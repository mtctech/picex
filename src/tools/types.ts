import { ReactNode } from 'react';

export type IPicexToolRenderParams = {
	ctx: IPicexContext;
	dispatch: IPicexDispatch;
	tool?: PicexTool;
};

export abstract class PicexTool {
	abstract key: string;
	abstract name: string;
	abstract visible: boolean;
	abstract disabled: boolean;
	abstract leftStyle?: React.CSSProperties & { className?: string };
	abstract rightStyle?: React.CSSProperties & { className?: string };

	toggle(v = !this.visible) {
		this.visible = v;
	}

	toggleDisabled(v = !this.disabled) {
		this.disabled = v;
	}

	abstract renderIcon(params: IPicexToolRenderParams): ReactNode;

	abstract renderPanel(params: IPicexToolRenderParams): ReactNode;

	renderOutput?(params: IPicexToolRenderParams): ReactNode;
}
