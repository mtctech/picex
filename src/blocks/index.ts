export * from './types';
import { BlockViewport } from './Viewport';
import { BlockBackground } from './Background';
import { BlockImage } from './Image';
import { BlockWaterMark } from './WaterMark';

export type Block =
	| BlockViewport
	| BlockBackground
	| BlockImage
	| BlockWaterMark;
export { BlockViewport, BlockBackground, BlockImage, BlockWaterMark };
