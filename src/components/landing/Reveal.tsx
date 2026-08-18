'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/** Fades and slides its children in the first time they scroll into view. */
export default function Reveal({
	children,
	className,
	delay = 0,
}: {
	children: React.ReactNode;
	className?: string;
	delay?: number;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const [shown, setShown] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				setShown(true);
				observer.disconnect();
			},
			{ threshold: 0.15 },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={ref}
			style={delay ? { transitionDelay: `${delay}ms` } : undefined}
			className={cn(
				'transition-all duration-700 ease-out',
				shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
				className,
			)}
		>
			{children}
		</div>
	);
}
