import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { usePicexCtx, usePicexDispatch } from '@/core/context';
import { Canvas } from 'fabric';
import { Block, BlockTypes } from '@/blocks';
import { isContentBlock } from '@/blocks/utils';
// import 'fabric-history/src/index';

export function PicexCanvas({ children }: PropsWithChildren) {
	const ctx = usePicexCtx();
	const dispatch = usePicexDispatch();
	const { elCanvasWrapper } = ctx;
	const elCanvas = useRef<HTMLCanvasElement>(null);
	const refCanvas = useRef<Canvas>(null);

	useEffect(() => {
		if (refCanvas.current) {
			return;
		}
		const fcanvas = new Canvas(elCanvas.current!, {
			width: window.screen.width,
			height: window.screen.height,
			backgroundColor: 'transparent',
			hoverCursor: 'default',
			// clip时忽略controls部分
			controlsAboveOverlay: true,
			// control时保持对象层级
			preserveObjectStacking: true,
		});

		refCanvas.current = fcanvas;

		dispatch({
			type: 'mount',
			fcanvas,
		});
	}, []);

	useEffect(() => {
		if (!elCanvas.current) {
			return;
		}
		const fcanvas = ctx.fcanvas || refCanvas.current;
		const { blocks: nextBlocks } = ctx;
		if (!fcanvas || !nextBlocks.length) {
			return;
		}
		const currBlocks = [...(fcanvas._objects as Block[])];
		const isInit =
			!currBlocks.length || currBlocks[0]?.id !== nextBlocks[0]?.id;
		const isAddOrRemove =
			!isInit &&
			!fcanvas.history?.isProcessing() &&
			(nextBlocks.some(
				(block) => !currBlocks.includes(block) && isContentBlock(block),
			) ||
				currBlocks.some(
					(block) => !nextBlocks.includes(block) && isContentBlock(block),
				));
		const getHistroyAction = (prev: Block[], next: Block[]) => async () => {
			dispatch({
				type: 'cover',
				blocks: prev,
			});
			return getHistroyAction(next, prev);
		};

		fcanvas.history?.disable();
		fcanvas.clear();
		nextBlocks.forEach((block) => {
			fcanvas.add(block);
			// should check if same id because of block clone cache by history
			if (!currBlocks.some((item) => item === block || item.id === block.id)) {
				fcanvas.centerObject(block);
			}
		});
		fcanvas.clipPath = nextBlocks[0];
		fcanvas.renderAll();
		fcanvas.history?.enable();

		if (isInit) {
			fcanvas.history?.clear();
		}
		if (isAddOrRemove) {
			Promise.all(currBlocks.map((x) => x.clone())).then((prevBlocks) => {
				fcanvas.history?.append(getHistroyAction(prevBlocks, nextBlocks));
			});
		}
	}, [ctx]);

	return (
		<div
			ref={elCanvasWrapper}
			className="picex-canvas w-full h-full overflow-hidden flex justify-center items-center"
		>
			<canvas ref={elCanvas} />
		</div>
	);
}
