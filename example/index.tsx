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
			/>
		</App>
	</ConfigProvider>,
);
