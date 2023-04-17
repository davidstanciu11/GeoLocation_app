// const btnWelcome = document.getElementById("btn_welcome");
// const welcomeSection = document.querySelector(".welcome");
// const heroSection = document.querySelector(".hero");

const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

if(navigator.geolocation) {
	navigator.geolocation.getCurrentPosition((position) => {
		const {latitude} = position.coords;
		const {longitude} = position.coords;
		const coords = [latitude, longitude];
		const map = L.map("map").setView(coords, 14);

		L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(map);

		L.marker(coords)
			.addTo(map)
			.bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
			.openPopup();
	},
	() => {
		window.prompt(`Couldn't receive your position. Please Retry!`)
	})
}
//Events

// btnWelcome.addEventListener("click", () => {
// 	welcomeSection.classList.add("hidden");
// 	heroSection.style.display = "flex";
// });
