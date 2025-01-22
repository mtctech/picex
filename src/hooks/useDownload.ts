import { Block, BlockViewport } from '@/blocks';
import { BlockWaterMark } from '@/blocks';
import { usePicexCtx } from '@/core/context';
import { useRequest } from 'ahooks';
import type { Options as UseRequestOptions } from 'ahooks/lib/useRequest/src/types';
import download from 'downloadjs';
import { ImageFormat } from 'fabric';

export function useDownload(opts?: UseRequestOptions<boolean, [string]>) {
	const { blocks } = usePicexCtx();

	return useRequest(
		async (type: ImageFormat, filename = `${Date.now()}`) => {
			const [rootBlock, ...objects] = blocks;
			if (!(rootBlock instanceof BlockViewport)) {
				throw new Error('No valid image to download');
			}
			const validBlocks = objects.filter(
				(block) => !(block instanceof BlockWaterMark),
			);
			let dataURL: string;
			const opts = {
				format: type,
				multiplier: 1,
			};
			if (validBlocks.length === objects.length) {
				dataURL = rootBlock.toDataURL(opts);
			} else {
				const canvas = await rootBlock.cloneWithoutData();
				canvas.backgroundColor = 'transparent';
				canvas.add(...(validBlocks as Exclude<Block, BlockViewport>[]));
				canvas.renderAll();
				dataURL = canvas.toDataURL(opts);
			}

			return download(dataURL) as boolean;
		},
		{
			...opts,
			refreshDeps: [blocks],
			manual: true,
		},
	);
}
