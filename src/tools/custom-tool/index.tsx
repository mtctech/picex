import { IPicexToolRenderParams, PicexTool } from '../types';
import Icon from './icon.svg?react';
import './index.css';
import { PicexToolCustomProps } from './types';
import { PicexDesign } from '@/components/Design';
import { CSSProperties, ReactNode } from 'react';

export class PicexToolCustom extends PicexTool {
	leftStyle?: CSSProperties | undefined;
	rightStyle?: CSSProperties | undefined;
	panelChildren: ReactNode = null;
	key = 'custom';
	name = 'Custom';
	visible = true;
	disabled = false;

	constructor(protected props?: PicexToolCustomProps) {
		super();

		this.name = props?.name || this.name;
		this.key = props?.key || this.key;
		this.panelChildren = props?.panelChildren || this.panelChildren;
		this.leftStyle = props?.leftStyle || this.leftStyle;
		this.rightStyle = props?.rightStyle || this.rightStyle;
	}

	renderIcon() {
		return <Icon />;
	}
	renderPanel({ ctx, dispatch }: IPicexToolRenderParams) {
		if (this.panelChildren) {
			return <>{this.panelChildren}</>;
		}
		return;
	}
}
