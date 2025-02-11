import { FabricObject, InteractiveFabricObject } from 'fabric';
import { isActive } from '../utils';

export function mixinHoverBorder(object: FabricObject) {
	object.on({
		mouseover: () => {
			const ctx = object.canvas?.getContext();
			if (object.selectable && !isActive(object) && ctx) {
				object._renderControls(ctx, {
					cornerSize: 0,
					hasControls: false,
					hasBorders: true,
				});
			}
		},
		mouseout: () => {
			const ctx = object.canvas?.getContext();
			if (!isActive(object) && ctx) {
				object._renderControls(ctx, {
					hasControls: false,
					hasBorders: false,
					cornerSize: InteractiveFabricObject.ownDefaults.cornerSize,
				});
				object.canvas?.renderAll();
			}
		},
	});
}
