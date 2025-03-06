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
	}

	renderIcon() {
		return <Icon />;
	}
	renderPanel({ ctx, dispatch }: IPicexToolRenderParams) {
		return <>{this.props?.panelChildren}</>;
	}
}
