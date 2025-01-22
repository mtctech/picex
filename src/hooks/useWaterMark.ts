import { BlockViewport, BlockWaterMark } from '@/blocks';
import { WaterMark } from '@/blocks/WaterMark';
import { usePicexCtx, usePicexDispatch } from '@/core/context';
import { usePrevious } from 'ahooks';
import { useEffect } from 'react';

export function useWaterMark(watermark?: WaterMark) {
	const state = usePicexCtx();
	const dispatch = usePicexDispatch();
	const root = state.blocks[0] as undefined | BlockViewport;
	const width = root?.width;
	const height = root?.height;

	useEffect(() => {
		if (width && height && watermark?.value) {
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
	}, [watermark, width, height]);
}
