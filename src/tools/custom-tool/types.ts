import { UploadBoxProps } from '@/components/common/UploadBox';
import { DesignProps } from '@/components/Design';

export type PicexToolBackgroundProps = DesignProps &
	UploadBoxProps & {
		name?: string;
		maxColours?: number;
		maxImages?: number;
		leftStyle?: React.CSSProperties;
		rightStyle?: React.CSSProperties;
	};

export type PicexToolCustomProps = DesignProps &
	UploadBoxProps & {
		key?: string;
		name?: string;
		leftStyle?: React.CSSProperties;
		rightStyle?: React.CSSProperties;
		panelChildren?: React.ReactNode;
	};
