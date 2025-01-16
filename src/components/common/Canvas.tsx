import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { StaticCanvas } from 'fabric';
import { usePicexCtx, usePicexDispatch } from '@/core/context';

export function PicexCanvas({ children }: PropsWithChildren) {
	const ctx = usePicexCtx();
	const dispatch = usePicexDispatch();
	const el = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!el.current) {
			return;
		}

		const fcanvas = new StaticCanvas(el.current);
		ctx.blocks.forEach((block) => {
			fcanvas.add(block);
		});

		// dispatch({ type: 'setFcanvas', fcanvas });
	}, []);

	return (
		<div className="picex-canvas">
			<canvas ref={el}></canvas>
		</div>
	);
}
