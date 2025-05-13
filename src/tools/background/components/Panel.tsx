import { IPicexToolRenderParams } from '../../types';
import React, { useState, useEffect } from 'react';
import Colours from './Colours';
import Images from './Images';
import { Segmented } from 'antd';
import { UploadBoxProps } from '@/components/common/UploadBox';
import { BlockBackground } from '@/blocks/Background';
import locale from '@/locale';
import EventBus from '@/utils/eventBus';

function Panel({
	config,
	...props
}: IPicexToolRenderParams & { config?: UploadBoxProps }) {
	const Tabs = {
		Colour: locale.t('background.panel.colour'),
		Image: locale.t('background.panel.image'),
	};

	const [tab, setTab] = useState(Tabs.Colour);
	const [block, setBlock] = useState<BlockBackground | null>(null);

	useEffect(() => {
		const eventBusListener = () => {
			setBlock(null);
		};
		EventBus.on('reset-state', eventBusListener);

		return () => {
			EventBus.off('reset-state', eventBusListener);
		};
	}, []);

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
		<div className="pb-4 pt-5 overflow-y-auto h-full">
			<div className="picex-plugin-background h-full flex flex-col">
				<div className="px-4">
					<Segmented<string>
						block
						className="rounded-lg text-base leading-10"
						options={Object.values(Tabs)}
						onChange={setTab}
					/>
				</div>
				<div className="pt-4 pl-4 flex-1 min-h-0 overflow-y-auto picex-scrollbar">
					{node}
				</div>
			</div>
		</div>
	);
}

export default Panel;
