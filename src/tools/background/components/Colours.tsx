import Sketch from '@uiw/react-color-sketch';
import Wheel from '@uiw/react-color-wheel';
import { useControllableValue } from 'ahooks';
import { Popover } from 'antd';
import clsx from 'clsx';
import React from 'react';

function Colours({
	ctx,
	dispatch,
}: {
	ctx: IPicexContext;
	dispatch: IPicexDispatch;
}) {
	const { blocks } = ctx;

	const [hex, setHex] = useControllableValue({
		value: blocks[0]?.backgroundColor ?? 'transparent',
		onChange: (v) => {
			dispatch({
				type: 'updateBlock',
				payload: {
					block: blocks[0],
					background: v,
				},
			});
		},
	});

	return (
		<div>
			<ul className="flex flex-wrap gap-4">
				{[
					{ colour: 'transparent', border: '#d9d9d9' },
					{ colour: '#fff', border: '#d9d9d9' },
					{ colour: '#ab3638' },
					{ colour: '#f49c46' },
					{ colour: '#ffe629' },
					{ colour: '#1abf0b' },
					{ colour: '#d5ee62' },
					{ colour: '#007aff' },
					{ colour: '#d555dc' },
					{ colour: '#9720d7' },
					{ colour: '#d9d9d9' },
					{ colour: '#000000' },
				].map(({ colour, border }) => (
					<li
						key={colour}
						className={clsx(`w-[35px] h-[35px] rounded-xl cursor-pointer`, {
							'border border-solid border-[#007aff]': hex === colour,
						})}
						style={{
							border:
								border && hex !== colour ? `1px solid ${border}` : undefined,
							background:
								colour === 'transparent'
									? `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==)`
									: colour,
						}}
					/>
				))}
			</ul>
			<hr className="my-[18px]" />
			<ul className="flex flex-wrap gap-4">
				<Popover
					content={
						<Sketch
							color={hex}
							onChange={(color) => {
								setHex(color.hex);
							}}
						/>
					}
					trigger="click"
					placement="bottomLeft"
				>
					<li
						className={`overflow-hidden relative w-[35px] h-[35px] rounded-xl cursor-pointer`}
					>
						<div className="pointer-events-none absolute w-[130%] h-[130%] -left-[15%] -top-[15%]">
							<Wheel
								className="!w-full !h-full"
								pointer={() => null}
							/>
						</div>
					</li>
				</Popover>
			</ul>
		</div>
	);
}

export default Colours;
