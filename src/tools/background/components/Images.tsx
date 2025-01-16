import { UploadBox } from '../../../components/common/UploadBox';
import { BlockCanvas } from '../../../blocks/Canvas';
import { useControllableValue, useLocalStorageState } from 'ahooks';
import { AiOutlineUpload } from 'react-icons/ai';
import React from 'react';
import { UploadFile } from 'antd';

function Images({
	ctx,
	dispatch,
}: {
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
			<ul className="fldex flex-wrap gap-[18px]">
				<UploadBox
					listType="picture-card"
					icon={<AiOutlineUpload />}
					wordings="Click or drag file to this area to upload"
					fileList={bgImages}
					onChange={(info) => setBgImages(info.fileList)}
				></UploadBox>
			</ul>
		</div>
	);
}

export default Images;
