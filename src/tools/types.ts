import { ReactNode } from 'react';
import { IPicexContext } from '../core/context';

export abstract class PicexTool {
	abstract key: string;
	abstract icon: string;
	abstract name: string;
	abstract visible: boolean;
	abstract disabled: boolean;

	toggle(v = !this.visible) {
		this.visible = v;
	}

	toggleDisabled(v = !this.disabled) {
		this.disabled = v;
	}

	abstract renderIcon(ctx: IPicexContext): ReactNode;

	abstract renderPanel(ctx: IPicexContext): ReactNode;
}
