import { Button, Tooltip } from 'antd';
import { UploadBox, UploadBoxProps, UploadChangeInfo } from './UploadBox';
import { Block } from '@/index';
import { useDownload } from '@/hooks/useDownload';
import { cn } from '@/utils/cn';
import { ImageFormat } from 'fabric';

export type DownloadProps = {
	format?: ImageFormat;
	filename?: string;
};

export function Operators({
	blocks,
	uploadProps,
	downloadProps,
	onChange,
	className,
}: {
	blocks: Block[];
	uploadProps?: UploadBoxProps;
	downloadProps?: DownloadProps;
	onChange: (info: UploadChangeInfo) => void;
	className?: string;
}) {
	const { visible = !!blocks.length, hidden = false } = uploadProps || {};
	const { format = 'png', filename } = downloadProps || {};
	const { run: download, loading: downloading } = useDownload();

	return (
		<aside
			className={cn(
				'absolute top-8 right-8 flex items-center justify-end gap-2',
				className,
			)}
		>
			{visible || !hidden ? (
				<UploadBox
					accept="image/*"
					multiple={false}
					{...uploadProps}
					onChange={onChange}
				>
					{({ loading, error }) => {
						const btn = (
							<Button
								size="small"
								type="primary"
								shape="round"
								loading={loading}
							>
								Upload a new image
							</Button>
						);
						return !error ? (
							btn
						) : (
							<Tooltip
								open
								placement="bottomLeft"
								title={error?.message}
							>
								{btn}
							</Tooltip>
						);
					}}
				</UploadBox>
			) : null}
			<Button
				className="w-24"
				size="small"
				type="primary"
				shape="round"
				disabled={!blocks.length}
				loading={downloading}
				onClick={() => download(format, filename)}
			>
				Download
			</Button>
		</aside>
	);
}
