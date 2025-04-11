import type { UploadFileAttrs } from '@/components/common/UploadBox';
import { BlockViewport } from '@/blocks/Viewport';
import { FabricImage } from 'fabric';
import { useLocalStorageState } from 'ahooks';
import { AiFillCloseCircle, AiOutlineUpload } from 'react-icons/ai';
import React, { useCallback, useRef, useState } from 'react';
import { Upload, UploadProps } from 'antd';
import { uploadFileByBase64 } from '@/utils/image';
import { cn } from '@/utils/cn';
import { BlockBackground } from '@/blocks/Background';
import locale from '@/locale';

function Images({
	maxImages,
	block,
	setBlock,
	ctx,
	dispatch,
	customRequest = uploadFileByBase64,
	...rest
}: Partial<UploadProps> & {
	maxImages?: number;
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
			block && ctx.blocks.includes(block)
				? BlockBackground.patternFromURL(v, size).then((pattern) => {
						if (lastestBg.current !== v) {
							return;
						}
						dispatch({
							type: 'updateBlock',
							block,
							payload: {
								fill: pattern,
							},
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
									(prev.some((x) => x.url === file.response!.url)
										? prev
										: [file.response!, ...(prev || [])]
									).slice(0, maxImages),
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
							<span className={'text-sm font-medium'}>
								{locale.t('background.panel.upload')}
							</span>
						</div>
					</Upload>
				</li>
				{bgImages?.map((file) =>
					!file?.url ? null : (
						<li
							key={file.url}
							className={cn(
								'group relative cursor-pointer',
								'w-[5.375rem] aspect-[86/108] border border-solid rounded-2xl',
								file.url === bgImage ? 'border-[#007AFF]' : 'border-[#D9D9D9]',
							)}
							style={{
								background: `url(${file.url}) no-repeat center center / cover`,
							}}
							onClick={() => {
								setBgImage4Root(file.url);
							}}
						>
							<span
								className="transition-opacity opacity-0 group-hover:opacity-100 absolute top-0 right-0 ml-1 mt-1 translate-x-1/2 -translate-y-1/2 text-xl hover:text-[#007AFF]"
								onClick={(e) => {
									e.stopPropagation();
									setBgImages((prev) =>
										!prev ? [] : prev.filter((x) => x.url !== file.url),
									);
								}}
							>
								<AiFillCloseCircle />
							</span>
						</li>
					),
				)}
			</ul>
		</div>
	);
}

export default Images;
