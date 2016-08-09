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

	data.forEach(function (i, index, array) {
		let project = document.createElement("div");
		let classes = ["col-xs-12", "col-sm-6", "col-md-3", "col-lg-1"];
		classes.forEach(function (classname, classindex, classes) {
			project.classList.add(classname);
		});
		project.innerHTML = "<img class='img-rounded img-responsive' src='"+ i.picture + \
		"' /><h4>" + i.name + \
		"</h4><button class='btn btn-default' formaction='" + i.link + \
		"'>Подробнее</button><button class='btn btn-default' onclick=\"document.location.href='" + i.github\
		";'\">GitHub</button>"
	});
};

let pushTalkList = (data) => {
	let talkRow = document.getElementById('talk');
};

let pushWorkList = (data) => {
	let workRow = document.getElementById('work');
};


let getContent = () => {
	getProjectsList();
	getTalkList();
	getWorkList();
}