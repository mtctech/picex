import { IPicexToolRenderParams } from '../../types';
import React, { useState } from 'react';
import Colours from './Colours';
import Images from './Images';
import { Segmented } from 'antd';
import { UploadBoxProps } from '@/components/common/UploadBox';
import { BlockBackground } from '@/blocks/Background';

enum Tabs {
	Colour = 'Colour',
	Image = 'Image',
}

function Panel({
	config,
	...props
}: IPicexToolRenderParams & { config?: UploadBoxProps }) {
	const [tab, setTab] = useState(Tabs.Colour);
	const [block, setBlock] = useState<BlockBackground | null>(null);

	let node;
	switch (tab) {
		case Tabs.Colour:
			node = (
				<Colours
					{...props}
					{...config}
					block={block}
					setBlock={setBlock}
				/>
			);
			break;
		case Tabs.Image:
			node = (
				<Images
					{...props}
					{...config}
					children={null}
					block={block}
					setBlock={setBlock}
				/>
			);
			break;
	}

	return (
		<div className="picex-plugin-background h-full flex flex-col">
			<div className="px-4">
				<Segmented<Tabs>
					block
					className="mb-4 rounded-lg text-base leading-10"
					options={Object.values(Tabs)}
					onChange={setTab}
				/>
			</div>
			<div className="px-4 flex-1 min-h-0 overflow-y-auto">{node}</div>
		</div>
	);
}

export default Panel;
