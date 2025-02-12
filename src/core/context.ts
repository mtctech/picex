import React from 'react';
import { Block, Block4Content, BlockWaterMark } from '../blocks';
import { PicexTool } from '@/tools';
import { Canvas } from 'fabric';

declare global {
	interface Size {
		width: number;
		height: number;
	}
	interface IPicexContext {
		naturalSize?: Size;
		displaySize?: Size;
		watermark: string;
		blocks: Block[];
		tools: PicexTool[];
		currentBlock: Block | null;
		fcanvas: Canvas | null;
		error?: null | Error;
		elMenuWrapper: React.RefObject<null | HTMLElement>;
		elCanvasWrapper: React.RefObject<null | HTMLDivElement>;
		elBlockTreeWrapper: React.RefObject<null | HTMLElement>;
		elPropertiesWrapper: React.RefObject<null | HTMLElement>;
	}

	type PicexContentActionInit = {
		type: 'init';
		images: Array<
			Size & {
				url: string;
			}
		>;
		naturalSize?: Size;
		displaySize?: Size;
	};
	type PicexContentActionCover = {
		type: 'cover';
		blocks: Block[];
	};
	type PicexContentActionMount = {
		type: 'mount';
		fcanvas: Canvas;
	};
	type PicexContentActionAddWatermark = {
		type: 'addWatermark';
		block: BlockWaterMark;
	};
	type PicexContentActionAddBlock = {
		type: 'addBlock';
		block: Block4Content;
	};
	type PicexContentActionUpdateBlock = {
		type: 'updateBlock';
		block: Block;
		payload?: Record<string, any>;
	};
	type PicexContentActionRemoveBlock = { type: 'removeBlock'; block: Block };
	type PicexContextAction =
		| PicexContentActionInit
		| PicexContentActionCover
		| PicexContentActionMount
		| PicexContentActionAddWatermark
		| PicexContentActionAddBlock
		| PicexContentActionUpdateBlock
		| PicexContentActionRemoveBlock;

	type IPicexDispatch = React.Dispatch<PicexContextAction>;
}

const defaultMaxPort = {
	width: 820,
	height: 590,
};

export const DefaultPicexContext: IPicexContext = {
	naturalSize: defaultMaxPort,
	displaySize: defaultMaxPort,
	watermark: 'Picex',
	blocks: [],
	tools: [],
	currentBlock: null,
	fcanvas: null,
	elMenuWrapper: React.createRef(),
	elCanvasWrapper: React.createRef(),
	elBlockTreeWrapper: React.createRef(),
	elPropertiesWrapper: React.createRef(),
};

export const PicexContext =
	React.createContext<IPicexContext>(DefaultPicexContext);
export const PicexDispatchContext = React.createContext<IPicexDispatch>(
	() => {},
);

export const usePicexCtx = () => {
	return React.useContext(PicexContext);
};

export const usePicexDispatch = () => {
	return React.useContext(PicexDispatchContext);
};
