import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { usePicexCtx, usePicexDispatch } from '@/core/context';
import { Canvas } from 'fabric';

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
		const { blocks } = ctx;
		if (!fcanvas || !blocks.length) {
			return;
		}

		blocks.forEach((block) => {
			if (fcanvas.contains(block)) {
				fcanvas.remove(block);
			}
			fcanvas.add(block);
			fcanvas.centerObject(block);
		});
		fcanvas.clipPath = blocks[0];
		fcanvas.renderAll();
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
