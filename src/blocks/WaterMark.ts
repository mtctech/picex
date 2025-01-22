import {
	Rect,
	FabricText,
	TextProps,
	FabricImage,
	ImageProps,
	Pattern,
	StaticCanvas,
	RectProps,
} from 'fabric';
import type { Required } from 'utility-types';
import { BlockTypes, IBlock } from './types';

const defaultOffsetX = 20;
const defaultOffsetY = 40;

export interface WaterMark {
	value: string;
	props?: ImageProps | TextProps;
}

/**
 * 水印块
 * @description 实现水印等接口
 */
export class BlockWaterMark extends Rect implements IBlock {
	blockType = BlockTypes.WaterMark;

	selectable = false;

	hasControls = false;

	hoverCursor = null;

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
		const size = {
			width: object.width * 2 + offsetX * 2,
			height: object.height * 2 + offsetY * 2,
		};
		const cloned = await object.clone();
		cloned.set({
			left: object.width + offsetX * 2,
			top: object.height + offsetY * 2,
		});

		const patternSourceCanvas = new StaticCanvas(undefined, size);
		patternSourceCanvas.add(object, cloned);

		return new BlockWaterMark(patternSourceCanvas, {
			top: -rectOpts.height,
			...rectOpts,
		});
	}

	constructor(
		canvas: StaticCanvas,
		{
			width,
			height,
			...options
		}: Required<Partial<RectProps>, 'width' | 'height'>,
	) {
		const pattern = new Pattern({
			source: canvas.getElement(),
			repeat: 'repeat',
		});

		super({
			angle: 15,
			width: width * 2,
			height: height * 2,
			top: -height,
			...options,
			fill: pattern,
		});
	}
}
