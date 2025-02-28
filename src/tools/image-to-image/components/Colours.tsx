import { BlockBackground } from '@/blocks/Background';
// import Sketch from '@uiw/react-color-sketch';
import Sketch, { ChromeInputType } from '@uiw/react-color-chrome';
import Wheel from '@uiw/react-color-wheel';
import { hexToRgba, HsvaColor, hsvaToHexa } from '@uiw/color-convert';
import { useControllableValue, useLocalStorageState } from 'ahooks';
import { Typography, Popover } from 'antd';
import { AiFillCloseCircle } from 'react-icons/ai';
import clsx from 'clsx';
import React, { useMemo, useState } from 'react';

const { Link, Text } = Typography;

function Colours({
	maxColours,
	ctx,
	dispatch,
	block,
	setBlock,
}: {
	maxColours?: number;
	ctx: IPicexContext;
	dispatch: IPicexDispatch;
	block: null | BlockBackground;
	setBlock: (block: BlockBackground) => void;
}) {
	const viewport = ctx.blocks[0];
	const value = block?.fill;

	const [hsva, setV] = useState<HsvaColor>();
	const v = useMemo(() => (hsva ? hsvaToHexa(hsva) : 'transparent'), [hsva]);
	const [open, setOpen] = useState(false);
	const [hex, setHex] = useControllableValue({
		value: typeof value === 'string' && value ? value : 'transparent',
		onChange: (fill) => {
			if (!viewport) {
				return;
			}
			if (block) {
				block.setX(viewport.getX());
				block.setY(viewport.getY());
				dispatch({
					type: 'updateBlock',
					block,
					payload: {
						fill: fill,
					},
				});
			} else {
				BlockBackground.fromColour(fill, {
					width: viewport?.width,
					height: viewport?.height,
				}).then((newBlock) => {
					dispatch({
						type: 'addBlock',
						block: newBlock,
					});
					setBlock(newBlock);
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
					{ colour: '#ab3638', border: '#d9d9d9' },
					{ colour: '#f49c46', border: '#d9d9d9' },
					{ colour: '#ffe629', border: '#d9d9d9' },
					{ colour: '#1abf0b', border: '#d9d9d9' },
					{ colour: '#d5ee62', border: '#d9d9d9' },
					{ colour: '#007aff', border: '#d9d9d9' },
					{ colour: '#d555dc', border: '#d9d9d9' },
					{ colour: '#9720d7', border: '#d9d9d9' },
					{ colour: '#d9d9d9', border: '#d9d9d9' },
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
					open={open}
					onOpenChange={setOpen}
					content={
						<>
							<Sketch
								color={hsva}
								inputType={ChromeInputType.HEXA}
								placement={null as any}
								style={{
									border: 'none',
									boxShadow: 'none',
								}}
								// presetColors={false}
								onChange={(color) => setV(color.hsva)}
							/>
							<div className="flex justify-end gap-4">
								<Text
									className="cursor-pointer"
									onClick={() => setOpen(false)}
								>
									Cancel
								</Text>
								<Link
									onClick={() => {
										setHex(v);
										setLocalHexes((prev) =>
											(prev?.includes(v) ? prev : [v, ...(prev ?? [])]).slice(
												0,
												maxColours,
											),
										);
										setOpen(false);
									}}
								>
									Confirm
								</Link>
							</div>
						</>
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
						removable
						key={localHex}
						hex={hex}
						colour={localHex}
						border={'#d9d9d9'}
						setHex={setHex}
						onRemove={() => {
							setLocalHexes((prev) =>
								!prev ? [] : prev.filter((v) => v !== localHex),
							);
						}}
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
	removable,
	onRemove,
}: {
	hex: string;
	colour: string;
	border?: string;
	setHex: (hex: string) => void;
	removable?: boolean;
	onRemove?: (hex: string) => void;
}) {
	return (
		<li
			key={colour}
			className={clsx(
				`group relative w-[35px] h-[35px] rounded-xl cursor-pointer`,
				{
					'shadow-[0_0_0_1px_#007aff]': hex === colour,
				},
			)}
			style={{
				boxShadow: border && hex !== colour ? `0 0 0 1px ${border}` : undefined,
				background: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==)`,
				backgroundColor:
					colour === 'transparent' || hexToRgba(colour).a === 0
						? '#fff'
						: undefined,
			}}
			onClick={() => {
				setHex(colour);
			}}
		>
			<div
				className="w-full h-full rounded-xl"
				style={{
					background: colour,
				}}
			></div>
			{removable ? (
				<span
					className="transition-opacity opacity-0 group-hover:opacity-100 absolute top-0 right-0 ml-1 mt-1 translate-x-1/2 -translate-y-1/2 text-xl hover:text-[#007AFF]"
					onClick={(e) => {
						e.stopPropagation();
						onRemove?.(hex);
					}}
				>
					<AiFillCloseCircle />
				</span>
			) : null}
		</li>
	);
}

export default Colours;
