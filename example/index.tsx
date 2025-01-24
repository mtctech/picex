import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { PicexEditor } from '../src';

import './index.css';
import { App, ConfigProvider } from 'antd';

ReactDOM.createRoot(document.getElementById('app')!).render(
	<ConfigProvider
		theme={{
			token: {
				fontFamily: 'inherit',
			},
		}}
	>
		<App className="h-full">
			<PicexEditor
				watermark={{
					value: 'Picex',
				}}
				// images={[
				// 	{
				// 		url: 'https://plus.unsplash.com/premium_photo-1730828573449-a4efc34e3644?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				// 		width: 3870,
				// 		height: 2580,
				// 	},
				// ]}
			/>
		</App>
	</ConfigProvider>,
);
