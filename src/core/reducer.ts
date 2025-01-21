import { BlockCanvas, BlockImage, BlockWaterMark } from '@/blocks';

const histories = [];

export const reducer = (state: IPicexContext, action: PicexContextAction) => {
	histories.push(action);

	switch (action.type) {
		case 'init':
			return init(state, action);
		case 'addWatermark':
			return addWatermark(state, action);
		case 'addBlock':
			return state;
		case 'removeBlock':
			return state;
	}
};

const init = (state: IPicexContext, action: PicexContentActionInit) => {
	const { images } = action;
	const width = Math.max(...images.map((image) => image.width));
	const height = Math.max(...images.map((image) => image.height));
	const nextBlocks = [
		new BlockCanvas(undefined, {
			width,
			height,
		}),
		...images.map(({ url, width, height }) => {
			const img = new Image();
			img.src = url;
			return new BlockImage(img, {
				width,
				height,
			});
		}),
	];

	return {
		...state,
		blocks: nextBlocks,
	};
};

const addWatermark = (
	state: IPicexContext,
	action: PicexContentActionAddWatermark,
) => {
	const { blocks } = state;
	const { block: blockWaterMark } = action;
	const lastBlock = blocks[blocks.length - 1];
	const nextBlocks = [
		...(lastBlock instanceof BlockWaterMark ? blocks.slice(0, -1) : blocks),
		blockWaterMark,
	];

	return {
		...state,
		blocks: nextBlocks,
	};
};
