import { useCallback } from 'react';
import { isSameSecondLevelDomain } from '@/utils/dom';
interface ImageInfo {
	url: string;
	width: number;
	height: number;
}

export const useImageLoader = () => {
	const loadImage = useCallback(
		(imageInfo: ImageInfo): Promise<HTMLImageElement> => {
			return new Promise((resolve, reject) => {
				const img = new Image();
				if (isSameSecondLevelDomain(imageInfo.url, window.location.origin)) {
					img.crossOrigin = 'use-credentials';
				} else {
					img.crossOrigin = 'anonymous';
				}
				img.onload = () => resolve(img);
				img.onerror = reject;
				img.src = imageInfo.url;
			});
		},
		[],
	);

	const loadImages = useCallback(
		(images: ImageInfo[]): Promise<HTMLImageElement[]> => {
			return Promise.all(images.map(loadImage));
		},
		[loadImage],
	);

	return { loadImage, loadImages };
};
