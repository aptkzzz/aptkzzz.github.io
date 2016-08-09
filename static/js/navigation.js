let getNavigationData = () => {
	$.get("http://80.78.241.238:8192/json/navigation.json", {}, function (response) {
		let data = JSON.parse(response);
		pushNavigationData(data);
	});
}

let pushNavigationData = (data) => {
	let navbarHeader = document.getElementById('navbar-header');
	let navbarContent = document.getElementById('navbar-content');

	data.forEach(function(i, index, arr) {
		let newHead = document.createElement('span');
		newHead.classList.add("icon-bar");
		let newContent = document.createElement('li');
		newContent.innerHTML = "<a href='" + i.link + "'>" + i.text + "</a>";
		navbarHeader.appendChild(newHead);
		navbarContent.appendChild(newContent);
	});
}