import React, { PropsWithChildren, ReactNode } from 'react';

export default function PicexLayout({
	left,
	children,
	right,
}: PropsWithChildren<{
	left: ReactNode;
	right: ReactNode;
}>) {
	return (
		<section className="picex flex h-full">
			<div className="relative w-1/3 max-w-[396px]">{left}</div>
			<div className="relative min-w-0 flex-1 bg-[#f8fafc] dark:bg-[#ffffff14]">
				{children}
			</div>
			<div className="relative max-w-1/5 flex-[0_1_0]">{right}</div>
		</section>
	);
}
