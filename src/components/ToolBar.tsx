import { Tabs } from 'antd';
import React from 'react';
import { PicexTool } from '../tools/types';
import { usePicexCtx } from '../core/context';
export interface PicexToolBarProps {
	tools: PicexTool[];
}

/**
 * 左侧工具栏
 * @description 根据配置初始化并渲染工具栏
 */
export function PicexToolBar({ tools }: PicexToolBarProps) {
	const ctx = usePicexCtx();

	return (
		<Tabs
			tabPosition="left"
			items={tools.map((tool) => {
				return {
					key: tool.key,
					label: tool.renderIcon?.(ctx) ?? (
						<span className="inline-flex flex-col items-center gap-2">
							{tool.icon}
							<span className="text-sm">{tool.name}</span>
						</span>
					),
					children: tool.renderPanel?.(ctx),
				};
			})}
		/>
	);
}
