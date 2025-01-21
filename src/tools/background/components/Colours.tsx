import { BlockCanvas } from '@/blocks/Canvas';
import Sketch from '@uiw/react-color-sketch';
import Wheel from '@uiw/react-color-wheel';
import { useControllableValue, useLocalStorageState } from 'ahooks';
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
	const value = blocks[0]?.backgroundColor;

	const [hex, setHex] = useControllableValue({
		value: typeof value === 'string' && value ? value : 'transparent',
		onChange: (v) => {
			if (blocks[0] instanceof BlockCanvas) {
				dispatch({
					type: 'updateBlock',
					block: blocks[0],
					payload: {
						backgroundColor: v,
					},
				});
			}
		},
	});
	const [localHexes, setLocalHexes] = useLocalStorageState(
		'picex-background-colors',
		{
			defaultValue: [] as string[],
		},
	);

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
					<ColourItem
						key={colour}
						hex={hex}
						colour={colour}
						border={border}
						setHex={setHex}
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
								setLocalHexes((prev) =>
									prev?.includes(color.hex)
										? prev
										: [...(prev ?? []), color.hex],
								);
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
				{localHexes?.map((localHex) => (
					<ColourItem
						key={localHex}
						hex={hex}
						colour={localHex}
						setHex={setHex}
					/>
				))}
			</ul>
		</div>
	);
}

function ColourItem({
	hex,
	colour,
	border,
	setHex,
}: {
	hex: string;
	colour: string;
	border?: string;
	setHex: (hex: string) => void;
}) {
	return (
		<li
			key={colour}
			className={clsx(`w-[35px] h-[35px] rounded-xl cursor-pointer`, {
				'border border-solid border-[#007aff]': hex === colour,
			})}
			style={{
				border: border && hex !== colour ? `1px solid ${border}` : undefined,
				background:
					colour === 'transparent'
						? `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==)`
						: colour,
			}}
			onClick={() => {
				setHex(colour);
			}}
		/>
	);
}

export default Colours;
