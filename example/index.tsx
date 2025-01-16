import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { PicexEditor } from '../src';

import './index.css';

ReactDOM.createRoot(document.getElementById('app')!).render(
	React.createElement(PicexEditor, {}),
);
