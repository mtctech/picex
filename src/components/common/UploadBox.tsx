import React from 'react';
import { Spin, Typography, Upload, UploadProps } from 'antd';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import { FiPlusCircle } from 'react-icons/fi';
import { useRequest } from 'ahooks';
import { cn } from '../../utils/cn';
import { uploadFileByBase64 } from '@/utils/image';

const { Text } = Typography;

export type UploadFileAttrs = {
	url: string;
	width: number;
	height: number;
};

export type UploadChangeInfo = UploadChangeParam<UploadFile<UploadFileAttrs>>;

export type UploadRequestOption = Parameters<
	NonNullable<UploadProps<UploadFileAttrs>['customRequest']>
>['0'];

export type UploadBoxProps = Omit<
	Partial<UploadProps<UploadFileAttrs>>,
	'children'
> & {
	err?: React.ReactNode;
	visible?: boolean;
	hidden?: boolean;
	icon?: React.ReactNode;
	iconClassName?: string;
	wordings?: React.ReactNode;
	wordingsClassName?: string;
	className?: string;
	children?: (x: { loading: boolean; error: Error | null }) => React.ReactNode;
};

export function UploadBox({
	children,
	err,
	icon,
	iconClassName,
	wordings,
	wordingsClassName,
	className,
	beforeUpload,
	customRequest = uploadFileByBase64,
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
	const UploadWrapper = children ? Upload : Upload.Dragger;
	const node = children?.({ loading, error: e || null });

	return (
		<UploadWrapper
			className="h-full"
			{...rest}
			beforeUpload={check}
			customRequest={upload}
			showUploadList={false}
		>
			{node || (
				<>
					{loading ? (
						<Spin />
					) : (
						<div>
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
						</div>
					)}
					{err || e ? (
						<Text
							type="danger"
							className="absolute top-full left-0 py-2"
						>
							{err || e?.message}
						</Text>
					) : null}
				</>
			)}
		</UploadWrapper>
	);
}
