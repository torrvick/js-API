import { userLogin } from './localStorage.js';

const loginFormEl = document.querySelector('.loginform');

loginFormEl.addEventListener('submit', (e) => {
	e.preventDefault();
	userLogin(loginFormEl.querySelector('.loginform-name').value);
	location.href = 'index.html';
});
