import { Button } from 'antd';
import Redo from '@/images/redo.svg?react';
import Undo from '@/images/undo.svg?react';
import React, { PropsWithChildren } from 'react';
import { WaterMark } from '@/blocks/WaterMark';
import { useWaterMark } from '@/hooks/useWaterMark';
import { usePicexCtx, usePicexDispatch } from '@/core/context';
import { PicexCanvas } from './common/Canvas';
import { UploadBox, UploadBoxProps } from './common/UploadBox';
/**
 * 主区域画布
 * @description
 * 1. 根据配置初始化并渲染画布
 * 2. 根据Blocks树渲染画布内容
 */
export function PicexDesign({
	watermark,
	uploadProps,
}: PropsWithChildren<{
	watermark?: WaterMark;
	uploadProps?: UploadBoxProps;
}>) {
	const { blocks } = usePicexCtx();
	const dispatch = usePicexDispatch();

	useWaterMark(watermark);

	return (
		<div className="picex-design h-full">
			<aside className="absolute top-8 right-8 flex items-center justify-end gap-2">
				{blocks.length ? (
					<Button size="small">Upload a new image</Button>
				) : null}
				<Button
					size="small"
					color="primary"
					shape="round"
					disabled={!blocks.length}
				>
					Download
				</Button>
			</aside>
			<aside className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center justify-start gap-2">
				<div className="flex items-center gap-4">
					<Button
						color="default"
						variant="filled"
						className="w-[3.125rem] h-[3.125rem] p-0 flex items-center justify-center"
					>
						<Undo />
					</Button>
					<Button
						color="default"
						variant="filled"
						className="w-[3.125rem] h-[3.125rem] p-0 flex items-center justify-center"
					>
						<Redo />
					</Button>
				</div>
			</aside>
			<div className="picex-design-content h-full flex items-center justify-center">
				{!blocks.length ? (
					<UploadBox
						accept="image/*"
						multiple={false}
						{...uploadProps}
						onChange={(info) => {
							const { fileList } = info;
							if (
								fileList.length &&
								fileList.every((x) => x.status === 'done' && x.response)
							) {
								dispatch({
									type: 'init',
									images: fileList.map(({ response }) => {
										return {
											url: response!.url,
											width: response!.width,
											height: response!.height,
										};
									}),
								});
							}
						}}
					/>
				) : (
					<PicexCanvas />
				)}
			</div>
		</div>
	);
}
