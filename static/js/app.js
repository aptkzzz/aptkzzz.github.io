'use strict';

var colors = [
	
]

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
	if (date.getHours() >= 22 || date.getHours() <= 6) {
		bodystyle.color = '#fff';
		bodystyle.backgroundColor = '#000';
	} else {
		bodystyle.color = '#000';
		bodystyle.backgroundColor = '#fff';
	}
	window.removeEventListener('load', setTheme);
}

function setVisible(modificator) {
	if (!isFilled(modificator)) {
		divs.projects.style.display = 'none';
		menu.projects.style.display = 'none';
		menutabs -= 1;
	} else {
		loadContent(modificator);
	}
}

function acceptStyles() {
	var styles = document.getElementsByTagName('link');
	for (var i = 0; i < styles.length; i++) {
		styles[i].media = 'all';
	}
}

acceptStyles();

window.addEventListener('load', function __pushContentOnLoad() {
	setVisible('projects');
	setVisible('talk');
	setVisible('work');
	window.removeEventListener('load', __pushContentOnLoad);
});
window.addEventListener('load', setPhoto);
window.addEventListener('load', setTheme);
menudiv.addEventListener('click', toggleMenu);