import type { UploadFileAttrs } from '@/components/common/UploadBox';
import { BlockCanvas } from '@/blocks/Canvas';
import { FabricImage } from 'fabric';
import { useLocalStorageState } from 'ahooks';
import { AiOutlineUpload } from 'react-icons/ai';
import React, { useCallback, useRef, useState } from 'react';
import { Upload, UploadProps } from 'antd';
import { uploadFileByBase64 } from '@/utils/image';
import { cn } from '@/utils/cn';

function Images({
	ctx,
	dispatch,
	customRequest = uploadFileByBase64,
	...rest
}: Partial<UploadProps> & {
	ctx: IPicexContext;
	dispatch: IPicexDispatch;
}) {
	const rootBlock = ctx.blocks[0] as BlockCanvas;

	const lastestBg = useRef('');
	const [bgImage, setBgImage] = useState('');
	const setBgImage4Root = useCallback(
		(v: string) => {
			if (!rootBlock) {
				return;
			}
			lastestBg.current = v;
			setBgImage(v);

			FabricImage.fromURL(v).then((img) => {
				if (lastestBg.current === v) {
					dispatch({
						type: 'updateBlock',
						block: rootBlock,
						payload: {
							backgroundImage: img,
						},
					});
				}
			});
		},
		[bgImage, setBgImage, rootBlock, dispatch],
	);

	const [bgImages, setBgImages] = useLocalStorageState<Array<UploadFileAttrs>>(
		'picex-background-images',
		{
			defaultValue: [],
		},
	);

	return (
		<div>
			<ul className="flex flex-wrap gap-5">
				<li className="w-[5.375rem] aspect-[86/108]">
					<Upload<UploadFileAttrs>
						{...rest}
						className="w-full h-full"
						listType="picture-card"
						multiple={false}
						showUploadList={false}
						customRequest={customRequest}
						onChange={({ file }) => {
							if (file.response?.url && file.status === 'done') {
								setBgImages((prev = []) =>
									prev.some((x) => x.url === file.response!.url)
										? prev
										: [...(prev || []), file.response!],
								);
								setBgImage4Root(file.response!.url);
							}
						}}
					>
						<div className="inline-flex flex-col items-center justify-center gap-1">
							<span
								className={
									'text-[#007AFF] flex items-center justify-center text-[30px]'
								}
							>
								<AiOutlineUpload />
							</span>
							<span className={'text-sm font-medium'}>Upload</span>
						</div>
					</Upload>
				</li>
				{bgImages?.map((file) =>
					!file?.url ? null : (
						<li
							key={file.url}
							className={cn(
								'cursor-pointer',
								'w-[5.375rem] aspect-[86/108] border border-solid rounded-2xl',
								file.url === bgImage ? 'border-[#007AFF]' : 'border-[#D9D9D9]',
							)}
							style={{
								background: `url(${file.url}) no-repeat center center / cover`,
							}}
							onClick={() => {
								setBgImage(file.url);
							}}
						></li>
					),
				)}
			</ul>
		</div>
	);
}

export default Images;
