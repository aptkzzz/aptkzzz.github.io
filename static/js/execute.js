let execute = () => {
	setMyPhotoSize();
}

window.addEventListener("load", execute);
window.addEventListener("resize", execute);
window.addEventListener("orientationchange", execute);