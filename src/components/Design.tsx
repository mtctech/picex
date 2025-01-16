import { Button } from 'antd';
import { AiOutlineUndo, AiOutlineRedo } from 'react-icons/ai';
import React, { PropsWithChildren } from 'react';
import { UploadBox, UploadBoxProps } from './common/UploadBox';
import { usePicexCtx } from '../core/context';

/**
 * 主区域画布
 * @description
 * 1. 根据配置初始化并渲染画布
 * 2. 根据Blocks树渲染画布内容
 */
export function PicexDesign({
	uploadProps,
}: PropsWithChildren<{
	uploadProps?: UploadBoxProps;
}>) {
	const { blocks } = usePicexCtx();

	return (
		<div className="picex-design flex items-center justify-center">
			<aside className="absolute top-0 left-0 flex items-center justify-start gap-2">
				<Button.Group size="small">
					<Button>
						<AiOutlineUndo />
					</Button>
					<Button>
						<AiOutlineRedo />
					</Button>
				</Button.Group>
			</aside>
			<aside className="absolute top-0 right-0 flex items-center justify-end gap-2">
				<Button size="small">Upload a new image</Button>
				<Button size="small">Download</Button>
			</aside>
			<div className="picex-design-content">
				{!blocks.length ? (
					<UploadBox
						accept="image/*"
						{...uploadProps}
					/>
				) : null}
			</div>
		</div>
	);
}
