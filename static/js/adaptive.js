let setMyPhotoSize = () => {
	let photo = document.getElementById("photo-me");
	let size = 0;
	let width = document.documentElement.clientWidth;

	if (width < 768) {
		size = width / 12 * 8;
	} else if (width >= 768 && width < 992) {
		size = width / 2;
	} else if (width >= 992 && width < 1200) {
		size = width / 3;
	} else if (width >= 1200) {
		size = width / 6;
	}

	photo.style.width = size.toString() + "px";
}