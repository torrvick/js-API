import { saveToHistory } from './localStorage.js';

const APIkey = '';

async function getRandomImage() {
	const response = await fetch(`https://api.unsplash.com/photos/random`, { headers: { Authorization: 'Client-ID ' + APIkey } });
	if (!response.ok) {
		throw new Error(`Fetch error: ${(await response.json()).errors[0]}`);
	}
	const image = await response.json();
	saveToHistory(image);
	return image;
}

export { getRandomImage };
