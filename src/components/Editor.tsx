import React, { Children, PropsWithChildren, ReactNode } from 'react';
import PicexLayout from './Layout';
import { PicexToolBar } from './ToolBar';
import { PicexCanvas } from './Canvas';
import { PicexProperties } from './Properties';
import { PicexBlockTree } from './BlockTree';
import { PicexTool } from '@/tools/types';

function PicexEditor({
	tools,
	children,
	leftChildren,
	rightChildren,
}: PropsWithChildren<{
	tools?: PicexTool[];
	multiple?: boolean;
	leftChildren?: ReactNode;
	rightChildren?: ReactNode;
}>) {
	return (
		<PicexLayout
			left={
				<>
					<PicexToolBar tools={tools} />
					{leftChildren}
				</>
			}
			right={
				<>
					<PicexProperties />
					<PicexBlockTree />
					{rightChildren}
				</>
			}
		>
			<PicexCanvas>{children}</PicexCanvas>
		</PicexLayout>
	);
}

export default PicexEditor;
