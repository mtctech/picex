import { FabricImage } from 'fabric';
import { BlockTypes, IBlock } from './types';
import { DEBUG } from '@/utils/consts';

/**
 * 图片块
 * @description 实现滤镜、风格话等各种图片操作接口
 */
export class BlockImage extends FabricImage implements IBlock {
	blockType = BlockTypes.Image;

	selectable = true;

	hasControls = true;

	stroke = DEBUG ? 'green' : null;
}
