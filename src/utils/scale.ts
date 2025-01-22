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
