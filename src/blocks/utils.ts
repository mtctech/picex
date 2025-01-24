import { FabricObject } from 'fabric';
import { BlockTypes, IBlock } from './types';

export function isActive(object: FabricObject) {
	return object.canvas?.getActiveObjects().includes(object);
}

export function isContentBlock(object: IBlock) {
	return [BlockTypes.Image, BlockTypes.Background].includes(object.blockType);
}
