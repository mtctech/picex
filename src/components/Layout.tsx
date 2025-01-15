import React from 'react';

export default function PicexLayout(props: PropsWithChildren) {
	return (
		<section className="flex">
			<div className="w-1/5"></div>
			<div className="flex-1"></div>

			<div className="w-1/5"></div>
		</section>
	);
}
