import { CSSProperties, ReactNode } from 'react';
import { PicexTool } from '../types';

export class PicexToolResize extends PicexTool {
	leftStyle?: CSSProperties | undefined;
	rightStyle?: CSSProperties | undefined;
	key = 'resize';
	icon = 'resize';
	name = 'Resize';
	visible = true;
	disabled = false;

	renderIcon() {
		return null;
	}
	/**
	 * 实现更改BlockCanvas大小的功能
	 */
	renderPanel() {
		return null;
	}
}
