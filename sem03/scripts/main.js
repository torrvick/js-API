import { getRandomImage } from './api.js';
//prettier-ignore
import {
	setLike,
	unsetLike,
	isLiked,
	getFavouritesFirst,
	getFavouritesNext,
	getFavouritesPrevious,
	getHistoryPrevious,
	getHistoryNext,
	saveToHistory,
} from './localStorage.js';

const rootEl = document.querySelector('.root');

rootEl.insertAdjacentHTML(
	'beforeend',
	`
    <div class= "image-container">
        <img class="image">
        <div class="list-buttons">
            <button class="button prev"><i class="fa-solid fa-chevron-left"></i></button>
            <button class="button next"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
		<p class="author"></p>
    </div >
    <div class="controls">
		<div class="like-box">
        <button class="button like" disabled><i class="fa-regular fa-heart"></i><i class="fa-solid fa-heart"></i></button>
		<span class="likes-count"></span>
		</div>
        <button class="button mode" data-mode="random"></button>
    </div>
    <div class="status-box"></status>
    `
);

const imageContainerEl = rootEl.querySelector('.image-container');
const controlsEl = rootEl.querySelector('.controls');
const likeBtn = controlsEl.querySelector('.like');
const modeBtn = controlsEl.querySelector('.mode');
const listBtns = imageContainerEl.querySelector('.list-buttons');
const imageEl = imageContainerEl.querySelector('.image');
const authorEl = imageContainerEl.querySelector('.author');

let image = {};

document.addEventListener('DOMContentLoaded', renderServerImage());

listBtns.addEventListener('click', function ({ target }) {
	const currentMode = modeBtn.dataset.mode;
	if (target.closest('.prev')) {
		if (currentMode === 'random') {
			renderImageFrom(getHistoryPrevious());
		}
		if (currentMode === 'favourites') {
			renderImageFrom(getFavouritesPrevious());
		}
	}
	if (target.closest('.next')) {
		if (currentMode === 'random') {
			const nextImage = getHistoryNext();
			if (nextImage) {
				renderImageFrom(nextImage);
			} else {
				renderServerImage();
			}
		}
		if (currentMode === 'favourites') {
			renderImageFrom(getFavouritesNext());
		}
	}
});

likeBtn.addEventListener('click', function () {
	let likesCount = Number(controlsEl.querySelector('.likes-count').textContent);

	if (!this.classList.contains('setted')) {
		setLike(image);
		likeBtn.classList.add('setted');
		controlsEl.querySelector('.likes-count').textContent = ++likesCount;
		showMessage('success', 'Добавлена в избранное');
	} else {
		unsetLike(image);
		likeBtn.classList.remove('setted');
		controlsEl.querySelector('.likes-count').textContent = --likesCount;
		showMessage('success', 'Удалена из избранного');

		if (modeBtn.dataset.mode === 'favourites') {
			listBtns.querySelector('.next').click();
		}
	}
});

modeBtn.addEventListener('click', function () {
	if (this.dataset.mode === 'random') {
		this.dataset.mode = 'favourites';
		renderImageFrom(getFavouritesFirst());
	} else if (this.dataset.mode === 'favourites') {
		this.dataset.mode = 'random';
		renderServerImage();
	}
});

function renderImageFrom(imageSource) {
	try {
		imageEl.src = '';
		likeBtn.classList.remove('setted');
		likeBtn.disabled = true;
		authorEl.textContent = '';

		const image = imageSource;

		imageEl.src = image.urls.regular;
		authorEl.textContent = image.user.name;
		controlsEl.querySelector('.likes-count').textContent = image.likes;

		likeBtn.disabled = false;

		if (isLiked(image)) {
			likeBtn.classList.add('setted');
		}
	} catch (err) {
		likeBtn.disabled = true;
		authorEl.textContent = '';
		showMessage('error', err.message);
	}
}

async function renderServerImage() {
	const image = await getRandomImage();
	saveToHistory(image);
	renderImageFrom(image);
}

function showMessage(type, message) {
	const statusEl = document.querySelector('.status-box');
	statusEl.classList.add(type);
	statusEl.textContent = message;
	setTimeout(() => {
		statusEl.classList.remove(type);
	}, 3000);
}
