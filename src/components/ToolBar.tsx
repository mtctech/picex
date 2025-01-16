import { Tabs } from 'antd';
import React from 'react';
import { PicexTool } from '../tools/types';
import { usePicexCtx, usePicexDispatch } from '../core/context';
import './ToolBar.css';

export interface PicexToolBarProps {
	tools: PicexTool[];
}

/**
 * 左侧工具栏
 * @description 根据配置初始化并渲染工具栏
 */
export function PicexToolBar({ tools }: PicexToolBarProps) {
	const ctx = usePicexCtx();
	const dispatch = usePicexDispatch();

	return (
		<Tabs
			size="small"
			type="card"
			tabPosition="left"
			className="picex-toolbar w-full h-full"
			items={tools.map((tool) => {
				return {
					key: tool.key,
					label: (
						<span className="max-w-12 inline-flex flex-col items-center gap-1">
							<i className="w-12 h-12 rounded-full bg-[rgb(31,135,252,0.1)]  overflow-hidden flex items-center justify-center">
								{tool.renderIcon?.({ ctx, dispatch })}
							</i>
							<span className="text-sm leading-[1]">{tool.name}</span>
						</span>
					),
					children: (
						<div className="px-4 py-5 overflow-y-auto h-full">
							{tool.renderPanel?.({ ctx, dispatch })}
						</div>
					),
				};
			})}
		/>
	);
}
