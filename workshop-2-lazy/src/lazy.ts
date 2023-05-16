import { getImgAsync } from '.';

const isIntersection = (entry: IntersectionObserverEntry) =>
	entry.isIntersecting;

export const registerImage = (img: HTMLImageElement) => {
	OBSERVER.observe(img);
};

const loadImg = async (entry: IntersectionObserverEntry) => {
	const IMG = entry.target as HTMLImageElement;
	const URL = IMG.dataset.src;

	IMG.src = URL ?? (await getImgAsync());
	console.log(IMG.nodeName);
	OBSERVER.unobserve(IMG);
};

const OPTIONS = {
	root: null,
	rootMargin: '0px',
	threshold: 0,
};
const OBSERVER = new IntersectionObserver((entries) => {
	entries.filter(isIntersection).forEach(loadImg);
}, OPTIONS);
