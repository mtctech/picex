import { FabricObject } from 'fabric';

export function scaleToFitSize(
	object: FabricObject,
	size: { width: number; height: number },
	forcing = false,
) {
	const { width, height } = object;
	if (!forcing && width <= size.width && height <= size.height) {
		return;
	}
	const widthRatio = size.width / width;
	const heightRatio = size.height / height;
	if (widthRatio < heightRatio) {
		object.scaleToWidth(size.width);
	} else {
		object.scaleToHeight(size.height);
	}
}

export function getScaledFitSize(
	viewport: { width: number; height: number },
	size: { width: number; height: number },
) {
	const { width, height } = viewport;
	if (width <= size.width && height <= size.height) {
		return viewport;
	}
	const widthRatio = size.width / width;
	const heightRatio = size.height / height;
	if (widthRatio < heightRatio) {
		return {
			width: size.width,
			height: widthRatio * height,
		};
	} else {
		return {
			width: heightRatio * width,
			height: size.height,
		};
	}
}
