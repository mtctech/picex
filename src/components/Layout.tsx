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
	leftStyle?: React.CSSProperties & { className?: string };
	rightStyle?: React.CSSProperties & { className?: string };
	right: ReactNode;
	selectedTool?: PicexTool;
}>) {
	return (
		<section className="picex flex flex-col md:flex-row w-full h-full">
			<div
				className={cn(
					'relative md:w-1/3 md:max-w-[396px]',
					selectedTool?.leftStyle?.className,
				)}
				style={{
					...leftStyle,
					...selectedTool?.leftStyle,
				}}
			>
				{left}
			</div>
			<div className="relative min-w-0 flex-1 bg-[#f8fafc] dark:bg-[#ffffff14]">
				{children}
			</div>
			<div
				className={cn(
					'relative md:max-w-1/5 flex-[0_1_0]',
					selectedTool?.rightStyle?.className,
				)}
				style={{
					...rightStyle,
					...selectedTool?.rightStyle,
				}}
			>
				{right}
			</div>
		</section>
	);
}
