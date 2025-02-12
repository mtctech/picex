import { BlockViewport, BlockWaterMark } from '@/blocks';
import { WaterMark } from '@/blocks/WaterMark';
import { usePicexCtx, usePicexDispatch } from '@/core/context';
import { useEffect, useMemo } from 'react';

export function useWaterMark(input?: WaterMark) {
	const state = usePicexCtx();
	const watermark = useMemo(() => input, [JSON.stringify(input)]);
	const dispatch = usePicexDispatch();

	useEffect(() => {
		const root = state.blocks[0] as undefined | BlockViewport;
		const flag = state.blocks.some((x) => x instanceof BlockWaterMark);
		const width = root?.width;
		const height = root?.height;
		// console.log('>>> ', width, height, watermark?.value, !flag, state.blocks);
		if (width && height && watermark?.value && !flag) {
			const { value, props } = watermark;
			const options = {
				width,
				height,
			};

			(value.startsWith('http')
				? BlockWaterMark.fromURL({ value, props }, options)
				: BlockWaterMark.fromText({ value, props }, options)
			).then((block) => {
				dispatch({
					type: 'addWatermark',
					block,
				});
			});
		}
	}, [watermark, state.blocks]);
}
