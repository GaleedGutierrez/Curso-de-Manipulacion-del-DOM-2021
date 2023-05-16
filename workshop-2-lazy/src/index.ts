import { OBSERVER, registerImage } from './lazy';
import { ALL_IMGS, getImgAsync, logState } from './utils';

export let loadedImages = 0;

async function createImageNode() {
	const FIGURE = document.createElement('figure');
	const IMG = document.createElement('img');

	FIGURE.className = 'm-4 w-80 mx-auto';
	// IMG.src = getImg();
	IMG.src =
		'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=';
	IMG.dataset.src = await getImgAsync();
	IMG.className = 'bg-gray-300';
	FIGURE.appendChild(IMG);
	ALL_IMGS.push(FIGURE);
	IMG.alt = `Fox image ${ALL_IMGS.length}`;
	IMGS_CONTAINER.appendChild(FIGURE);
	registerImage(IMG);
}

function cleanImgs() {
	for (const FIGURE of ALL_IMGS) {
		FIGURE.remove();
	}

	ALL_IMGS.splice(0, ALL_IMGS.length);
	loadedImages = 0;
	logState();
}

export const loadImg = async (entry: IntersectionObserverEntry) => {
	const IMG = entry.target as HTMLImageElement;
	const URL = IMG.dataset.src;

	IMG.src = URL ?? (await getImgAsync());
	OBSERVER.unobserve(IMG);
	loadedImages++;
	logState();
};

const APP = document.querySelector('#app') as HTMLDivElement;
const ADD_IMG_BUTTON = document.querySelector(
	'#add-img-btn'
) as HTMLButtonElement;
const CLEAN_BTN = document.querySelector('#clean-btn') as HTMLButtonElement;
const IMGS_CONTAINER = document.createElement('div') as HTMLDivElement;

APP.appendChild(IMGS_CONTAINER);
ADD_IMG_BUTTON.addEventListener('click', createImageNode);
CLEAN_BTN.addEventListener('click', cleanImgs);
logState();

export {};
