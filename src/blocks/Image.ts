import { FabricImage, ImageProps, ImageSource } from 'fabric';
import { BlockTypes, IBlock } from './types';
import { DEBUG } from '@/utils/consts';
import { mixinHoverBorder } from './mixins/hover';

/**
 * 图片块
 * @description 实现滤镜、风格话等各种图片操作接口
 */
export class BlockImage extends FabricImage implements IBlock {
	blockType = BlockTypes.Image;

	hoverCursor = 'move';

	constructor(s: ImageSource | string, props: Partial<ImageProps>) {
		super(s as string, props);

		mixinHoverBorder(this);
	}
}
