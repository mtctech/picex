import { FabricObjectProps } from 'fabric';

export enum BlockTypes {
	Viewport = 'viewport',
	Background = 'background',
	Image = 'image',
	WaterMark = 'waterMark',
}

export const IBlockPropKeys = ['blockType'] as const;

export type IBlock = Pick<
	FabricObjectProps,
	'left' | 'top' | 'width' | 'height'
> & {
	blockType: BlockTypes;
	// move?: (x: number, y: number) => void | Promise<void>;
	// resize?: (w: number, h: number) => void | Promise<void>;
};
