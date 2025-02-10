import { UploadBoxProps } from '@/components/common/UploadBox';

export type PicexToolBackgroundProps = UploadBoxProps & {
	name?: string;
	maxColours?: number;
	maxImages?: number;
};
