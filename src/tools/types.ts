import { JSX } from 'react';

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

	abstract renderIcon(): JSX.Element;

	abstract renderPanel(): JSX.Element;
}
