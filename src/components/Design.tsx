import { Button } from 'antd';
import Redo from '@/images/redo.svg?react';
import Undo from '@/images/undo.svg?react';
import React, { PropsWithChildren, useCallback, useEffect } from 'react';
import { WaterMark } from '@/blocks/WaterMark';
import { useWaterMark } from '@/hooks/useWaterMark';
import { usePicexCtx, usePicexDispatch } from '@/core/context';
import { cn } from '@/utils/cn';
import { PicexCanvas } from './common/Canvas';
import { Operators } from './common/Operators';
import {
	UploadBox,
	UploadBoxProps,
	UploadChangeInfo,
} from './common/UploadBox';

const defaultViewport = {
	width: 820,
	height: 590,
};

/**
 * 主区域画布
 * @description
 * 1. 根据配置初始化并渲染画布
 * 2. 根据Blocks树渲染画布内容
 */
export function PicexDesign({
	viewport = defaultViewport,
	images,
	watermark,
	uploadProps,
}: PropsWithChildren<{
	viewport?: PicexContentActionInit['viewport'];
	images?: PicexContentActionInit['images'];
	watermark?: WaterMark;
	uploadProps?: UploadBoxProps;
}>) {
	const { blocks } = usePicexCtx();
	const dispatch = usePicexDispatch();
	// const el = useRef<HTMLDivElement>(null);
	// const size = useSize(el);
	const onChange = useCallback(
		(info: UploadChangeInfo) => {
			const { fileList } = info;
			if (
				fileList.length &&
				fileList.every((x) => x.status === 'done' && x.response)
			) {
				dispatch({
					type: 'init',
					viewport,
					images: fileList.map(({ response }) => {
						return {
							url: response!.url,
							width: response!.width,
							height: response!.height,
						};
					}),
				});
			}
		},
		[dispatch],
	);

	useEffect(() => {
		if (images?.length && viewport) {
			dispatch({
				type: 'init',
				images,
				viewport,
			});
		}
	}, [images, viewport.width, viewport.height]);
	useWaterMark(watermark);

	return (
		<div className="picex-design h-full">
			<Operators
				className="z-10"
				blocks={blocks}
				uploadProps={uploadProps}
				onChange={onChange}
			/>
			<aside className="absolute z-10 top-8 left-1/2 -translate-x-1/2 flex items-center justify-start gap-2">
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
			<div
				// ref={el}
				className="picex-design-content h-full flex items-center justify-center"
			>
				{!blocks.length ? (
					<div
						className={cn('w-full text-center max-w-[422px] aspect-[422/553]')}
					>
						<UploadBox
							accept="image/*"
							multiple={false}
							{...uploadProps}
							onChange={onChange}
						/>
					</div>
				) : (
					<PicexCanvas />
				)}
			</div>
		</div>
	);
}
