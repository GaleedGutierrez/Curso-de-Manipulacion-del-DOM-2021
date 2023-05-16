import { loadImg } from '.';
import { logState } from './utils';

const isIntersection = (entry: IntersectionObserverEntry) =>
	entry.isIntersecting;

export const registerImage = (img: HTMLImageElement) => {
	OBSERVER.observe(img);
	logState();
};

const OPTIONS = {
	root: null,
	rootMargin: '0px',
	threshold: 0,
};

export const OBSERVER = new IntersectionObserver((entries) => {
	entries.filter(isIntersection).forEach(loadImg);
}, OPTIONS);
