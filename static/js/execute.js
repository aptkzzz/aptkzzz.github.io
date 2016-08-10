let executeOnce = () => {
	getContent();
	getNavigationData();
	setAnimation();
}

let executeDouble = () => {}

let execute = () => {}

window.addEventListener("load", executeOnce);

window.addEventListener("resize", executeDouble);
window.addEventListener("orientationchange", executeDouble);

window.addEventListener("load", execute);
window.addEventListener("resize", execute);
window.addEventListener("orientationchange", execute);