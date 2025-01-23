import { Pattern, Rect, TFiller } from 'fabric';
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

	fill: TFiller | string | null = (() => {
		const canvas = getTransparentUnitCanvas();

		return new Pattern({
			source: canvas,
			repeat: 'repeat',
		});
	})();

	async cloneWithoutFill() {
		const cloned = await this.clone();
		cloned.fill = null;

		return cloned;
	}
}
