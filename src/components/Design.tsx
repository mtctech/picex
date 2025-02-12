import React, { PropsWithChildren, useCallback, useEffect } from 'react';
import { WaterMark } from '@/blocks/WaterMark';
import { useWaterMark } from '@/hooks/useWaterMark';
import { usePicexCtx, usePicexDispatch } from '@/core/context';
import { cn } from '@/utils/cn';
import { PicexCanvas } from './common/Canvas';
import { DownloadProps, Operators } from './common/Operators';
import {
	UploadBox,
	UploadBoxProps,
	UploadChangeInfo,
} from './common/UploadBox';
import { HistoryBtns } from './common/HistoryBtns';

import './Design.css';
import { getScaledFitSize } from '@/utils/scale';

export interface DesignProps {
	viewport?: PicexContentActionInit['viewport'];
	images?: PicexContentActionInit['images'];
	watermark?: WaterMark;
	historable?: boolean;
	uploadProps?: UploadBoxProps;
	downloadProps?: DownloadProps;
}

const maxViewport = {
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
	viewport = maxViewport,
	images,
	watermark,
	historable = true,
	uploadProps,
	downloadProps,
	children,
}: PropsWithChildren<DesignProps>) {
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
					viewport: getScaledFitSize(viewport, maxViewport),
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
		} else {
			dispatch({
				type: 'cover',
				blocks: [],
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
				downloadProps={downloadProps}
				onChange={onChange}
			/>
			{historable ? <HistoryBtns /> : null}
			<div
				// ref={el}
				className="picex-design-content h-full flex items-center justify-center"
			>
				{!blocks.length ? (
					<div
						className={cn('w-full text-center max-w-[422px] aspect-[422/553]')}
					>
						{children ?? (
							<UploadBox
								accept="image/*"
								multiple={false}
								{...uploadProps}
								onChange={onChange}
							/>
						)}
					</div>
				) : (
					<PicexCanvas />
				)}
			</div>
		</div>
	);
}
