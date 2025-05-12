import React, {
	Fragment,
	PropsWithChildren,
	useCallback,
	useEffect,
} from 'react';
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
import { useImageLoader } from '@/hooks/useImageLoader';

import './Design.css';
export interface DesignProps {
	viewport?: Size;
	maxport?: Size;
	images?: PicexContentActionInit['images'];
	watermark?: WaterMark;
	historable?: boolean;
	uploadProps?: UploadBoxProps;
	downloadProps?: DownloadProps;
	enableOperators?: boolean;
	childrenZeroBlock?: React.ReactNode;
	onlyChildren?: boolean;
	lang?: string;
	childNode?: { [key: string]: React.ReactNode };
	activeToolKey?: string;
}

/**
 * 主区域画布
 * @description
 * 1. 根据配置初始化并渲染画布
 * 2. 根据Blocks树渲染画布内容
 */
export function PicexDesign({
	viewport,
	maxport,
	images,
	watermark,
	historable = true,
	uploadProps,
	downloadProps,
	children,
	childrenZeroBlock,
	enableOperators = true,
	onlyChildren = false,
	childNode,
	activeToolKey,
}: PropsWithChildren<DesignProps>) {
	const { blocks } = usePicexCtx();
	const dispatch = usePicexDispatch();
	const { loadImages } = useImageLoader();
	// const [loadedImagesState, setLoadedImagesState] = useState(null);
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
					naturalSize: viewport,
					displaySize: maxport,
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
			// 先加载图片，然后再初始化
			loadImages(images)
				.then((loadedImages) => {
					console.log(loadedImages, 'loadedImages');
					dispatch({
						type: 'init',
						images: images.map((img, index) => ({
							...img,
							loadedImage: loadedImages[index],
						})),
						naturalSize: viewport,
						displaySize: maxport,
					});
					console.log('useWaterMark');
				})
				.catch((error) => {
					console.error('Failed to load images:', error);
					// 如果加载失败，仍然使用原始图片进行初始化
					dispatch({
						type: 'init',
						images,
						naturalSize: viewport,
						displaySize: maxport,
					});
				});
		} else {
			dispatch({
				type: 'cover',
				blocks: [],
			});
		}
	}, [
		images,
		viewport?.width,
		viewport?.height,
		maxport?.width,
		maxport?.height,
	]);
	useWaterMark(watermark);

	const Box = (onlyChildren
		? childrenZeroBlock
		: (childrenZeroBlock ?? children)) ?? (
		<UploadBox
			accept="image/*"
			multiple={false}
			{...uploadProps}
			onChange={onChange}
		/>
	);

	return (
		<div className="picex-design h-full">
			<div className={cn('h-full', { hidden: onlyChildren })}>
				{enableOperators ? (
					<Operators
						className="z-10"
						blocks={blocks}
						uploadProps={uploadProps}
						downloadProps={downloadProps}
						onChange={onChange}
					/>
				) : null}
				{historable ? (
					<HistoryBtns maxport={blocks[0] || maxport || viewport} />
				) : null}
				<div
					// ref={el}
					className="picex-design-content h-full flex items-center justify-center"
				>
					{!blocks.length ? (
						<div
							className={cn(
								'w-full text-center max-w-[422px] aspect-[422/553]',
							)}
						>
							{Box}
						</div>
					) : (
						<PicexCanvas />
					)}
				</div>
			</div>
			{/* 全部渲染子节点 但是只显示activeToolKey的子节点 */}
			<div className={cn('h-full', { hidden: !onlyChildren })}>
				{Object.entries(childNode ?? {}).map(([key, value]) => {
					return (
						<div
							key={key}
							className={cn({ hidden: key !== activeToolKey })}
						>
							{value}
						</div>
					);
				})}
			</div>
		</div>
	);
}
