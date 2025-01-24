import { Button } from 'antd';
import Redo from '@/images/redo.svg?react';
import Undo from '@/images/undo.svg?react';
import { usePicexCtx } from '@/core/context';
import { useEffect, useState } from 'react';

const events = [
	'history:append',
	'history:undo',
	'history:redo',
	'history:clear',
] as const;

export function HistoryBtns() {
	const [count, setCount] = useState(0);
	const { fcanvas } = usePicexCtx();

	useEffect(() => {
		const canvas = fcanvas;
		const handler = () => {
			setCount((prev) => prev + 1);
		};
		events.forEach((event) => {
			canvas?.on(event, handler);
		});

		return () => {
			events.forEach((event) => {
				canvas?.off(event, handler);
			});
		};
	}, [fcanvas]);

	return (
		<aside className="absolute z-10 top-8 left-1/2 -translate-x-1/2 flex items-center justify-start gap-2">
			<div className="flex items-center gap-4">
				<Button
					color="default"
					variant="filled"
					className="w-[3.125rem] h-[3.125rem] p-0 flex items-center justify-center"
					disabled={!fcanvas?.history?.historyUndo?.length}
					onClick={() => fcanvas?.history?.undo()}
				>
					<Undo />
				</Button>
				<Button
					color="default"
					variant="filled"
					className="w-[3.125rem] h-[3.125rem] p-0 flex items-center justify-center"
					disabled={!fcanvas?.history?.historyRedo?.length}
					onClick={() => fcanvas?.history?.redo()}
				>
					<Redo />
				</Button>
			</div>
		</aside>
	);
}
