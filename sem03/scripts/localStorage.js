const unsplashKey = 'unsplash';

let currentFavouritesIndex = 0;
let currentHistoryIndex = getHistory().length;

function getAllLikes() {
	return JSON.parse(localStorage.getItem(unsplashKey)).filter((item) => item.liked_by_user) || [];
}

function getHistory() {
	return JSON.parse(localStorage.getItem(unsplashKey)) || [];
}

function getFavouritesFirst() {
	currentHistoryIndex = getHistory().length;
	return getAllLikes()[0];
}

function getFavouritesPrevious() {
	const likes = getAllLikes();
	currentFavouritesIndex = (currentFavouritesIndex - 1 + likes.length) % likes.length;
	return likes[currentFavouritesIndex];
}

function getFavouritesNext() {
	const likes = getAllLikes();
	currentFavouritesIndex = (currentFavouritesIndex + 1) % likes.length;
	return likes[currentFavouritesIndex];
}

function getHistoryPrevious() {
	const history = getHistory();

	if (currentHistoryIndex === 0) {
		return history[currentHistoryIndex];
	} else {
		currentHistoryIndex--;
		return history[currentHistoryIndex];
	}
}

function getHistoryNext() {
	const history = getHistory();

	if (currentHistoryIndex === history.length) {
		return null;
	} else {
		currentHistoryIndex++;
		return history[currentHistoryIndex];
	}
}

function saveToHistory(imageObj) {
	const history = getHistory();
	history.push(imageObj);
	localStorage.setItem(unsplashKey, JSON.stringify(history));
}

function setLike(imageObj) {
	const history = getHistory();

	const likedImage = history.find((item) => item.id === imageObj.id);
	likedImage.likes += 1;
	likedImage.liked_by_user = true;

	localStorage.setItem(unsplashKey, JSON.stringify(history));
}

function unsetLike(imageObj) {
	const history = getHistory();

	const unLikedImage = history.find((item) => item.id === imageObj.id);
	unLikedImage.likes -= 1;
	unLikedImage.liked_by_user = false;

	localStorage.setItem(unsplashKey, JSON.stringify(history));
}

function isLiked(imageObj) {
	return getHistory().find((item) => item.id === imageObj.id).liked_by_user;
}

//prettier-ignore
export {
	setLike,
	unsetLike,
	isLiked,
	getFavouritesFirst,
	getFavouritesNext,
	getFavouritesPrevious,
	getHistoryPrevious,
	getHistoryNext,
	saveToHistory,
};
