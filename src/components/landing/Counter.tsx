'use client';

import { useEffect, useRef, useState } from 'react';
import type { CounterSpec } from '@/lib/stats';

const DURATION_MS = 1400;

/** Animates from 0 to the target value the first time it scrolls into view. */
export default function Counter({ target, decimals, prefix, suffix, className }: CounterSpec & { className?: string }) {
	const ref = useRef<HTMLSpanElement>(null);
	const [value, setValue] = useState(0);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		let raf = 0;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				observer.disconnect();
				const start = performance.now();
				const tick = (now: number) => {
					const progress = Math.min((now - start) / DURATION_MS, 1);
					const eased = 1 - Math.pow(1 - progress, 3);
					setValue(target * eased);
					if (progress < 1) raf = requestAnimationFrame(tick);
				};
				raf = requestAnimationFrame(tick);
			},
			{ threshold: 0.4 },
		);
		observer.observe(el);
		return () => {
			observer.disconnect();
			cancelAnimationFrame(raf);
		};
	}, [target]);

	return (
		<span ref={ref} className={className}>
			{prefix}
			{value.toFixed(decimals)}
			{suffix}
		</span>
	);
}
