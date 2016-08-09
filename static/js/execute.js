let execute = () => {
	pushProjectsList();
}

let executeOnce = () => {
	getContent();
	getNavigationData();
}

window.addEventListener("load", executeOnce);

window.addEventListener("load", execute);
window.addEventListener("resize", execute);
window.addEventListener("orientationchange", execute);