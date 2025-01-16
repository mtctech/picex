import { IPicexToolRenderParams } from '../../types';
import React, { useState } from 'react';
import Colours from './Colours';
import Images from './Images';
import { Segmented } from 'antd';
import { UploadBoxProps } from '@/components/common/UploadBox';

enum Tabs {
	Colour = 'Colour',
	Image = 'Image',
}

function Panel({
	config,
	...props
}: IPicexToolRenderParams & { config?: UploadBoxProps }) {
	const [tab, setTab] = useState(Tabs.Colour);

	let node;
	switch (tab) {
		case Tabs.Colour:
			node = (
				<Colours
					{...props}
					{...config}
				/>
			);
			break;
		case Tabs.Image:
			node = (
				<Images
					{...props}
					{...config}
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
			{node}
		</>
	);
}

export default Panel;
