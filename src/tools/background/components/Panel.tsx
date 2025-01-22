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
					block={block}
					setBlock={setBlock}
				/>
			);
			break;
	}

	return (
		<>
			<Segmented<Tabs>
				block
				className="mb-4"
				options={Object.values(Tabs)}
				onChange={setTab}
			/>
			<div className="picex-plugin-background">{node}</div>
		</>
	);
}

export default Panel;
