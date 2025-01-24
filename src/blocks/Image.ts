import {
	FabricImage,
	ImageProps,
	ImageSource,
	ObjectEvents,
	TOptions,
	SerializedImageProps,
	TClassProperties,
	classRegistry,
} from 'fabric';
import { BlockTypes, IBlock, IBlockPropKeys } from './types';
import { DEBUG } from '@/utils/consts';
import { mixinHoverBorder } from './mixins/hover';

export interface SerializedBlockImageProps
	extends SerializedImageProps,
		IBlock {}

export interface BlockBackgroundProps extends ImageProps, IBlock {}

/**
 * 图片块
 * @description 实现滤镜、风格话等各种图片操作接口
 */
export class BlockImage<
		Props extends
			TOptions<BlockBackgroundProps> = Partial<BlockBackgroundProps>,
		SProps extends SerializedBlockImageProps = SerializedBlockImageProps,
		EventSpec extends ObjectEvents = ObjectEvents,
	>
	extends FabricImage<Props, SProps, EventSpec>
	implements IBlock
{
	declare blockType: BlockTypes;

	constructor(elementId: string, options?: Props);
	constructor(element: ImageSource, options?: Props);
	constructor(s: ImageSource | string, props: Partial<ImageProps>) {
		// @ts-ignore
		super(s, props);

		this.blockType = BlockTypes.Image;
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
classRegistry.setClass(BlockImage, FabricImage.type);
// to make block connected to svg Path element
classRegistry.setSVGClass(BlockImage, FabricImage.type);
