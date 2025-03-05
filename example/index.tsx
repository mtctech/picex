import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { PicexEditor } from '../src';

import './index.css';
import { App, ConfigProvider } from 'antd';
import { configResponsive } from 'ahooks';

configResponsive({
	xs: 0,
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
});

function Editor() {
	const [images, setImages] = React.useState<any>(undefined);
	const [activeToolKey, setActiveToolKey] =
		React.useState<string>('background');

	return (
		<PicexEditor
			watermark={{
				value: 'Picex',
			}}
			activeToolKey={activeToolKey}
			// viewport={{
			// 	width: 920,
			// 	height: 613,
			// }}
			images={images}
			onToolChange={(key) => setActiveToolKey(key)}
			// images={[
			// 	{
			// 		url: 'https://plus.unsplash.com/premium_photo-1730828573449-a4efc34e3644?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			// 		width: 3870,
			// 		height: 2580,
			// 	},
			// ]}
			// left={{
			// 	children: (
			// 		<div className="z-10 absolute left-full ml-4 top-4">
			// 			<button onClick={() => setImages([])}>Clear</button>
			// 		</div>
			// 	),
			// }}
			uploadProps={{
				err: <span>Test</span>,
				hidden: true,
			}}
		/>
	);
}

ReactDOM.createRoot(document.getElementById('app')!).render(
	<ConfigProvider
		theme={{
			token: {
				fontFamily: 'inherit',
			},
		}}
	>
		<App className="h-full">
			<Editor />
		</App>
	</ConfigProvider>,
);
