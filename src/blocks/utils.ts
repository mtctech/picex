import { FabricObject } from 'fabric';

export function isActive(object: FabricObject) {
	return object.canvas?.getActiveObjects().includes(object);
}
