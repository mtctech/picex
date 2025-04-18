import React, { PropsWithChildren, useReducer, useState } from 'react';
import PicexLayout from './Layout';
import { PicexToolBar } from './ToolBar';
import { DesignProps, PicexDesign } from './Design';
import { PicexProperties } from './Properties';
import { PicexBlockTree } from './BlockTree';
import { PicexTool, PicexToolBackground } from '@/tools';
import {
	DefaultPicexContext,
	PicexContext,
	PicexDispatchContext,
} from '@/core/context';
import { reducer } from '@/core/reducer';
import locale from '@/locale';

export function PicexEditor({
	tools = [new PicexToolBackground()],
	initialSelectedTool,
	activeToolKey,
	multiple = false,
	historable = true,
	images,
	watermark,
	viewport,
	children,
	childrenZeroBlock,
	left,
	right,
	layout,
	uploadProps,
	downloadProps,
	onlyChildren = false,
	onToolChange,
	lang = 'en',
	childNode,
}: DesignProps &
	PropsWithChildren<{
		lang?: string;
		tools?: PicexTool[];
		multiple?: boolean;
		initialSelectedTool?: string;
		activeToolKey?: string;
		onToolChange?: (key: string) => void;
		left?: PropsWithChildren<{
			style?: React.CSSProperties;
			className?: string;
		}>;
		right?: PropsWithChildren<{
			style?: React.CSSProperties;
			className?: string;
		}>;
		layout?: {
			leftStyle?: React.CSSProperties;
			rightStyle?: React.CSSProperties;
			contentStyle?: React.CSSProperties;
			leftClassName?: string;
			rightClassName?: string;
			contentClassName?: string;
		};
		childNode?: { [key: string]: React.ReactNode };
	}>) {
	const [state, dispatch] = useReducer(reducer, DefaultPicexContext);
	const [selectedTool, setSelectedTool] = useState<string | null>(
		initialSelectedTool || tools[0]?.key || null,
	);
	const { children: leftChildren, ...leftProps } = left ?? {};
	const { children: rightChildren, ...rightProps } = right ?? {};

	locale.use(lang);

	return (
		<PicexContext.Provider value={state}>
			<PicexDispatchContext.Provider value={dispatch}>
				<PicexLayout
					left={
						<>
							<PicexToolBar
								{...leftProps}
								tools={tools}
								value={selectedTool}
								activeToolKey={activeToolKey}
								onChange={(key: string) => {
									setSelectedTool(key);
									onToolChange?.(key);
								}}
							/>
							{leftChildren}
						</>
					}
					right={
						<>
							<PicexProperties />
							<PicexBlockTree />
							{rightChildren}
						</>
					}
					selectedTool={
						selectedTool
							? tools.find((tool) => tool.key === selectedTool)
							: undefined
					}
					{...layout}
				>
					<PicexDesign
						activeToolKey={activeToolKey}
						onlyChildren={onlyChildren}
						childNode={childNode}
						childrenZeroBlock={childrenZeroBlock}
						images={images}
						watermark={watermark}
						viewport={viewport}
						historable={historable}
						uploadProps={{
							...uploadProps,
							multiple,
						}}
						downloadProps={downloadProps}
					>
						{children}
					</PicexDesign>
				</PicexLayout>
			</PicexDispatchContext.Provider>
		</PicexContext.Provider>
	);
}
