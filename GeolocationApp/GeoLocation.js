const joggingAction = document.querySelector("#jogging");
const cyclingAction = document.querySelector("#cycling");
const meditationAction = document.querySelector("#meditation");
const groceriesAction = document.querySelector("#groceries");
const distanceInpt = document.querySelector(".form_row_distance");
const stressInpt = document.querySelector(".form_row_stress");
const amountInpt = document.querySelector(".form_row_amount");
const durationInpt = document.querySelector(".form_row_duration");
const cadenceInpt = document.querySelector(".form_row_cadence");
const elevInpt = document.querySelector(".form_row_elev");
const typeInpt = document.querySelector(".form_row_type");
const personInpt = document.querySelector(".form_row_person");
const activities = document.getElementById("form_action");

stressInpt.classList.add("form_row_hidden");
amountInpt.classList.add("form_row_hidden");
elevInpt.classList.add("form_row_hidden");
typeInpt.classList.add("form_row_hidden");
personInpt.classList.add("form_row_hidden");

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

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(
		(position) => {
			const { latitude } = position.coords;
			const { longitude } = position.coords;
			const coords = [latitude, longitude];
			const map = L.map("map").setView(coords, 14);

			L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			}).addTo(map);

			map.on("click", (mapEvent) => {
				const { lat, lng } = mapEvent.latlng;
				L.marker([lat, lng])
					.addTo(map)
					.bindPopup(
						L.popup({
							maxWidth: 250,
							minWidth: 100,
							autoClose: false,
							closeOnClick: false,
							className: "jogging_popup",
						})
					)
					.setPopupContent("hello")
					.openPopup();
			});
		},
		() => {
			window.prompt(`Couldn't receive your position. Please Retry!`);
		}
	);
}
//Events

activities.addEventListener("click", () => {
	activities.addEventListener("change", () => {
		switch (activities.value) {
			case "jogging":
				stressInpt.classList.add("form_row_hidden");
				amountInpt.classList.add("form_row_hidden");
				elevInpt.classList.add("form_row_hidden");
				typeInpt.classList.add("form_row_hidden");
				personInpt.classList.add("form_row_hidden");
				cadenceInpt.classList.remove("form_row_hidden");
				distanceInpt.classList.remove("form_row_hidden");
				break;
			case "cycling":
				elevInpt.classList.remove("form_row_hidden");
				cadenceInpt.classList.add("form_row_hidden");
				distanceInpt.classList.remove("form_row_hidden");
				stressInpt.classList.add("form_row_hidden");
				typeInpt.classList.add("form_row_hidden");
				amountInpt.classList.add("form_row_hidden");
				break;
			case "meditation":
				elevInpt.classList.add("form_row_hidden");
				cadenceInpt.classList.add("form_row_hidden");
				personInpt.classList.add("form_row_hidden");
				typeInpt.classList.remove("form_row_hidden");
				stressInpt.classList.remove("form_row_hidden");
				distanceInpt.classList.add("form_row_hidden");
				amountInpt.classList.add("form_row_hidden");
				break;
			case "groceries":
				elevInpt.classList.add("form_row_hidden");
				cadenceInpt.classList.add("form_row_hidden");
				personInpt.classList.remove("form_row_hidden");
				typeInpt.classList.add("form_row_hidden");
				stressInpt.classList.add("form_row_hidden");
				distanceInpt.classList.add("form_row_hidden");
				amountInpt.classList.remove("form_row_hidden");
				break;
		}
	})
})
