/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/
export interface IAttributesAvocado {
	description: string;
	shape: string;
	hardiness: string;
	taste: string;
}

export interface IAvocado {
	name: string;
	id: string;
	sku: string;
	price: number;
	image: string;
	attributes: IAttributesAvocado;
}

export interface IAvocadoJson {
	length: number;
	data: IAvocado[];
}

const formatPrice = (price: number): string | null => {
	const LOCALES = navigator.language;

	const NEW_PRICE = new Intl.NumberFormat(LOCALES, {
		style: 'currency',
		currency: 'USD',
	});

	return NEW_PRICE.format(price);
};

const BASE_URL = 'https://platzi-avo.vercel.app';
const API_URL = new URL('/api/avo', BASE_URL);

const RESPONSE = await fetch(API_URL);
const RESPONSE_JSON: IAvocadoJson = await RESPONSE.json();
const AVOCADOES = RESPONSE_JSON.data;
const APP_NODE = document.querySelector('#app') as HTMLDivElement;

const NODE_ARRAY = AVOCADOES.map((item) => {
	const FIGURE = document.createElement('figure');
	const IMG = document.createElement('img');
	const TITLE = document.createElement('h2');
	const PRICE = document.createElement('p');
	const DATA_CONTAINER = document.createElement('div');
	const CONTAINER = document.createElement('div');

	// Content
	TITLE.textContent = item.name;
	PRICE.textContent = formatPrice(item.price);
	IMG.src = `${BASE_URL}${item.image}`;
	IMG.alt = item.name;

	// Styles
	IMG.className =
		'h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6';
	TITLE.className = 'text-lg';
	PRICE.className = 'text-gray-600';
	DATA_CONTAINER.className = 'text-center md:text-left';
	CONTAINER.className = 'md:flex bg-white rounded-lg p-6 hover:bg-gray-300';

	// Append
	FIGURE.appendChild(IMG);
	DATA_CONTAINER.append(TITLE, PRICE);
	CONTAINER.append(FIGURE, DATA_CONTAINER);

	return CONTAINER;
});

APP_NODE.append(...NODE_ARRAY);
APP_NODE.addEventListener('click', (event: Event) => {
	const { target } = event;

	if ((target as HTMLElement).nodeName === 'H2') {
		alert('Hola');
	}
});

export {};
