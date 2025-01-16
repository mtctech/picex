import React from 'react';
import { Block } from '../blocks';
import { PicexTool } from '@/tools';
import { StaticCanvas } from 'fabric';

interface IPicexContext {
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

type PicexContextAction =
	| { type: 'addBlock'; block: Block }
	| { type: 'removeBlock'; block: Block };

export const DefaultPicexContext: PicexContext = {
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
export const PicexDispatchContext = React.createContext<
	React.Dispatch<PicexContextAction>
>(() => {});

export const usePicexCtx = () => {
	return React.useContext(PicexContext);
};

export const usePicexDispatch = () => {
	return React.useContext(PicexDispatchContext);
};
