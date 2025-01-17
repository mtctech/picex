import { UploadBox } from '../../../components/common/UploadBox';
import { BlockCanvas } from '../../../blocks/Canvas';
import { useControllableValue, useLocalStorageState } from 'ahooks';
import { AiOutlineUpload } from 'react-icons/ai';
import React from 'react';
import { Upload, UploadFile, UploadProps } from 'antd';
import { uploadFileByBase64 } from '../../../utils/image';
import { cn } from '../../../utils/cn';

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
	const { backgroundImage } = rootBlock || {};

	const [bgImage, setBgImage] = useControllableValue({
		value: backgroundImage,
		onChange: (v) => {
			dispatch({
				type: 'updateBlock',
				payload: {
					block: blocks[0],
					background: v,
				},
			});
		},
	});

	const [bgImages, setBgImages] = useLocalStorageState<Array<UploadFile>>(
		'picex-background-images',
		{
			defaultValue: [],
		},
	);

	return (
		<div>
			<ul className="flex flex-wrap gap-5">
				<li className="w-[5.375rem] aspect-[86/108]">
					<Upload
						{...rest}
						className="w-full h-full"
						listType="picture-card"
						fileList={bgImages}
						showUploadList={false}
						customRequest={customRequest}
						onChange={(info) => setBgImages(info.fileList)}
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
					!file.response?.url ? null : (
						<li
							key={file.uid}
							className={cn(
								'w-[5.375rem] aspect-[86/108] border border-solid rounded-2xl',
								file.response?.url === bgImage
									? 'border-[#007AFF]'
									: 'border-[#D9D9D9]',
							)}
							style={{
								background: `url(${file.response?.url}) no-repeat center center / cover`,
							}}
						></li>
					),
				)}
			</ul>
		</div>
	);
}

export default Images;
