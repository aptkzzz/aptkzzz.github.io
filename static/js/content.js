let classes = ["col-xs-6", "col-sm-6", "col-md-3", "col-lg-2"];
let data_p = [];
let data_t = [];
let data_w = [];

let getList = (file, callback, variable) => {
	$.get("http://80.78.241.238:8192/json/" + file, {}, function (response) {
		variable = JSON.parse(response);
		callback();
	});
}

let getAlloc_lg = (projects) => {
	let p_count = projects.length;
	let p_full_rows = Math.floor(p_count / 6);
	let p_full_count = p_full_rows * 6;
	let p_not_full_count = p_count - p_full_count;
	let i = 0;
	let to_r = {"to_full": [], "to_not_full": [], "offset": 0};
	while (i < p_count) {
		if (i < p_full_count) {
			to_r.to_full.push(projects[i]);
		} else {
			to_r.to_not_full.push(projects[i]);
		}
	}
	if (p_not_full_count != 0 && p_not_full_count != 6) {
		to_r.offset = 6 - p_not_full_count;
	}
	return to_r;
}

let getAlloc_sm_xs = (projects) => {
	let p_count = projects.length;
	let p_full_rows = Math.floor(p_count / 2);
	let p_full_count = p_full_rows * 2;
	let p_not_full_count = p_count - p_full_count;
	let i = 0;
	let to_r = {"to_full": [], "to_not_full": [], "offset": 0};
	while (i < p_count) {
		if (i < p_full_count) {
			to_r.to_full.push(projects[i]);
		} else {
			to_r.to_not_full.push(projects[i]);
		}
	}
	if (p_not_full_count != 0 && p_not_full_count != 2) {
		to_r.offset = 2 - p_not_full_count;
	}
	return to_r;
}

let getAlloc_md = (projects) => {
	let p_count = projects.length;
	let p_full_rows = Math.floor(p_count / 4);
	let p_full_count = p_full_rows * 4;
	let p_not_full_count = p_count - p_full_count;
	let i = 0;
	let to_r = {"to_full": [], "to_not_full": [], "offset": 0};
	while (i < p_count) {
		if (i < p_full_count) {
			to_r.to_full.push(projects[i]);
		} else {
			to_r.to_not_full.push(projects[i]);
		}
	}
	if (p_not_full_count != 0 && p_not_full_count != 4) {
		to_r.offset = 4 - p_not_full_count;
	}
	return to_r;
}

let getAlloc = (projects) => {
	let deviceType = getDeviceType();
	let response = {};
	if (deviceType == "lg") {
		response = getAlloc_lg(projects);
	} else if (deviceType == "md") {
		response = getAlloc_md(projects);
	} else {
		response = getAlloc_sm_xs(projects);
	}
	return response
}

let pushProjectsList = () => {
	let projectsRow = document.getElementById('projects');
	let projectsRowNF = document.getElementById('projects-not-full');
	let alloc = getAlloc(data);

	data_p.forEach(function (i, index, array) {
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
};

let pushTalkList = () => {
	let talkRow = document.getElementById('talk');

	data_t.forEach(function (i, index, array) {
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

let pushWorkList = () => {
	let workRow = document.getElementById('work');

	data_w.forEach(function (i, index, array) {
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
	getList("projects.json", pushProjectsList, data_p);
	getList("talk.json", pushTalkList, data_t);
	getList("work.json", pushWorkList, data_w);
}