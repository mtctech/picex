import { BlockViewport, BlockImage, BlockWaterMark } from '@/blocks';
import { scaleToFitSize } from '@/utils/scale';

export const reducer = (state: IPicexContext, action: PicexContextAction) => {
	switch (action.type) {
		case 'init':
			return init(state, action);
		case 'mount':
			return mount(state, action);
		case 'addWatermark':
			return addWatermark(state, action);
		case 'addBlock':
			return addBlock(state, action);
		case 'updateBlock':
			return updateBlock(state, action);
		case 'removeBlock':
			return state;
		default:
			return state;
	}
};

const init = (state: IPicexContext, action: PicexContentActionInit) => {
	const { images, viewport: size } = action;
	// const width = Math.max(...images.map((image) => image.width));
	// const height = Math.max(...images.map((image) => image.height));
	const viewport = new BlockViewport({
		...size,
	});
	const nextBlocks = [
		viewport,
		...images.map(({ url, width, height }) => {
			const img = new Image();
			img.src = url;

			const block = new BlockImage(img, {
				width,
				height,
			});
			scaleToFitSize(block, size);
			return block;
		}),
	];

	return {
		...state,
		blocks: nextBlocks,
	};
};

const mount = (state: IPicexContext, action: PicexContentActionMount) => {
	const { fcanvas } = action;

	return {
		...state,
		fcanvas,
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

const addBlock = (state: IPicexContext, action: PicexContentActionAddBlock) => {
	const { blocks = [] } = state;
	const { block } = action;

	const [viewport, ...rest] = blocks;

	return {
		...state,
		blocks: viewport ? [viewport, block, ...rest] : blocks,
	};
};

const updateBlock = (
	state: IPicexContext,
	action: PicexContentActionUpdateBlock,
) => {
	const { blocks } = state;
	const { block, payload } = action;
	if (payload) {
		block.set(payload);
	}

	return {
		...state,
		blocks: [...blocks],
	};
};
