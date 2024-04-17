import { Galery } from './galery.js';

const imgDB = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg'];

const galery = new Galery(imgDB);

const imgBoxEl = document.querySelector('.img-box');
const buttonBoxEl = document.querySelector('.btn-box');
const imageEl = imgBoxEl.querySelector('.image');
const thumbnailsEl = document.querySelector('.thumbnails-box');

const allImages = galery.getAll();
allImages.forEach((imagePath, index) => {
	thumbnailsEl.insertAdjacentHTML(
		'beforeend',
		`
			<div class="thumbnail" data-id="${index}">
			<img src="${imagePath}" class="thumb-image">
			</div>
		`
	);
});

drawGaleryWith(galery.getCurrent());

buttonBoxEl.addEventListener('click', ({ target }) => {
	if (target.closest('.btn-prev')) {
		drawGaleryWith(galery.getPrevious());
	} else if (target.closest('.btn-next')) {
		drawGaleryWith(galery.getNext());
	}
});

thumbnailsEl.addEventListener('click', ({ target }) => {
	if (target.closest('.thumbnail')) {
		const clickedThumb = target.closest('.thumbnail');
		galery.setCurrent(clickedThumb.dataset.id);

		drawGaleryWith(galery.getCurrent());
	}
});

function drawGaleryWith({ id, path }) {
	imageEl.src = path;
	const activeThumb = thumbnailsEl.querySelector('.active');
	activeThumb?.classList.remove('active');
	thumbnailsEl.querySelector(`[data-id="${id}"]`).classList.add('active');
}
