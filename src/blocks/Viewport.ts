import {
	classRegistry,
	ObjectEvents,
	Pattern,
	Rect,
	RectProps,
	SerializedRectProps,
	TClassProperties,
	TFiller,
	TOptions,
} from 'fabric';
import { v4 as uuid } from 'uuid';
import { BlockTypes, IBlock, IBlockPropKeys } from './types';
import { getTransparentUnitCanvas } from '@/utils/image';

export interface SerializedBlockViewportProps
	extends SerializedRectProps,
		IBlock {}

export interface BlockViewportProps extends RectProps, IBlock {}

/**
 * 画布根块
 * @description 实现背景替换等接口
 */
export class BlockViewport<
		Props extends TOptions<BlockViewportProps> = Partial<BlockViewportProps>,
		SProps extends SerializedBlockViewportProps = SerializedBlockViewportProps,
		EventSpec extends ObjectEvents = ObjectEvents,
	>
	extends Rect<Props, SProps, EventSpec>
	implements IBlock
{
	declare blockType: BlockTypes;

	constructor(props?: Props) {
		super(props);

		this.id = props?.id || uuid();
		this.blockType = BlockTypes.Viewport;
		this.selectable = false;
		this.evented = false;
		this.hasControls = false;
	}

	fill: TFiller | string | null = (() => {
		const canvas = getTransparentUnitCanvas();

		return new Pattern({
			source: canvas,
			repeat: 'repeat',
		});
	})();

	async cloneWithoutFill() {
		const cloned = await this.clone();
		cloned.fill = null;

		return cloned;
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
classRegistry.setClass(BlockViewport, Rect.type);
// to make block connected to svg Path element
classRegistry.setSVGClass(BlockViewport, Rect.type);
