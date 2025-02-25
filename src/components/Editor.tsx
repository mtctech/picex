import React, { PropsWithChildren, useReducer, useState } from 'react';
import PicexLayout from './Layout';
import { PicexToolBar } from './ToolBar';
import { DesignProps, PicexDesign } from './Design';
import { PicexProperties } from './Properties';
import { PicexBlockTree } from './BlockTree';
import { PicexTool, PicexToolBackground, PicexToolImageToImage } from '@/tools';
import {
	DefaultPicexContext,
	PicexContext,
	PicexDispatchContext,
} from '@/core/context';
import { reducer } from '@/core/reducer';

export function PicexEditor({
	tools = [new PicexToolBackground()],
	left,
	right,
	leftStyle,
	rightStyle,
	initialSelectedTool,
	children,
}: PropsWithChildren<{
	tools?: PicexTool[];
	initialSelectedTool?: string;
	left?: PropsWithChildren<{}>;
	right?: PropsWithChildren<{}>;
	leftStyle?: React.CSSProperties;
	rightStyle?: React.CSSProperties;
}>) {
	const [state, dispatch] = useReducer(reducer, DefaultPicexContext);
	const [selectedTool, setSelectedTool] = useState<string | null>(
		initialSelectedTool || tools[0]?.key || null,
	);

	return (
		<PicexContext.Provider value={state}>
			<PicexDispatchContext.Provider value={dispatch}>
				<PicexLayout
					left={
						<>
							<PicexToolBar
								tools={tools}
								value={selectedTool}
								onChange={(key: string) => setSelectedTool(key)}
							/>
							{left?.children}
						</>
					}
					right={
						<>
							<PicexProperties />
							<PicexBlockTree />
							{right?.children}
						</>
					}
					selectedTool={
						selectedTool
							? tools.find((tool) => tool.key === selectedTool)
							: undefined
					}
				>
					{selectedTool &&
						tools
							.find((tool) => tool.key === selectedTool)
							?.renderOutput?.({ ctx: state, dispatch })}
				</PicexLayout>
			</PicexDispatchContext.Provider>
		</PicexContext.Provider>
	);
}
