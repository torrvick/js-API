import { initialData } from './init.js';

const userKey = 'logedInUser';
const classesKey = 'classes';

function dataInitialize() {
	if (!getClasses()) {
		localStorage.setItem(classesKey, JSON.stringify(initialData));
	}
}

function getLoginUser() {
	return JSON.parse(localStorage.getItem(userKey));
}

function userLogin(name) {
	localStorage.setItem(userKey, JSON.stringify({ name }));
}

function userLogOut() {
	localStorage.removeItem(userKey);
}

function getClasses() {
	return JSON.parse(localStorage.getItem(classesKey));
}

function saveClasses(classes) {
	localStorage.setItem(classesKey, JSON.stringify(classes));
}

function getCurrentParticipants(classes, currentClass) {
	return classes.find((classItem) => classItem.id === Number(currentClass)).currentParticipants;
}

function getMaxParticipants(classes, currentClass) {
	return classes.find((classItem) => classItem.id === Number(currentClass)).maxParticipants;
}

function signUp(signingClassId, name) {
	const classes = getClasses();
	const currentParticipants = getCurrentParticipants(classes, signingClassId);
	const maxParticipants = getMaxParticipants(classes, signingClassId);

	// Сделал проверку на случай, если шаловливые ручки убирают атрибут hidden
	if (currentParticipants.includes(name)) {
		throw new Error('Вы уже записаны на занятие, мистер читер');
	}

	if (currentParticipants.length === maxParticipants) {
		throw new Error('Воу-воу-воу, группа уже набрана');
	}

	currentParticipants.push(name);
	saveClasses(classes);
}

function signOut(signingOutClassId, name) {
	const classes = getClasses();
	const currentParticipants = getCurrentParticipants(classes, signingOutClassId);
	const userIndex = currentParticipants.indexOf(name);

	// Сделал проверку на случай, если шаловливые ручки убирают атрибут hidden
	if (userIndex < 0) {
		throw new Error('Вас здесь и не стояло');
	}

	currentParticipants.splice(userIndex, 1);
	saveClasses(classes);
}

export { dataInitialize, getLoginUser, userLogin, userLogOut, getClasses, signUp, signOut };
