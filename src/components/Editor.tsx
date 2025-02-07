import React, { PropsWithChildren, useReducer } from 'react';
import PicexLayout from './Layout';
import { PicexToolBar } from './ToolBar';
import { PicexDesign } from './Design';
import { PicexProperties } from './Properties';
import { PicexBlockTree } from './BlockTree';
import { PicexTool, PicexToolBackground } from '../tools';
import {
	DefaultPicexContext,
	PicexContext,
	PicexDispatchContext,
} from '@/core/context';
import { reducer } from '@/core/reducer';
import { WaterMark } from '@/blocks/WaterMark';
import { DownloadProps } from './common/Operators';
import { UploadBoxProps } from './common/UploadBox';

export function PicexEditor({
	tools = [new PicexToolBackground()],
	multiple = false,
	images,
	watermark,
	viewport,
	children,
	left,
	right,
	uploadProps,
	downloadProps,
}: PropsWithChildren<{
	tools?: PicexTool[];
	multiple?: boolean;
	viewport?: PicexContentActionInit['viewport'];
	images?: PicexContentActionInit['images'];
	watermark?: WaterMark;
	left?: PropsWithChildren<{}>;
	right?: PropsWithChildren<{}>;
	uploadProps?: UploadBoxProps;
	downloadProps?: DownloadProps;
}>) {
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
