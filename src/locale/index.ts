//@ts-nocheck

import format from './format.ts';
import enLang from './lang/en.ts';
import jaLang from './lang/ja.ts';
let _lang = enLang;

const locale = {
	en: enLang,
	ja: jaLang,
};

function use(lang) {
	_lang = locale[lang] || enLang;
}

function t(path?: string, options?: any) {
	const array = path?.split('.');
	let current = _lang;

	if (array) {
		for (let i = 0, j = array.length; i < j; i++) {
			const property = array[i];
			const value = current[property];
			if (i === j - 1) return format(value, options);
			if (!value) return '';
			current = value;
		}
	}
	return '';
}

export default {
	use,
	t,
};
