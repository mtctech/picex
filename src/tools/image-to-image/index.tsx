import { IPicexToolRenderParams, PicexTool } from '../types';
import Icon from './icon.svg?react';
import './index.css';
import { PicexToolImageToImageProps } from './types';
import { PicexDesign } from '@/components/Design';
import { CSSProperties, ReactNode } from 'react';

export class PicexToolImageToImage extends PicexTool {
	leftStyle?: CSSProperties | undefined;
	rightStyle?: CSSProperties | undefined;
	key = 'image-to-image';
	name = 'Edit';
	visible = true;
	disabled = false;
	panelChildren: ReactNode = null;
	outputChildren: ReactNode = null;

	constructor(protected props?: PicexToolImageToImageProps) {
		super();

		this.name = props?.name || this.name;
		this.panelChildren = props?.panelChildren || this.panelChildren;
		this.outputChildren = props?.outputChildren || this.outputChildren;
		this.leftStyle = props?.leftStyle || this.leftStyle;
		this.rightStyle = props?.rightStyle || this.rightStyle;
	}

	renderIcon() {
		return <Icon />;
	}
	/**
	 * 实现更改BlockCanvas纯色背景、图片背景的功能
	 */
	renderPanel({ ctx, dispatch }: IPicexToolRenderParams) {
		if (this.panelChildren) {
			return <>{this.panelChildren}</>;
		}
		return;
	}

	renderOutput({ ctx, dispatch }: IPicexToolRenderParams) {
		if (this.outputChildren) {
			return <>{this.outputChildren}</>;
		}
	}
}
