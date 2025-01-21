import { FabricObjectProps } from 'fabric';

export enum BlockTypes {
	Background = 'background',
	Image = 'image',
	WaterMark = 'waterMark',
}

export type IBlock = Pick<
	FabricObjectProps,
	'left' | 'top' | 'width' | 'height'
> & {
	blockType: BlockTypes;
	background?: string;
	move?: (x: number, y: number) => void | Promise<void>;
	resize?: (w: number, h: number) => void | Promise<void>;
};
