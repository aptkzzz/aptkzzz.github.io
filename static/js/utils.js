let redirect = (url) => { document.location.href = url; }

let reload = () => { location.reload(); }

let getDeviceType = () => {
	let width = document.documentElement.clientWidth;
	let type = "";
	if (width < 768) {
		type = "xs";
	} else if (width >= 768 && width < 992) {
		type = "sm";
	} else if (width >= 992 && width < 1200) {
		type = "md";
	} else if (width >= 1200) {
		type = "lg";
	}
	return type;
}