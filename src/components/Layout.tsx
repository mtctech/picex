import { PicexTool } from '@/tools';
import { cn } from '@/utils/cn';
import React, { PropsWithChildren, ReactNode } from 'react';

export default function PicexLayout({
	left,
	children,
	right,
	leftStyle,
	rightStyle,
	selectedTool,
}: PropsWithChildren<{
	left: ReactNode;
	right: ReactNode;
	leftStyle?: React.CSSProperties;
	rightStyle?: React.CSSProperties;
	selectedTool?: PicexTool;
}>) {
	return (
		<section className="picex flex flex-col md:flex-row w-full h-full">
			<div
				className={cn('relative md:w-1/3 md:max-w-[396px]')}
				style={leftStyle}
			>
				{left}
			</div>
			<div className="relative min-w-0 flex-1 bg-[#f8fafc] dark:bg-[#ffffff14]">
				{children}
			</div>
			<div
				className={cn('relative md:max-w-1/5 flex-[0_1_0]')}
				style={rightStyle}
			>
				{right}
			</div>
		</section>
	);
}
