import { PicexTool } from '../types';

export class ToolBackground extends PicexTool {
	key = 'background';
	icon = 'background';
	name = 'Background';
	visible = true;
	disabled = false;

	renderIcon() {
		return null;
	}
	/**
	 * 实现更改BlockCanvas纯色背景、图片背景的功能
	 */
	renderPanel() {
		return;
	}
}
