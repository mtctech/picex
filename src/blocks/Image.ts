import { FabricImage } from 'fabric';
import { IBlock } from './types';

/**
 * 图片块
 * @description 实现滤镜、风格话等各种图片操作接口
 */
export class BlockImage extends FabricImage implements IBlock {}
