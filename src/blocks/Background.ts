import {
	FabricImage,
	FabricObjectProps,
	Pattern,
	Rect,
	RectProps,
} from 'fabric';
import { BlockTypes, IBlock } from './types';
import { DEBUG } from '@/utils/consts';
import { mixinHoverBorder } from './mixins/hover';

/**
 * 画布根块
 * @description 实现背景替换等接口
 */
export class BlockBackground extends Rect implements IBlock {
	static async patternFromURL(
		url: string,
		size: Pick<FabricObjectProps, 'width' | 'height'>,
	) {
		const img = await FabricImage.fromURL(url);
		if (size.width > size.height) {
			img.scaleToWidth(size.width);
		} else {
			img.scaleToHeight(size.height);
		}
		return new Pattern({
			source: img.getElement(),
			repeat: 'no-repeat',
		});
	}

	static async fromColour(
		hex: string,
		size: Pick<FabricObjectProps, 'width' | 'height'>,
	) {
		return new BlockBackground({
			...size,
			fill: hex,
		});
	}

	static async fromURL(
		url: string,
		size: Pick<FabricObjectProps, 'width' | 'height'>,
	) {
		const pattern = await BlockBackground.patternFromURL(url, size);
		const { width, height } = pattern.source as HTMLImageElement;

		return new BlockBackground({
			width,
			height,
			fill: pattern,
		});
	}

	blockType = BlockTypes.Background;

	hoverCursor = 'move';

	constructor(props: Partial<RectProps>) {
		super(props);

		mixinHoverBorder(this);
	}
}
