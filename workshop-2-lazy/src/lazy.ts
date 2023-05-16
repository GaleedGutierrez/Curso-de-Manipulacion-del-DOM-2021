const isIntersection = (entry: IntersectionObserverEntry) =>
	entry.isIntersecting;

export const registerImage = (img: HTMLImageElement) => {
	OBSERVER.observe(img);
};

const action = (entry: IntersectionObserverEntry) => {
	// console.log('aaaaa');

	const NODE = entry.target as HTMLImageElement;

	OBSERVER.unobserve(NODE);
};

const OPTIONS = {
	root: null,
	rootMargin: '0px',
	threshold: 0,
};
const OBSERVER = new IntersectionObserver((entries) => {
	entries.filter(isIntersection).forEach(action);
}, OPTIONS);
