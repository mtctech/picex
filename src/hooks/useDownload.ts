import { Block, BlockViewport } from '@/blocks';
import { BlockWaterMark } from '@/blocks';
import { usePicexCtx } from '@/core/context';
import { useRequest } from 'ahooks';
import type { Options as UseRequestOptions } from 'ahooks/lib/useRequest/src/types';
import download from 'downloadjs';
import { ImageFormat } from 'fabric';

export function useDownload(
	opts?: UseRequestOptions<boolean, [ImageFormat, string]>,
) {
	const { fcanvas, blocks } = usePicexCtx();

	return useRequest(
		async (type: ImageFormat, filename = `${Date.now()}`) => {
			if (!fcanvas || !blocks.length) {
				throw new Error('No valid image to download');
			}
			const [root, ...others] = blocks;
			const viewport = await (root as BlockViewport).cloneWithoutFill();
			const objects = await Promise.all(
				others
					.filter((block) => !(block instanceof BlockWaterMark))
					.map((x) => x.clone()),
			);
			let dataURL: string;
			const opts = {
				format: type,
				multiplier: 1,
			};

			const canvas = await fcanvas.cloneWithoutData();
			canvas.clipPath = viewport;
			canvas.add(...(objects as Exclude<Block, BlockViewport>[]));
			canvas.renderAll();
			dataURL = canvas.toDataURL(opts);

			return download(dataURL) as boolean;
		},
		{
			...opts,
			refreshDeps: [blocks],
			manual: true,
		},
	);
}
