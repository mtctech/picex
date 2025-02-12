import { Block, BlockViewport } from '@/blocks';
import { BlockWaterMark } from '@/blocks';
import { usePicexCtx } from '@/core/context';
import { useRequest } from 'ahooks';
import type { Options as UseRequestOptions } from 'ahooks/lib/useRequest/src/types';
import download from 'downloadjs';
import { ImageFormat } from 'fabric';

export function useDownload(
	opts?: UseRequestOptions<boolean, [ImageFormat, string | undefined]>,
) {
	const { fcanvas, blocks, naturalSize: size } = usePicexCtx();

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
				...size,
			};

			const canvas = await fcanvas.cloneWithoutData();
			canvas.setWidth(viewport.width);
			canvas.setHeight(viewport.height);
			// canvas.clipPath = viewport;
			(objects as Exclude<Block, BlockViewport>[]).map((x) => {
				canvas.add(x);
				canvas.centerObject(x);
			});
			canvas.renderAll();
			dataURL = canvas.toDataURL(opts);

			return download(dataURL, filename) as boolean;
		},
		{
			...opts,
			refreshDeps: [blocks, size],
			manual: true,
		},
	);
}
