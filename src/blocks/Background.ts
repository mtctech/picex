import {
	classRegistry,
	FabricImage,
	FabricObjectProps,
	ObjectEvents,
	Pattern,
	Rect,
	RectProps,
	SerializedRectProps,
	TClassProperties,
	TOptions,
} from 'fabric';
import { v4 as uuid } from 'uuid';
import { BlockTypes, IBlock, IBlockPropKeys } from './types';
import { DEBUG } from '@/utils/consts';
import { mixinHoverBorder } from './mixins/hover';

export interface SerializedBlockBackgroundProps
	extends SerializedRectProps,
		IBlock {}

export interface BlockBackgroundProps extends RectProps, IBlock {}

/**
 * 画布根块
 * @description 实现背景替换等接口
 */
export class BlockBackground<
		Props extends
			TOptions<BlockBackgroundProps> = Partial<BlockBackgroundProps>,
		SProps extends
			SerializedBlockBackgroundProps = SerializedBlockBackgroundProps,
		EventSpec extends ObjectEvents = ObjectEvents,
	>
	extends Rect<Props, SProps, EventSpec>
	implements IBlock
{
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

	declare blockType: BlockTypes;

	constructor(props?: Props) {
		super(props);

		this.id = props?.id || uuid();
		this.blockType = BlockTypes.Background;
		this.hoverCursor = 'move';

		mixinHoverBorder(this);
	}

	toObject<
		T extends Omit<Props & TClassProperties<this>, keyof SProps>,
		K extends keyof T = never,
	>(propertiesToInclude: K[] = []): Pick<T, K> & SProps {
		// @ts-ignore
		return super.toObject([...propertiesToInclude, ...IBlockPropKeys]);
	}
}

// to make possible restoring from serialization
classRegistry.setClass(BlockBackground, Rect.type);
// to make block connected to svg Path element
classRegistry.setSVGClass(BlockBackground, Rect.type);
