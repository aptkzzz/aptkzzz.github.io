let getProjectsList = () => {
	$.get("http://80.78.241.238:8192/json/projects.json", {}, function (response) {
		let data = JSON.parse(response);
		pushProjectsList(data);
	});
};

let getTalkList = () => {
	$.get("http://80.78.241.238:8192/json/talk.json", {}, function (response) {
		let data = JSON.parse(response);
		pushTalkList(data);
	});
};

let getWorkList = () => {
	$.get("http://80.78.241.238:8192/json/work.json", {}, function (response) {
		let data = JSON.parse(response);
		pushWorkList(data);
	});
};


let pushProjectsList = (data) => {
	let projectsRow = document.getElementById('projects');
	let classes = ["col-xs-12", "col-sm-6", "col-md-3", "col-lg-1"];

	data.forEach(function (i, index, array) {
		let project = document.createElement("div");
		classes.forEach(function (classname, classindex, classes) {
			project.classList.add(classname);
		});
		let list = [];
		list[0] = "<img class='img-rounded img-responsive' src='" + i.picture + "' />";
		list[1] = "<h4>" + i.name + "</h4>";
		list[2] = "<button class='btn btn-default' onclick='redirect(" + i.link + ")'>Подробнее</button>";
		list[3] = "<button class='btn btn-default' onclick='redirect(" + i.github + ")'>GutHub</button>";
		project.innerHTML = list[0] + list[1] + list[2] + list[3];
		projectsRow.appendChild(project);
	});
};

let pushTalkList = (data) => {
	let talkRow = document.getElementById('talk');
	let classes = ["col-xs-12", "col-sm-6", "col-md-3", "col-lg-1"];

	data.forEach(function (i, index, array) {
		let talk = document.createElement("div");
		classes.forEach(function (classname, classindex, classarray) {
			talk.classList.add(classname);
		});
		let list = [];
		list[0] = "<img class='img-rounded img-responsive' src='" + i.picture + "' />";
		list[1] = "<button class='btn btn-default' onclick='redirect(" + i.link + ")'>" + i.name + "</button>";
		talk.innerHTML = list[0] + list[1];
		talkRow.appendChild(talk);
	});
};

let pushWorkList = (data) => {
	let workRow = document.getElementById('work');
	let classes = ["col-xs-12", "col-sm-6", "col-md-3", "col-lg-1"];

	data.forEach(function (i, index, array) {
		let work = document.createElement("div");
		classes.forEach(function (classname, classindex, classarray) {
			work.classList.add(classname);
		});
		let list = [];
		list[0] = "<img class='img-rounded img-responsive' src='" + i.picture + "' />";
		list[1] = "<button class='btn btn-default' onclick='redirect(" + i.link + ")'>" + i.name + "</button>";
		work.innerHTML = list[0] + list[1];
		workRow.appendChild(work);
	});
};


let getContent = () => {
	getProjectsList();
	getTalkList();
	getWorkList();
}