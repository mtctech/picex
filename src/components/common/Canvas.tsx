import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { usePicexCtx, usePicexDispatch } from '@/core/context';
import { BlockCanvas } from '@/blocks';
import { Block } from '@/blocks';

export function PicexCanvas({ children }: PropsWithChildren) {
	const ctx = usePicexCtx();
	const dispatch = usePicexDispatch();
	const el = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!el.current) {
			return;
		}
		const [fcanvas, ...objects] = ctx.blocks;
		if (!fcanvas || !(fcanvas instanceof BlockCanvas)) {
			return;
		}

		const canvas = fcanvas.getElement();
		if (!el.current.contains(canvas)) {
			el.current.appendChild(canvas);
		}

		fcanvas.add(...(objects as Exclude<Block, BlockCanvas>[]));
		fcanvas.renderAll();

		// dispatch({
		// 	type: 'rendered',
		// 	fcanvas,
		// 	elCanvasWrapper: el.current,
		// });
	}, [ctx.blocks]);

	return (
		<div
			ref={el}
			className="picex-canvas"
		></div>
	);
}
