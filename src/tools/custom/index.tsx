import { IPicexToolRenderParams, PicexTool } from '../types';
import Icon from './icon.svg?react';
import { PicexToolCustomProps } from './types';

export class PicexToolCustom extends PicexTool {
	key = 'Custom';
	name = 'Edit';
	visible = true;
	disabled = false;

	constructor(protected props?: PicexToolCustomProps) {
		super();
		this.key = props?.key || this.key;
		this.name = props?.name || this.name;
		this.disabled = props?.disabled || this.disabled;
		this.visible = props?.visible || this.visible;
	}

	renderIcon() {
		return this.props?.icon || <Icon />;
	}
	renderPanel({ ctx, dispatch }: IPicexToolRenderParams) {
		return <>{this.props?.panelChildren}</>;
	}
}
