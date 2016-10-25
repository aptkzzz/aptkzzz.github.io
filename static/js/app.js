'use strict';

var colors = [
	{
		light: '#1abc9c',
		dark: '#16a085'
	},
	{
		light: '#2ecc71',
		dark: '#27ae60'
	},
	{
		light: '#47a1de',
		dark: '#2980b9'
	},
	{
		light: '#9b59b6',
		dark: '#8e44ad'
	}
];

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
var bodystyle = document.body.style;
var docelem = document.documentElement;

function getWindowSize() {
	var result = {};
	result.height = docelem.clientHeight;
	result.width = docelem.clientWidth;
	return result;
}

function isFilled(modificator) {
	if (data[modificator].length === 0) {
		return false;
	} else {
		return true;
	}
}

function getDeviceData() {
	var result = {};
	var windowSize = getWindowSize();
	if (windowSize.height < windowSize.width) {
		result.orientation = 'album';
	} else {
		result.orientation = 'portrait';
	}

	if (windowSize.width < 1280) {
		result.type = 'mobile';
	} else {
		result.type = 'desktop';
	}
	return result;
}

function setColor(element, mouseover, mouseout) {
	var deviceData = getDeviceData();
	element.style.backgroundColor = mouseout;
	if (deviceData.type === 'desktop') {
		element.addEventListener('mouseover', function () {
			element.style.backgroundColor = mouseover;
		});
		element.addEventListener('mouseout', function () {
			element.style.backgroundColor = mouseout;
		});
		element.addEventListener('touchend', function () {
			element.style.backgroundColor = mouseout;
		});
	}
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
			if (isFilled('projects')) {
				menu.projects.style.display = 'block';
			} if (isFilled('talk')) {
				menu.talk.style.display = 'block';
			} if (isFilled('work')) {
				menu.work.style.display = 'block';
			}
		} else {
			menudiv.style.height = '50px';
			menu.projects.style.display = 'hidden';
			menu.talk.style.display = 'hidden';
			menu.work.style.display = 'hidden';
		}
	} else {
		menudiv.removeEventListener('click', toggleMenu);
	}
}

function getAllocation(list, max) {
	var length = list.length;
	var result = [];
	var full = Math.floor(length / max);
	var notFull = length - full * max;
	for(var i = 0; i <= full; i++) {
		result.push([]);
		if (i === full) {
			var maximum = notFull;
		} else {
			var maximum = max;
		}
		for(var j = 0; j < maximum; j++) {
			result[i].push(i * max + j);
		}
	}
	return result;
}

function loadContent(modificator) {
	var dataN = data[modificator];
	var div = divs[modificator];
	var deviceType = getDeviceData().type;
	if (deviceType === 'mobile') {
		var max = 2;
	} else {
		var max = 4;
	}
	var alloc = getAllocation(dataN, max);
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
	var color = colors[Math.round(Math.random() * (colors.length - 1))];
	var theme = 'light';
	var bodycolors = {
		background: '#fff',
		text: '#000'
	};
	if (date.getHours() >= 22 || date.getHours() <= 6) {
		bodycolors.text = '#fff';
		bodycolors.background = '#000';
	}
	bodystyle.color = bodycolors.text;
	bodystyle.backgroundColor = bodycolors.background;
	if (theme == 'light') {
		setColor(menu.projects, color.dark, color.light);
		setColor(menu.talk, color.dark, color.light);
		setColor(menu.work, color.dark, color.light);
		setColor(document.getElementById('menu-brand'), color.dark, color.light);
		menudiv.style.backgroundColor = color.light;
	} else {
		setColor(menu.projects, color.light, color.dark);
		setColor(menu.talk, color.light, color.dark);
		setColor(menu.work, color.light, color.dark);
		setColor(document.getElementById('menu-brand'), color.light, color.dark);
		menudiv.style.backgroundColor = color.dark;
	}
	window.removeEventListener('load', setTheme);
}

function setVisible(modificator) {
	if (!isFilled(modificator)) {
		divs[modificator].style.display = 'none';
		menu[modificator].style.display = 'none';
		menutabs -= 1;
	} else {
		loadContent(modificator);
	}
}

window.addEventListener('load', function __pushContentOnLoad() {
	setVisible('projects');
	setVisible('talk');
	setVisible('work');
	window.removeEventListener('load', __pushContentOnLoad);
});

window.addEventListener('load', setPhoto);
window.addEventListener('load', setTheme);

menudiv.addEventListener('click', toggleMenu);
