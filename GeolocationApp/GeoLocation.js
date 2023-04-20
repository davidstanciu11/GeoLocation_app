const form = document.querySelector(".form");
//Inputs
const distanceInpt = document.getElementById("distance");
const stressInpt = document.getElementById("stress");
const amountInpt = document.getElementById("amount");
const durationInpt = document.getElementById("duration");
const cadenceInpt = document.getElementById("cadence");
const elevInpt = document.getElementById("elev_gain");
const typeInpt = document.getElementById("meditation_Type");
const personInpt = document.getElementById("person");

//Sections of Inputs
const distanceSection = document.querySelector(".form_row_distance");
const stressSection = document.querySelector(".form_row_stress");
const amountSection = document.querySelector(".form_row_amount");
const durationSection = document.querySelector(".form_row_duration");
const cadenceSection = document.querySelector(".form_row_cadence");
const elevSection = document.querySelector(".form_row_elev");
const typeSection = document.querySelector(".form_row_type");
const personSection = document.querySelector(".form_row_person");
//Select
const activities = document.getElementById("form_action");
const btnExport = document.querySelector(".btn_1");

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

//Map Class

class Map {
	#map;
	#mapEvent;
	constructor() {
		this._getPosition();
		this._hideFields();
		btnExport.addEventListener("click", () => {
		form.addEventListener("submit", this._newTask.bind(this));
		});

		activities.addEventListener("click", () => {
		activities.addEventListener("change", this._toggleFields);
		});
	}

	_getPosition() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () => {
				() => {
					window.prompt(`Couldn't receive your position. Please Retry!`);
				};
			});
		}
	}

	_loadMap(position) {
		const { latitude } = position.coords;
		const { longitude } = position.coords;
		const coords = [latitude, longitude];
		this.#map = L.map("map").setView(coords, 14);

		L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(this.#map);

		this.#map.on("click", this._showForm.bind(this));
	}

	_showForm(mapEv) {
		this.#mapEvent = mapEv;
		form.classList.remove("form_hidden");
	}

	_hideFields() {
		stressSection.classList.add("form_row_hidden");
		amountSection.classList.add("form_row_hidden");
		elevSection.classList.add("form_row_hidden");
		typeSection.classList.add("form_row_hidden");
		personSection.classList.add("form_row_hidden");
	}

	_toggleFields() {
		switch (activities.value) {
			case "jogging":
				stressSection.classList.add("form_row_hidden");
				amountSection.classList.add("form_row_hidden");
				elevSection.classList.add("form_row_hidden");
				typeSection.classList.add("form_row_hidden");
				personSection.classList.add("form_row_hidden");
				cadenceSection.classList.remove("form_row_hidden");
				distanceSection.classList.remove("form_row_hidden");
				break;
			case "cycling":
				elevSection.classList.remove("form_row_hidden");
				cadenceSection.classList.add("form_row_hidden");
				distanceSection.classList.remove("form_row_hidden");
				stressSection.classList.add("form_row_hidden");
				typeSection.classList.add("form_row_hidden");
				amountSection.classList.add("form_row_hidden");
				personSection.classList.add("form_row_hidden");
				break;
			case "meditation":
				elevSection.classList.add("form_row_hidden");
				cadenceSection.classList.add("form_row_hidden");
				personSection.classList.add("form_row_hidden");
				typeSection.classList.remove("form_row_hidden");
				stressSection.classList.remove("form_row_hidden");
				distanceSection.classList.add("form_row_hidden");
				amountSection.classList.add("form_row_hidden");
				break;
			case "groceries":
				elevSection.classList.add("form_row_hidden");
				cadenceSection.classList.add("form_row_hidden");
				personSection.classList.remove("form_row_hidden");
				typeSection.classList.add("form_row_hidden");
				stressSection.classList.add("form_row_hidden");
				distanceSection.classList.add("form_row_hidden");
				amountSection.classList.remove("form_row_hidden");
				break;
		}
	}

	_newTask(e) {
		e.preventDefault();
		distanceInpt.value =
			durationInpt.value =
			amountInpt.value =
			stressInpt.value =
			cadenceInpt.value =
			elevInpt.value =
			typeInpt.value =
			personInpt.value =
				"";

		const { lat, lng } = this.#mapEvent.latlng;
		L.marker([lat, lng])
			.addTo(this.#map)
			.bindPopup(
				L.popup({
					maxWidth: 250,
					minWidth: 100,
					autoClose: false,
					closeOnClick: false,
					className: "groceries_popup",
				})
			)
			.setPopupContent("hello")
			.openPopup();
	}
}

const mapApp = new Map();

