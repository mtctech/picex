import React, { PropsWithChildren } from 'react';
import { Typography, DraggerProps, Upload, UploadProps } from 'antd';
import { RcFile } from 'antd/es/upload';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useRequest } from 'ahooks';

const { Text } = Typography;

type UploadRequestOption = Parameters<
	NonNullable<DraggerProps['customRequest']>
>['0'];

export type UploadBoxProps = Partial<UploadProps> & {
	icon?: React.ReactNode;
	wordings?: React.ReactNode;
};

export function UploadBox({
	icon,
	wordings,
	beforeUpload,
	customRequest,
	...rest
}: UploadBoxProps) {
	const { runAsync: check, error: e1 } = useRequest(
		async (file: RcFile) => {
			return beforeUpload?.(file, [file]) ?? true;
		},
		{
			manual: true,
		},
	);
	const {
		runAsync: upload,
		error: e2,
		loading,
	} = useRequest(
		async (params: UploadRequestOption) => {
			if (loading) {
				return;
			}

			await customRequest?.(params);
		},
		{
			manual: true,
		},
	);
	const e = e1 || e2;

	return (
		<div className="w-full max-w-[422px]">
			<Upload.Dragger
				{...rest}
				beforeUpload={check}
				customRequest={upload}
				showUploadList={false}
			>
				<p className="ant-upload-drag-icon">
					{icon ?? <AiOutlinePlusCircle />}
				</p>
				<p className="ant-upload-text">
					{wordings ?? 'Click or drag file to this area to upload'}
				</p>
				{e && (
					<Text
						type="danger"
						className="absolute top-full left-0 py-2"
					>
						{e.message}
					</Text>
				)}
			</Upload.Dragger>
		</div>
	);
}
