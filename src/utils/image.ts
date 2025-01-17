import { DraggerProps } from 'antd';

type UploadRequestOption = Parameters<
	NonNullable<DraggerProps['customRequest']>
>['0'];

export async function file2Base64URL(file: Blob | File) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});
}

export async function uploadFileByBase64({
	file,
	onSuccess,
	onError,
}: UploadRequestOption) {
	let url;
	try {
		if (typeof file === 'string') {
			url = file;
		} else {
			url = await file2Base64URL(file);
		}

		onSuccess?.({ url });

		return {
			url,
		};
	} catch (error) {
		onError?.(error as Error);
	}
}
