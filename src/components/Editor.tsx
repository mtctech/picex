import React, {
	Children,
	PropsWithChildren,
	ReactNode,
	useReducer,
} from 'react';
import PicexLayout from './Layout';
import { PicexToolBar } from './ToolBar';
import { PicexDesign } from './Design';
import { PicexProperties } from './Properties';
import { PicexBlockTree } from './BlockTree';
import { PicexTool, PicexToolBackground, PicexToolResize } from '../tools';
import {
	DefaultPicexContext,
	PicexContext,
	PicexDispatchContext,
} from '../core/context';

export function PicexEditor({
	tools = [new PicexToolBackground()],
	children,
	left,
	right,
}: PropsWithChildren<{
	tools?: PicexTool[];
	multiple?: boolean;
	left?: PropsWithChildren<{}>;
	right?: PropsWithChildren<{}>;
}>) {
	const [state, dispatch] = useReducer(() => {
		return DefaultPicexContext;
	}, DefaultPicexContext);

	return (
		<PicexContext.Provider value={state}>
			<PicexDispatchContext.Provider value={dispatch}>
				<PicexLayout
					left={
						<>
							<PicexToolBar tools={tools} />
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
				>
					<PicexDesign>{children}</PicexDesign>
				</PicexLayout>
			</PicexDispatchContext.Provider>
		</PicexContext.Provider>
	);
}
