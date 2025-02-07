import React, { PropsWithChildren, useReducer } from 'react';
import PicexLayout from './Layout';
import { PicexToolBar } from './ToolBar';
import { DesignProps, PicexDesign } from './Design';
import { PicexProperties } from './Properties';
import { PicexBlockTree } from './BlockTree';
import { PicexTool, PicexToolBackground } from '../tools';
import {
	DefaultPicexContext,
	PicexContext,
	PicexDispatchContext,
} from '@/core/context';
import { reducer } from '@/core/reducer';

export function PicexEditor({
	tools = [new PicexToolBackground()],
	multiple = false,
	historable = true,
	images,
	watermark,
	viewport,
	children,
	left,
	right,
	uploadProps,
	downloadProps,
}: PropsWithChildren<
	DesignProps & {
		tools?: PicexTool[];
		multiple?: boolean;
		left?: PropsWithChildren<{}>;
		right?: PropsWithChildren<{}>;
	}
>) {
	const [state, dispatch] = useReducer(reducer, DefaultPicexContext);

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
					<PicexDesign
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
