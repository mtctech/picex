import React from 'react';
import { Typography, DraggerProps, Upload, UploadProps } from 'antd';
import { RcFile } from 'antd/es/upload';
import { FiPlusCircle } from 'react-icons/fi';
import { useRequest } from 'ahooks';
import { cn } from '../../utils/cn';

const { Text } = Typography;

type UploadRequestOption = Parameters<
	NonNullable<DraggerProps['customRequest']>
>['0'];

export type UploadBoxProps = Partial<UploadProps> & {
	icon?: React.ReactNode;
	iconClassName?: string;
	wordings?: React.ReactNode;
	wordingsClassName?: string;
	className?: string;
};

export function UploadBox({
	icon,
	iconClassName,
	wordings,
	wordingsClassName,
	className,
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
		<div
			className={cn(
				'w-full text-center max-w-[422px] aspect-[422/553]',
				className,
			)}
		>
			<Upload.Dragger
				{...rest}
				className="h-full"
				beforeUpload={check}
				customRequest={upload}
				showUploadList={false}
			>
				<p
					className={cn(
						'mb-4 text-[#007AFF] flex items-center justify-center text-[40px]',
						iconClassName,
					)}
				>
					{icon ?? <FiPlusCircle />}
				</p>
				<p className={cn('text-lg font-medium', wordingsClassName)}>
					{wordings ?? 'Upload your image here'}
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
