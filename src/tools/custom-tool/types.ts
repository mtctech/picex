import { UploadBoxProps } from '@/components/common/UploadBox';
import { DesignProps } from '@/components/Design';

export type PicexToolCustomProps = DesignProps &
	UploadBoxProps & {
		key?: string;
		name?: string;
		disabled?: boolean;
		leftStyle?: React.CSSProperties;
		rightStyle?: React.CSSProperties;
		panelChildren?: React.ReactNode;
	};
