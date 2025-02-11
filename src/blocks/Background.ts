import {
	classRegistry,
	FabricImage,
	FabricObjectProps,
	ObjectEvents,
	Pattern,
	Rect,
	RectProps,
	SerializedRectProps,
	StaticCanvas,
	TClassProperties,
	TFiller,
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
		if (img.width > img.height) {
			img.scaleToWidth(size.width);
		} else {
			img.scaleToHeight(size.height);
		}
		const canvas = new StaticCanvas(undefined, {
			width: img.getScaledWidth(),
			height: img.getScaledHeight(),
		});
		canvas.add(img);
		canvas.renderAll();
		return new Pattern({
			source: canvas.toCanvasElement(),
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
		const { width, height } = pattern.source as
			| HTMLImageElement
			| HTMLCanvasElement;

		return new BlockBackground({
			width,
			height,
			fill: pattern,
		});
	}

	declare blockType: BlockTypes;

	declare _fill: string | TFiller | null;

	// @ts-ignore
	get fill() {
		return this._fill;
	}

	set fill(v: string | TFiller | null) {
		this._fill = v;
		this.toggleSelectable();
	}

	constructor(props?: Props) {
		super(props);

		this.id = props?.id || uuid();
		this.blockType = BlockTypes.Background;
		this.toggleSelectable();

		mixinHoverBorder(this);
	}

	toggleSelectable() {
		const controlable = this?.fill instanceof Pattern;
		this.selectable = controlable;
		this.hoverCursor = controlable ? 'move' : 'default';
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
