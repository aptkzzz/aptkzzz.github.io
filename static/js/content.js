let classes = ["col-xs-6", "col-sm-6", "col-md-3", "col-lg-2"];

let getList = (file, callback) => {
	$.get("http://80.78.241.238:8192/json/" + file, {}, function (response) {
		let data = JSON.parse(response);
		callback(data);
	});
}

let projectsAllocation = () => {
	allocDict = {};
	alloc
}

let pushProjectsList = (data) => {
	let projectsRow = document.getElementById('projects');
	/*let projectsRowNF = document.getElementById('projects-not-full');
	let alloc = projectsAllocation(data);*/

	data./*alloc.toFullRow*/.forEach(function (i, index, array) {
		let project = document.createElement("div");
		classes.forEach(function (classname, classindex, classarray) {
			project.classList.add(classname);
		});
		let list = [];
		list[0] = "<img class='img-rounded img-responsive' src='" + i.picture + "' />";
		list[1] = "<h4>" + i.name + "</h4>";
		list[2] = "<button class='btn btn-default' onclick='redirect(\"http://arseniypetrikor.ru" + i.link + "\")'>Подробнее</button>";
		list[3] = "<button class='btn btn-default' onclick='redirect(\"" + i.github + "\")'>GitHub</button>";
		project.innerHTML = list[0] + list[1] + list[2] + list[3];
		projectsRow.appendChild(project);
	});
	/*alloc.toNotFullRow.forEach(function (i, index, array) {
		let project = document.createElement("div");
		classes.forEach(function (classname, classindex, classarray) {
			project.classList.add(classname);
		});
		if (index == 0) {
			project.classList.add()
		}
	});*/
};

let pushTalkList = (data) => {
	let talkRow = document.getElementById('talk');

	data.forEach(function (i, index, array) {
		let talk = document.createElement("div");
		classes.forEach(function (classname, classindex, classarray) {
			talk.classList.add(classname);
		});
		if (index == 0) {
			talk.classList.add("col-lg-offset-2");
		}
		let list = [];
		list[0] = "<img class='img-rounded img-responsive' src='" + i.picture + "' />";
		list[1] = "<button class='btn btn-default' onclick='redirect(\"" + i.link + "\")'>" + i.name + "</button>";
		talk.innerHTML = list[0] + list[1];
		talkRow.appendChild(talk);
	});
};

let pushWorkList = (data) => {
	let workRow = document.getElementById('work');

	data.forEach(function (i, index, array) {
		let work = document.createElement("div");
		classes.forEach(function (classname, classindex, classarray) {
			work.classList.add(classname);
		});
		if (index == 0) {
			work.classList.add("col-md-offset-3");
			work.classList.add("col-lg-offset-4");
		}
		let list = [];
		list[0] = "<img class='img-rounded img-responsive' src='" + i.picture + "' />";
		list[1] = "<button class='btn btn-default' onclick='redirect(\"" + i.link + "\")'>" + i.name + "</button>";
		work.innerHTML = list[0] + list[1];
		workRow.appendChild(work);
	});
};


let getContent = () => {
	getList("projects.json", pushProjectsList);
	getList("talk.json", pushTalkList);
	getList("work.json", pushWorkList);
}