export * from './types';
import { BlockCanvas } from './Canvas';
import { BlockImage } from './Image';
import { BlockWaterMark } from './WaterMark';

export type Block = BlockCanvas | BlockImage | BlockWaterMark;
export { BlockCanvas, BlockImage, BlockWaterMark };
