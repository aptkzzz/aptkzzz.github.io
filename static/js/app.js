'use strict';

var data = {};
data.projects = [];
data.talk = [
	{
		photo: './static/images/vk.png',
		link: 'http://vk.com/arseniypetrikor'
	},
	{
		photo: './static/images/telegram.png',
		link: 'http://telegram.me/arseniypetrikor'
	},
	{
		photo: './static/images/twitter.png',
		link: 'http://twitter.com/arseniypetrikor'
	},
	{
		photo: './static/images/skype.png',
		link: 'skype:arseniypetrikor?chat'
	}
];
data.work = [
	{
		photo: './static/images/upwork.png',
		link: 'http://www.upwork.com/o/profiles/users/_~01c039b9bf8e2b161d/'
	},
	{
		photo: './static/images/freelance.png',
		link: 'http://freelance.ru/arseniypetrikor'
	}
];

var divs = {};
divs.projects = document.getElementById('projects');
divs.talk = document.getElementById('talk');
divs.work = document.getElementById('work');

var menu = {};
menu.projects = document.getElementById('menu-projects');
menu.talk = document.getElementById('menu-talk');
menu.work = document.getElementById('menu-work');

var photos = ['./static/images/myphoto1.jpg', './static/images/myphoto2.jpg'];
var menutabs = 4;
var menudiv = document.getElementById('menu');

function getWindowSize() {
	var result = {};
	result.height = document.documentElement.clientHeight;
	result.width = document.documentElement.clientWidth;
	return result;
}

function getDeviceData() {
	var result = {};
	var windowSize = getWindowSize();
	if (windowSize.height < windowSize.width) {
		result.orientation = 'album';
	} else {
		result.orientation = 'portrait';
	}

	if (windowSize.width < 1024) {
		result.type = 'mobile';
	} else {
		result.type = 'desktop';
	}
	return result;
}

function setPhoto() {
	var random = Math.random();
	var index = Math.round(random);
	document.getElementById('my-photo').src = photos[index];
	window.removeEventListener('load', setPhoto);
}

function toggleMenu() {
	var data = getDeviceData();
	if (data.type === 'mobile') {
		if (menudiv.offsetHeight < 60) {
			menudiv.style.height = String(menutabs * 50) + 'px';
		} else {
			menudiv.style.height = '50px';
		}
	} else {
		menudiv.removeEventListener('click', toggleMenu);
	}
}

function getAllocation(list) {
	var length = list.length;
	var result = {
		desktop: [],
		mobile: []
	};
	var fullDesktop = Math.floor(length / 4);
	var notFullDesktop = length - fullDesktop * 4;
	var fullMobile = Math.floor(length / 2);
	var notFullMobile = length - fullMobile * 2;
	for(var i = 0; i <= fullDesktop; i++) {
		if(i < fullDesktop) {
			result.desktop.push([]);
			result.desktop[i].push(i * 4);
			result.desktop[i].push(i * 4 + 1);
			result.desktop[i].push(i * 4 + 2);
			result.desktop[i].push(i * 4 + 3);
		} else {
			result.desktop.push([]);
			if(notFullDesktop > 0) {
				result.desktop[i].push(i * 4);
			} if(notFullDesktop > 1) {
				result.desktop[i].push(i * 4 + 1);
			} if(notFullDesktop > 2) {
				result.desktop[i].push(i * 4 + 2);
			}
		}
	}
	for(var i = 0; i < fullMobile; i++) {
		result.mobile.push([]);
		result.mobile[i].push(i * 2);
		result.mobile[i].push(i * 2 + 1);
	}
	if(notFullMobile === 1) {
		result.mobile.push([length - 1, ]);
	}
	return result;
}

function loadContent(modificator) {
	var dataN = data[modificator];
	var div = divs[modificator];
	var deviceType = getDeviceData().type;
	var alloc = getAllocation(dataN)[deviceType];
	alloc.forEach(function (row, rowIndex) {
		var rowElem = document.createElement('div');
		rowElem.classList.add('row');
		row.forEach(function (i) {
			var iconElement = document.createElement('img');
			iconElement.classList.add('icondiv');
			iconElement.src = dataN[i].photo;
			iconElement.onclick = () => { window.open(dataN[i].link); };
			rowElem.appendChild(iconElement);
		});
		div.appendChild(rowElem);
	});
}

function setTheme() {
	var date = new Date();
	if (date.getHours() >= 22 || date.getHours() <= 6) {
		document.body.style.color = '#fff';
		document.body.style.backgroundColor = '#000';
	} else {
		document.body.style.color = '#000';
		document.body.style.backgroundColor = '#fff';
	}
	window.removeEventListener('load', setTheme);
}

function setVisible() {
	if (data.projects.length === 0) {
		divs.projects.style.display = 'none';
		menu.projects.style.display = 'none';
		menutabs -= 1;
	} else {
		loadContent('projects');
	}

	if (data.talk.length === 0) {
		divs.talk.style.display = 'none';
		menu.talk.style.display = 'none';
		menutabs -= 1;
	} else {
		loadContent('talk');
	}

	if (data.work.length === 0) {
		divs.work.style.display = 'none';
		menu.work.style.display = 'none';
		menutabs -= 1;
	} else {
		loadContent('work');
	}

	window.removeEventListener('load', setVisible);
}

window.addEventListener('load', setVisible);
window.addEventListener('load', setPhoto);
window.addEventListener('load', setTheme);
menudiv.addEventListener('click', toggleMenu);