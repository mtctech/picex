import { BlockViewport, BlockImage, BlockWaterMark } from '@/blocks';
import { getScaledFitSize, scaleToFitSize } from '@/utils/scale';
import { wrapHistory } from './history';
import { isSameSecondLevelDomain } from '@/utils/dom';
export const reducer = wrapHistory(
	(state: IPicexContext, action: PicexContextAction) => {
		switch (action.type) {
			case 'init':
				return init(state, action);
			case 'cover':
				return cover(state, action);
			case 'mount':
				return mount(state, action);
			case 'addWatermark':
				return addWatermark(state, action);
			case 'addBlock':
				return addBlock(state, action);
			case 'updateBlock':
				return updateBlock(state, action);
			case 'removeBlock':
				return removeBlock(state, action);
			default:
				return state;
		}
	},
);

const init = (state: IPicexContext, action: PicexContentActionInit) => {
	const {
		images,
		naturalSize: size,
		displaySize: maxSize = state.displaySize,
	} = action;
	// const width = Math.max(...images.map((image) => image.width));
	// const height = Math.max(...images.map((image) => image.height));
	const viewport = !size ? maxSize! : getScaledFitSize(size, maxSize!);
	const blockViewport = new BlockViewport(viewport);

	const nextBlocks = [
		blockViewport,
		...images.map(({ url, width, height, loadedImage }) => {
			const img = loadedImage || new Image();
			if (!loadedImage) {
				if (isSameSecondLevelDomain(url, window.location.origin)) {
					img.crossOrigin = 'use-credentials';
				} else {
					img.crossOrigin = 'anonymous';
				}
				img.src = url;
			}

			const block = new BlockImage(img, {
				width,
				height,
			});

			scaleToFitSize(block, viewport);
			return block;
		}),
	];

	return {
		...state,
		naturalSize: size,
		displaySize: maxSize,
		blocks: nextBlocks,
	};
};

const cover = (state: IPicexContext, action: PicexContentActionCover) => {
	const { blocks } = action;

	return {
		...state,
		blocks,
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
		block.setCoords();
	}

	return {
		...state,
		blocks: [...blocks],
	};
};

const removeBlock = (
	state: IPicexContext,
	action: PicexContentActionRemoveBlock,
) => {
	const { blocks } = state;
	const { block: removedBlock } = action;
	const nextBlocks = blocks.filter((block) => block !== removedBlock);

	return {
		...state,
		blocks: nextBlocks,
	};
};
