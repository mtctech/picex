import { UploadBoxProps } from '@/components/common/UploadBox';
import { DesignProps } from '@/components/Design';
export type PicexToolBackgroundProps = DesignProps &
	UploadBoxProps & {
		name?: string;
		maxColours?: number;
		maxImages?: number;
	};
