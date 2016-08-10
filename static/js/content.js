let classes = ["col-xs-6", "col-sm-4", "col-md-2", "col-lg-2"];
let data = {
	"p": [],
	"t": [],
	"w": []
}

let getList = (file, callback, variable) => {
	$.get("http://80.78.241.238:8192/json/" + file, {}, function (response) {
		data[variable] = JSON.parse(response);
		callback();
	});
}

let getAlloc = (projects) => {
	let count = projects.length;
	let fullCount = {
		"lg": Math.floor(count / 6) * 6,
		"md": Math.floor(count / 6) * 6,
		"sm": Math.floor(count / 3) * 3,
		"xs": Math.floor(count / 2) * 2
	};
	let notFullCount = {
		"lg": count - fullCount.lg,
		"md": count - fullCount.md,
		"sm": count - fullCount.sm,
		"xs": count - fullCount.xs
	};
	let offset = {
		"lg": 0,
		"md": 0,
		"sm": 0,
		"xs": 0
	};
	if (notFullCount.lg != 0 && notFullCount.lg != 6) {
		offset.lg = Math.floor((12 - (notFullCount.lg * 2)) / 2);
	} if (notFullCount.md != 0 && notFullCount.md != 4) {
		offset.md = Math.floor((12 - (notFullCount.md * 2)) / 2);
	} if (notFullCount.sm != 0 && notFullCount.sm != 3) {
		offset.sm = Math.floor((12 - (notFullCount.sm * 4)) / 2);
	} if (notFullCount.xs != 0 && notFullCount.xs != 2) {
		offset.xs = Math.floor((12 - (notFullCount.xs * 6)) / 2);
	}
	to_r = {
		"start": fullCount,
		"offset": offset
	};
	return to_r;
}

let pushProjectsList = () => {
	let projectsRow = document.getElementById('projects');
	let projectsRowNF = document.getElementById('projects-not-full');
	let alloc = getAlloc(data.p);

	data.p.forEach(function (i, index, array) {
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
		if (index == alloc.start.lg) {
			project.classList.add("col-lg-offset-" + alloc.offset.lg);
		} if (index == alloc.start.md) {
			project.classList.add("col-md-offset-" + alloc.offset.md);
		} if (index == alloc.start.sm) {
			project.classList.add("col-sm-offset-" + alloc.offset.sm);
		} if (index == alloc.start.xs) {
			project.classList.add("col-xs-offset-" + alloc.offset.xs);
		}
		projectsRow.appendChild(project);
	});
};

let pushTalkList = () => {
	let talkRow = document.getElementById('talk');

	data.t.forEach(function (i, index, array) {
		let talk = document.createElement("div");
		classes.forEach(function (classname, classindex, classarray) {
			talk.classList.add(classname);
		});
		if (index == 0) {
			talk.classList.add("col-lg-offset-2");
			talk.classList.add("col-md-offset-2");
		} else if (index == array.length - 1/* && getDeviceType() == "sm"*/) {
			talk.classList.add("col-xs-offset-0");
			talk.classList.add("col-sm-offset-4");
			talk.classList.add("col-md-offset-0");
			talk.classList.add("col-lg-offset-0");
		}
		let list = [];
		list[0] = "<img class='img-rounded img-responsive clickable' src='" + i.picture + "' onclick='redirect(\"" + i.link + "\")'/>";
		// list[1] = "<button class='btn btn-default' onclick='redirect(\"" + i.link + "\")'>" + i.name + "</button>";
		talk.innerHTML = list[0]/* + list[1];*/
		talkRow.appendChild(talk);
	});
};

let pushWorkList = () => {
	let workRow = document.getElementById('work');

	data.w.forEach(function (i, index, array) {
		let work = document.createElement("div");
		classes.forEach(function (classname, classindex, classarray) {
			work.classList.add(classname);
		});
		if (index == 0) {
			work.classList.add("col-md-offset-4");
			work.classList.add("col-lg-offset-4");
			work.classList.add("col-sm-offset-2");
		}
		let list = [];
		list[0] = "<img class='img-rounded img-responsive clickable' src='" + i.picture + "' onclick='redirect(\"" + i.link + "\")' />";
		// list[1] = "<button class='btn btn-default' onclick='redirect(\"" + i.link + "\")'>" + i.name + "</button>";
		work.innerHTML = list[0]/* + list[1];*/
		workRow.appendChild(work);
	});
};


let getContent = () => {
	getList("projects.json", pushProjectsList, "p");
	getList("talk.json", pushTalkList, "t");
	getList("work.json", pushWorkList, "w");
}