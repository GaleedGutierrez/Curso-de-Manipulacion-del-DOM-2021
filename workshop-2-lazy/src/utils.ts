import { loadedImages } from '.';

interface IImagesFoxRandom {
	image: string;
	link: string;
}

export const getRandomNumber = (): number =>
	Math.floor(Math.random() * (MAXIMUM - MINIMUM + 1)) + MINIMUM;

// Obtener la imagen en base a un numero aleatorio
export function getImg() {
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

export function logState() {
	console.log(`⚪️ Total Imágenes: ${ALL_IMGS.length}`);
	console.log(`🟣 Imágenes cargadas: ${loadedImages}`);
	console.log('--------------------------------------');
}

export const ALL_IMGS: HTMLElement[] = [];

const MAXIMUM = 123;
const MINIMUM = 1;
const BASE_URL = 'https://randomfox.ca';
const RANDOM_IMG_API = new URL('/floof', BASE_URL);
