import { StaticCanvas } from 'fabric';
import { BlockTypes, IBlock } from './types';

/**
 * 画布根块
 * @description 实现背景替换等接口
 */
export class BlockCanvas extends StaticCanvas implements IBlock {
	blockType = BlockTypes.Background;

	get left() {
		return 0;
	}
	set left(_: number) {}
	get top() {
		return 0;
	}
	set top(_: number) {}

	move = async (x: number, y: number) => {};
	resize = async (w: number, h: number) => {
		this.set({
			width: w,
			height: h,
		});
	};
}
