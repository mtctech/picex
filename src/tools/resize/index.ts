import { PicexTool } from '../types';

export class ToolResize extends PicexTool {
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
		return;
	}
}
