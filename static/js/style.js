let setDarkTheme = () => {
	date = new Date();
	hour = date.getHours();
	if (hour > 6 || hour < 6) {
		document.body.style.backgroundImage = "url('http://80.78.241.238:8192/img/bg/dark.png')";
		navbar = document.querySelector(".navbar-fixed-top");;
		navbar.classList.remove("navbar-default");
		navbar.classList.add("navbar-inversed");
		document.body.style.color = "white";
	}
}