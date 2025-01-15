import React from 'react';
import { Block } from '../blocks';

interface PicexContext {
	blocks: Block[];
	currentBlock: Block | null;
	fcanvas: null;
	error?: null | Error;
	elMenuWrapper: React.RefObject<null | HTMLElement>;
	elCanvasWrapper: React.RefObject<null | HTMLElement>;
	elBlockTreeWrapper: React.RefObject<null | HTMLElement>;
	elPropertiesWrapper: React.RefObject<null | HTMLElement>;
}

export const DefaultPicexContext: PicexContext = {
	blocks: [],
	currentBlock: null,
	fcanvas: null,
	elMenuWrapper: React.createRef(),
	elCanvasWrapper: React.createRef(),
	elBlockTreeWrapper: React.createRef(),
	elPropertiesWrapper: React.createRef(),
};

export const PicexContext = React.createContext(null);

export const usePicexCtx = () => {
	return React.useContext(PicexContext);
};
