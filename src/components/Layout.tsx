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
		<section className="flex h-full">
			<div className="w-1/3 max-w-[396px]">{left}</div>
			<div className="flex-1 relative">{children}</div>
			<div className="w-1/5">{right}</div>
		</section>
	);
}
