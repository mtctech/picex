import { Tabs } from 'antd';
import { IPicexToolRenderParams, PicexTool } from '../types';
import Icon from './icon.svg?react';
import Colours from './components/Colours';
import Images from './components/Images';
import { UploadBoxProps } from '@/components/common/UploadBox';
import Panel from './components/Panel';

export class PicexToolBackground extends PicexTool {
	key = 'background';
	name = 'Background';
	visible = true;
	disabled = false;

	constructor(protected props?: UploadBoxProps) {
		super();
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
