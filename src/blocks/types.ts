import { FabricObjectProps } from 'fabric';

export enum BlockTypes {
	Background = 'background',
	Image = 'image',
}

export type IBlock = Pick<
	FabricObjectProps,
	'left' | 'top' | 'originX' | 'originY' | 'width' | 'height'
> & {
	type: BlockTypes;
	background?: string;
	move: (x: number, y: number) => Promise<void>;
	resize: (w: number, h: number) => Promise<void>;
};
