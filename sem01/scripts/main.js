import { dataInitialize, getLoginUser, userLogOut, getClasses, signUp, signOut } from './localStorage.js';

dataInitialize();

const loggedInUser = getLoginUser();

if (!loggedInUser) {
	location.href = 'login.html';
}

const rootEl = document.querySelector('.root');

rootEl.innerHTML = getRootHtml();

rootEl.addEventListener('click', (e) => {
	const target = e.target;

	if (target.closest('.class-signup')) {
		try {
			doSignAction(signUp, target);
		} catch (e) {
			alert(e.message);
		}
	}

	if (target.closest('.class-signout')) {
		try {
			doSignAction(signOut, target);
		} catch (e) {
			alert(e.message);
		}
	}

	if (target.closest('.logout')) {
		userLogOut();
		window.location.reload();
	}
});

function getRootHtml() {
	return (
		`<div class="heading">
        <p class="greeting">Привет, <span class="username">${loggedInUser.name}</span></p>
        <button class="logout">Выйти</button>
        </div>` + getClassesHtml()
	);
}

function getClassesHtml() {
	const classes = getClasses();
	return classes
		.map((classItem) => {
			return `
                <div class="class" data-id="${classItem.id}">
                    <h3 class="class-name">${classItem.name}</h3>
                    <p class="class-time">${classItem.time}</p>
                    <div class="class-signbox">${getSignBoxHtml(classItem)}</div>
                </div>
            `;
		})
		.join('');
}

function getSignBoxHtml(classItem) {
	const isSigned = classItem.currentParticipants.includes(loggedInUser.name);
	const freeAmount = classItem.maxParticipants - classItem.currentParticipants.length;
	return `
        <p class="class-freeamount">Свободных мест: ${freeAmount}</p>
        ${isSigned ? `<p class="class-info">Вы записаны</p>` : ''}
        <button class="class-signup" ${freeAmount > 0 && !isSigned ? '' : 'hidden'}>Записаться</button>
        <button class="class-signout" ${isSigned ? '' : 'hidden'}>Отменить запись</button>
    `;
}

function redrawSignbox(classId) {
	const currentClass = getClasses().find((classItem) => classItem.id === Number(classId));
	return getSignBoxHtml(currentClass);
}

function doSignAction(action, target) {
	const classEl = target.closest('.class');
	const classId = classEl.dataset.id;
	action(classId, loggedInUser.name);
	classEl.querySelector('.class-signbox').innerHTML = redrawSignbox(classId);
}
