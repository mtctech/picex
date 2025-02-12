import { FabricObject } from 'fabric';

export function scaleToFitSize(
	object: FabricObject,
	size: { width: number; height: number },
) {
	const { width, height } = object;
	if (width > height) {
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
	if (width > height) {
		return {
			width: size.width,
			height: (size.width / width) * height,
		};
	} else {
		return {
			width: (size.height / height) * width,
			height: size.height,
		};
	}
}
