import { IPicexToolRenderParams, PicexTool } from '../types';
import Icon from './icon.svg?react';
import Panel from './components/Panel';
import './index.css';
import { PicexToolBackgroundProps } from './types';
import locale from '@/locale';

export class PicexToolBackground extends PicexTool {
	key = 'background';
	name = locale.t('background.title');
	visible = true;
	disabled = false;

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
