import { Block, BlockViewport } from '@/blocks';
import { BlockWaterMark } from '@/blocks';
import { usePicexCtx } from '@/core/context';
import { scaleToFitSize } from '@/utils/scale';
import { useRequest } from 'ahooks';
import type { Options as UseRequestOptions } from 'ahooks/lib/useRequest/src/types';
import download from 'downloadjs';
import { ImageFormat, StaticCanvas } from 'fabric';

export function useDownload(
	opts?: UseRequestOptions<boolean, [ImageFormat, string | undefined]>,
) {
	const { fcanvas, blocks, naturalSize } = usePicexCtx();

	return useRequest(
		async (type: ImageFormat, filename = `${Date.now()}`) => {
			if (!fcanvas || !blocks.length) {
				throw new Error('No valid image to download');
			}
			const [root, ...others] = blocks;
			const viewport = root as BlockViewport;
			const size = naturalSize ?? {
				width: viewport.width,
				height: viewport.height,
			};
			const objects = (await Promise.all(
				others
					.filter((block) => !(block instanceof BlockWaterMark))
					.map((x) => x.clone()),
			)) as Exclude<Block, BlockViewport>[];
			// const viewport = (root as BlockViewport).cloneWithoutFill();
			let dataURL: string;
			const opts = {
				format: type,
				multiplier: 1,
				...size,
			};

			// viewport size has same ratio with natural size
			const canvas = new StaticCanvas(undefined, size);
			const scaleX = size.width / viewport.width;
			const scaleY = size.height / viewport.height;
			objects.map((x) => {
				x.left -= viewport.getX();
				x.left *= scaleX;
				x.top -= viewport.getY();
				x.top *= scaleY;
				x.scaleX *= scaleX;
				x.scaleY *= scaleY;
				canvas.add(x);
			});
			canvas.renderAll();
			dataURL = canvas.toDataURL(opts);

			return download(dataURL, filename) as boolean;
		},
		{
			...opts,
			refreshDeps: [blocks, naturalSize],
			manual: true,
		},
	);
}
