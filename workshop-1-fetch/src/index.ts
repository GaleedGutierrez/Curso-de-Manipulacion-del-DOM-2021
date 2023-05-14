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

const API_URL = 'https://platzi-avo.vercel.app/api/avo';
const BASE_URL = 'https://platzi-avo.vercel.app';

const RESPONSE = await fetch(API_URL);
const RESPONSE_JSON: IAvocadoJson = await RESPONSE.json();
const AVOCADOES = RESPONSE_JSON.data;
const ALL_OF_AVOCADOES: HTMLElement[] = [];
const APP_NODE = document.querySelector('#app') as HTMLDivElement;

AVOCADOES.forEach((item) => {
	const FIGURE = document.createElement('figure');
	const IMG = document.createElement('img');
	const TITLE = document.createElement('h2');
	const PRICE = document.createElement('p');
	const CONTAINER = document.createElement('div');

	PRICE.textContent = `$${item.price.toString()}`;
	TITLE.textContent = item.name;
	IMG.src = `${BASE_URL}${item.image}`;
	IMG.alt = item.name;

	FIGURE.appendChild(IMG);
	CONTAINER.append(FIGURE, TITLE, PRICE);
	ALL_OF_AVOCADOES.push(CONTAINER);
});

APP_NODE.append(...ALL_OF_AVOCADOES);

export {};
