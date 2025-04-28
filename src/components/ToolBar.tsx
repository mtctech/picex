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
	activeToolKey?: string;
}

/**
 * 左侧工具栏
 * @description 根据配置初始化并渲染工具栏
 */
export function PicexToolBar({
	tools,
	value,
	activeToolKey,
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
			tabPosition={sizes.md ? 'left' : 'top'}
			style={style}
			className={cn('picex-toolbar w-full h-full', className)}
			onChange={onToolChange}
			activeKey={activeToolKey}
			items={tools.map((tool) => {
				return {
					key: tool.key,
					label: (
						<span className="max-w-14 inline-flex flex-col items-center gap-1">
							<i
								className={cn(
									'w-12 h-12 rounded-full overflow-hidden flex items-center justify-center',
									activeToolKey === tool.key
										? 'bg-[rgb(31,135,252,0.1)]'
										: 'bg-[#d9d9d9] text-[#666666]',
								)}
							>
								{tool.renderIcon?.({ ctx, dispatch })}
							</i>
							<span
								className={cn(
									'text-sm leading-[1] font-medium',
									activeToolKey !== tool.key && 'text-[#666666]',
								)}
							>
								{tool.name}
							</span>
						</span>
					),
					children: sizes.md ? (
						tool.renderPanel?.({ ctx, dispatch })
					) : (
						<>
							<aside className="absolute z-10 left-0 ml-4 mt-4 md:ml-0">
								<span
									className="text-2xl text-[#666] hover:text-[#007AFF] cursor-pointer"
									onClick={() => {
										value && setFlags((prev) => ({ ...prev, [value]: true }));
									}}
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
