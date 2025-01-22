import type { UploadFileAttrs } from '@/components/common/UploadBox';
import { BlockViewport } from '@/blocks/Viewport';
import { FabricImage } from 'fabric';
import { useLocalStorageState } from 'ahooks';
import { AiOutlineUpload } from 'react-icons/ai';
import React, { useCallback, useRef, useState } from 'react';
import { Upload, UploadProps } from 'antd';
import { uploadFileByBase64 } from '@/utils/image';
import { cn } from '@/utils/cn';
import { BlockBackground } from '@/blocks/Background';

function Images({
	block,
	setBlock,
	ctx,
	dispatch,
	customRequest = uploadFileByBase64,
	...rest
}: Partial<UploadProps> & {
	block: null | BlockBackground;
	setBlock: (block: BlockBackground) => void;
	ctx: IPicexContext;
	dispatch: IPicexDispatch;
}) {
	const viewport = ctx.blocks[0];
	const lastestBg = useRef('');
	const [bgImage, setBgImage] = useState('');
	const setBgImage4Root = useCallback(
		(v: string) => {
			if (!viewport) {
				return;
			}
			lastestBg.current = v;
			setBgImage(v);

			const size = {
				width: viewport?.width,
				height: viewport?.height,
			};
			block
				? BlockBackground.patternFromURL(v, size).then((pattern) => {
						if (lastestBg.current !== v) {
							return;
						}
						block.fill = pattern;
						dispatch({
							type: 'updateBlock',
							block,
						});
					})
				: BlockBackground.fromURL(v, size).then((newBlock) => {
						if (lastestBg.current !== v) {
							return;
						}
						dispatch({
							type: 'addBlock',
							block: newBlock,
						});
						setBlock(newBlock);
					});
		},
		[viewport, setBgImage, block, setBlock, dispatch],
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
