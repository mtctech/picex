import React from 'react';
import { Block, BlockWaterMark } from '../blocks';
import { PicexTool } from '@/tools';
import {
	ImageProps,
	TextProps,
	StaticCanvas,
	ImageSource,
	RectProps,
} from 'fabric';

declare global {
	interface IPicexContext {
		watermark: string;
		blocks: Block[];
		tools: PicexTool[];
		currentBlock: Block | null;
		fcanvas: StaticCanvas | null;
		error?: null | Error;
		elMenuWrapper: React.RefObject<null | HTMLElement>;
		elCanvasWrapper: React.RefObject<null | HTMLElement>;
		elBlockTreeWrapper: React.RefObject<null | HTMLElement>;
		elPropertiesWrapper: React.RefObject<null | HTMLElement>;
	}

	type PicexContentActionInit = {
		type: 'init';
		images: Array<{
			url: string;
			width: number;
			height: number;
		}>;
	};
	type PicexContentActionAddWatermark = {
		type: 'addWatermark';
		block: BlockWaterMark;
	};
	type PicexContentActionAddBlock = { type: 'addBlock'; block: Block };
	type PicexContentActionRemoveBlock = { type: 'removeBlock'; block: Block };
	type PicexContextAction =
		| PicexContentActionInit
		| PicexContentActionAddWatermark
		| PicexContentActionAddBlock
		| PicexContentActionRemoveBlock;

	type IPicexDispatch = React.Dispatch<PicexContextAction>;
}

export const DefaultPicexContext: IPicexContext = {
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
