import { Pattern, Rect } from 'fabric';
import { BlockTypes, IBlock } from './types';
import { getTransparentUnitCanvas } from '@/utils/image';

/**
 * 画布根块
 * @description 实现背景替换等接口
 */
export class BlockViewport extends Rect implements IBlock {
	blockType = BlockTypes.Viewport;

	selectable = false;

	evented = false;

	hasControls = false;

	fill = (() => {
		const canvas = getTransparentUnitCanvas();

		return new Pattern({
			source: canvas,
			repeat: 'repeat',
		});
	})();
}
