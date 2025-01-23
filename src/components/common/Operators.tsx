import { Button, Tooltip } from 'antd';
import { UploadBox, UploadBoxProps, UploadChangeInfo } from './UploadBox';
import { Block } from '@/index';
import { useDownload } from '@/hooks/useDownload';
import { cn } from '@/utils/cn';

export function Operators({
	blocks,
	uploadProps,
	onChange,
	className,
}: {
	blocks: Block[];
	uploadProps: UploadBoxProps | undefined;
	onChange: (info: UploadChangeInfo) => void;
	className?: string;
}) {
	const { run: download, loading: downloading } = useDownload();

	return (
		<aside
			className={cn(
				'absolute top-8 right-8 flex items-center justify-end gap-2',
				className,
			)}
		>
			{blocks.length ? (
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
				size="small"
				color="primary"
				shape="round"
				disabled={!blocks.length}
				loading={downloading}
				onClick={() => download('image/png')}
			>
				Download
			</Button>
		</aside>
	);
}
