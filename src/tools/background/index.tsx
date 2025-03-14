import { IPicexToolRenderParams, PicexTool } from '../types';
import Icon from './icon.svg?react';
import Panel from './components/Panel';
import './index.css';
import { PicexToolBackgroundProps } from './types';
import { PicexDesign } from '@/components/Design';
import { CSSProperties, PropsWithChildren } from 'react';

export class PicexToolBackground extends PicexTool {
	key = 'background';
	name = 'Background';
	visible = true;
	disabled = false;
	leftStyle?: CSSProperties | undefined;
	rightStyle?: CSSProperties | undefined;

	constructor(protected props?: PicexToolBackgroundProps) {
		super();

		this.name = props?.name || this.name;
		this.disabled = props?.disabled || this.disabled;
	}

	renderIcon() {
		return <Icon />;
	}
	/**
	 * 实现更改BlockCanvas纯色背景、图片背景的功能
	 */
	renderPanel({ ctx, dispatch }: IPicexToolRenderParams) {
		return (
			<Panel
				config={this.props}
				ctx={ctx}
				dispatch={dispatch}
			/>
		);
	}
}
