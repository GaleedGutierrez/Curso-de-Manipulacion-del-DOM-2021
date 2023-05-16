/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

import { registerImage } from './lazy';

interface IImagesFoxRandom {
	image: string;
	link: string;
}

const getRandomNumber = (): number =>
	Math.floor(Math.random() * (MAXIMUM - MINIMUM + 1)) + MINIMUM;

// Obtener la imagen en base a un numero aleatorio
function getImg() {
	const IMG_NUMBER = getRandomNumber();
	const URL_IMG = new URL(`/images/${IMG_NUMBER}.jpg`, BASE_URL);

	return URL_IMG.href;
}

// Obtener la imagen en base a la API de las imágenes
export async function getImgAsync() {
	const RESPONSE = await fetch(RANDOM_IMG_API);
	const DATA: IImagesFoxRandom = await RESPONSE.json();

	return DATA.image;
}

async function createImageNode() {
	const FIGURE = document.createElement('figure');
	const IMG = document.createElement('img');

	FIGURE.className = 'm-4 w-80 mx-auto';
	IMG.alt = `Fox image ${counterFoxes}`;
	// IMG.src = getImg();
	IMG.dataset.src = await getImgAsync();
	FIGURE.appendChild(IMG);
	IMGS_CONTAINER.appendChild(FIGURE);
	counterFoxes++;
	registerImage(IMG);
}

const APP = document.querySelector('#app') as HTMLDivElement;
const IMGS_CONTAINER = document.createElement('div') as HTMLDivElement;
const ADD_IMG_BUTTON = document.createElement('button');

const BASE_URL = 'https://randomfox.ca';
const RANDOM_IMG_API = new URL('/floof', BASE_URL);

const MAXIMUM = 123;
const MINIMUM = 1;
let counterFoxes = 1;

ADD_IMG_BUTTON.textContent = 'Agregar imagen';
ADD_IMG_BUTTON.className =
	'bg-blue-500 hover:bg-blue-700 text-white font-bold p-3 rounded m-2';

APP.append(ADD_IMG_BUTTON, IMGS_CONTAINER);

ADD_IMG_BUTTON.addEventListener('click', createImageNode);

export {};
