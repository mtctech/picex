import {
	Rect,
	FabricText,
	TextProps,
	FabricImage,
	ImageProps,
	Pattern,
	StaticCanvas,
	RectProps,
	SerializedRectProps,
	ObjectEvents,
	TOptions,
	TClassProperties,
} from 'fabric';
import { v4 as uuid } from 'uuid';
import type { Required } from 'utility-types';
import { BlockTypes, IBlock, IBlockPropKeys } from './types';

const defaultOffsetX = 20;
const defaultOffsetY = 40;

export interface WaterMark {
	value: string;
	props?: Partial<ImageProps> | Partial<TextProps>;
}

export interface SerializedBlockWaterMarkProps
	extends SerializedRectProps,
		IBlock {
	canvas: StaticCanvas;
}

export interface BlockWaterMarkProps extends RectProps, IBlock {}

/**
 * 水印块
 * @description 实现水印等接口
 */
export class BlockWaterMark<
		Props extends Required<
			TOptions<BlockWaterMarkProps>,
			'width' | 'height'
		> = Required<BlockWaterMarkProps, 'width' | 'height'>,
		SProps extends
			SerializedBlockWaterMarkProps = SerializedBlockWaterMarkProps,
		EventSpec extends ObjectEvents = ObjectEvents,
	>
	extends Rect<Props, SProps, EventSpec>
	implements IBlock
{
	blockType = BlockTypes.WaterMark;

	selectable = false;

	evented = false;

	hasControls = false;

	static async fromURL(
		{ value, props }: WaterMark,
		rectOpts: Required<Partial<RectProps>, 'width' | 'height'>,
	) {
		const mark = await FabricImage.fromURL(value, undefined, {
			...props,
			left: defaultOffsetX,
			top: defaultOffsetY,
		});

		return BlockWaterMark.fromWatermark(mark, rectOpts);
	}

	static async fromText(
		{ value, props }: WaterMark,
		rectOpts: Required<Partial<RectProps>, 'width' | 'height'>,
	) {
		const text = new FabricText(value, {
			fontFamily: 'Arial',
			fontSize: 12,
			fill: 'rgba(0,0,0,0.3)',
			stroke: 'rgba(255,255,255,0.3)',
			strokeWidth: 1,
			left: defaultOffsetX,
			top: defaultOffsetY,
			...props,
		});

		return BlockWaterMark.fromWatermark(text, rectOpts);
	}

	static async fromWatermark(
		object: FabricImage | FabricText,
		rectOpts: Required<Partial<RectProps>, 'width' | 'height'>,
		offsetX = defaultOffsetX,
		offsetY = defaultOffsetY,
	) {
		const w = object.getScaledWidth();
		const h = object.getScaledHeight();
		const size = {
			width: w * 2 + offsetX * 2,
			height: h * 2 + offsetY * 2,
		};
		const cloned = await object.clone();
		cloned.set({
			left: w + offsetX * 2,
			top: h + offsetY * 2,
		});

		const patternSourceCanvas = new StaticCanvas(undefined, size);
		patternSourceCanvas.add(object, cloned);

		return new BlockWaterMark({
			canvas: patternSourceCanvas,
			...rectOpts,
		});
	}

	constructor(props: Props) {
		const { canvas, fill, width, height } = props;
		const pattern =
			fill instanceof Pattern
				? fill
				: new Pattern({
						source: canvas.getElement(),
						repeat: 'repeat',
					});

		super({
			angle: 15,
			top: -height,
			...props,
			canvas: undefined,
			fill: pattern,
			width: width * 2,
			height: height * 2,
		});

		this.id = props?.id || uuid();
	}

	toObject<
		T extends Omit<Props & TClassProperties<this>, keyof SProps>,
		K extends keyof T = never,
	>(propertiesToInclude: K[] = []): Pick<T, K> & SProps {
		// @ts-ignore
		return super.toObject([...propertiesToInclude, ...IBlockPropKeys]);
	}
}
