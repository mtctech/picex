import { UploadProps } from 'antd';

type UploadRequestOption = Parameters<
	NonNullable<UploadProps['customRequest']>
>['0'];

export async function file2Base64URL(file: Blob | File) {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});
}

export async function getImageSize(url: string) {
	const img = new Image();
	img.src = url;
	await img.decode();

	return {
		width: img.width,
		height: img.height,
	};
}

export async function uploadFileByBase64({
	file,
	onSuccess,
	onError,
}: UploadRequestOption) {
	let url: string;
	try {
		if (typeof file === 'string') {
			url = file;
		} else {
			url = await file2Base64URL(file);
		}

		const { width, height } = await getImageSize(url);

		onSuccess?.({
			url,
			width,
			height,
		});

		return {
			url,
		};
	} catch (error) {
		onError?.(error as Error);
	}
}

export function getTransparentUnitCanvas(size = 72) {
	const l = size / 2;
	const canvas = window?.OffscreenCanvas
		? new OffscreenCanvas(size, size)
		: (() => {
				const canvas = document.createElement('canvas');
				canvas.width = size;
				canvas.height = size;
				return canvas;
			})();
	const ctx = canvas.getContext('2d');
	ctx!.fillStyle = '#EBEBEB';
	ctx!.fillRect(0, 0, l, l);
	ctx!.fillRect(l, l, l, l);
	ctx!.fillStyle = 'white';
	ctx!.fillRect(0, l, l, l);
	ctx!.fillRect(l, 0, l, l);

	return canvas;
}
