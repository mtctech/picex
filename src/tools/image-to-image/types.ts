import { UploadBoxProps } from '@/components/common/UploadBox';
import { DesignProps } from '@/components/Design';
import { ReactNode } from 'react';
export type PicexToolBackgroundProps = DesignProps &
	UploadBoxProps & {
		name?: string;
		maxColours?: number;
		maxImages?: number;
		leftStyle?: React.CSSProperties;
		rightStyle?: React.CSSProperties;
	};

export type PicexToolImageToImageProps = DesignProps &
	UploadBoxProps & {
		name?: string;
		panelOnlyOutSide?: boolean;
		outputOnlyOutSide?: boolean;
		panelChildren?: ReactNode;
		outputChildren?: ReactNode;
		leftStyle?: React.CSSProperties;
		rightStyle?: React.CSSProperties;
	};
