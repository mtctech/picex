import { Drawer, Tabs } from 'antd';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import React, { useCallback, useState } from 'react';
import { useResponsive } from 'ahooks';
import { PicexTool } from '../tools/types';
import { usePicexCtx, usePicexDispatch } from '../core/context';
import './ToolBar.css';
import { cn } from '@/utils/cn';

export interface PicexToolBarProps {
	tools: PicexTool[];
	value?: null | string;
	onChange?: (key: string) => void;
	style?: React.CSSProperties;
	className?: string;
}

/**
 * 左侧工具栏
 * @description 根据配置初始化并渲染工具栏
 */
export function PicexToolBar({
	tools,
	value,
	onChange,
	style,
	className,
}: PicexToolBarProps) {
	const ctx = usePicexCtx();
	const dispatch = usePicexDispatch();
	const sizes = useResponsive();
	const [flags, setFlags] = useState<Record<string, boolean>>({});

	const onToolChange = useCallback(
		(v: string) => {
			onChange?.(v);
			setFlags((prev) => {
				return {
					...prev,
					[v]: true,
				};
			});
		},
		[onChange],
	);

	return (
		<Tabs
			size="small"
			type="card"
			tabPosition={sizes.lg ? 'left' : 'top'}
			style={style}
			className={cn('picex-toolbar w-full h-full', className)}
			onChange={onToolChange}
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
					children: sizes.lg ? (
						<div className="pt-5 overflow-y-auto h-full">
							{tool.renderPanel?.({ ctx, dispatch })}
						</div>
					) : (
						<>
							<aside className="absolute z-10 left-0 top-full mt-4 ml-4">
								<span
									className="text-2xl text-[#666] hover:text-[#007AFF]"
									onClick={() =>
										value && setFlags((prev) => ({ ...prev, [value]: true }))
									}
								>
									<AiOutlineMenuUnfold />
								</span>
							</aside>
							<Drawer
								placement="left"
								width="67vw"
								styles={{
									header: { padding: 8 },
									body: { padding: 8 },
								}}
								open={flags[tool.key]}
								onClose={() =>
									setFlags((prev) => ({ ...prev, [tool.key]: false }))
								}
							>
								{tool.renderPanel?.({ ctx, dispatch })}
							</Drawer>
						</>
					),
					disabled: tool.disabled,
				};
			})}
		/>
	);
}
