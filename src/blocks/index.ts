export * from './types';
import { InteractiveFabricObject } from 'fabric';
import { BlockViewport } from './Viewport';
import { BlockBackground } from './Background';
import { BlockImage } from './Image';
import { BlockWaterMark } from './WaterMark';

InteractiveFabricObject.ownDefaults = {
	...InteractiveFabricObject.ownDefaults,
	cornerStyle: 'circle',
	borderColor: '#007aff',
	borderScaleFactor: 2,
};

export type Block =
	| BlockViewport
	| BlockBackground
	| BlockImage
	| BlockWaterMark;
export { BlockViewport, BlockBackground, BlockImage, BlockWaterMark };
