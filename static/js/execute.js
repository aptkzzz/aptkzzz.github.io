let execute = () => {
	setMyPhotoSize();
}

let executeOnce = () => {
	getNavigationData();
	getContent();
}

window.addEventListener("load", executeOnce);
window.addEventListener("load", execute);
window.addEventListener("resize", execute);
window.addEventListener("orientationchange", execute);