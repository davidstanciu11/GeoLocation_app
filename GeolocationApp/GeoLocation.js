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

//Task Class
class Task {
	date = new Date();
	id = (Date.now() + "").slice(-10);
	constructor(coords, duration) {
		this.coords = coords; //lat, lng
		this.duration = duration;
	}
}

class Jogging extends Task {
	type = "jogging";
	constructor(coords, distance, duration, cadence) {
		super(coords, duration);
		this.cadence = cadence;
		this.distance = distance;
		this.calcPace();
	}

	calcPace() {
		this.pace = this.duration / this.distance;
		return this.pace;
	}
}

class Cycling extends Task {
	type = "cycling";
	constructor(coords, distance, duration, elevation) {
		super(coords, duration);
		this.elevation = elevation;
		this.distance = distance;
		this.calcSpeed();
	}

	calcSpeed() {
		this.speed = this.distance / (this.duration / 60);
		return this.speed;
	}
}

class Meditation extends Task {
	type = "meditation";
	constructor(coords, stress, duration, type) {
		super(coords, duration);
		this.stress = stress;
		this.type = type;
		this.calcStress();
	}

	calcStress () {
		this.relief = (this.stress% + this.duration) / 10;
		return this.relief;
	}
}
class Groceries extends Task {
	type = "groceries";
	constructor(coords, amount, duration, person) {
		super(coords, duration);
		this.amount = amount;
		this.person = person;
	}
}

//Map Class

class Map {
	#map;
	#mapEvent;
	#activities = [];
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

	_clearInputs() {
		distanceInpt.value =
			durationInpt.value =
			amountInpt.value =
			stressInpt.value =
			cadenceInpt.value =
			elevInpt.value =
			typeInpt.value =
			personInpt.value =
				"";
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
		const validInpt = (...inpt) => {
			return inpt.every((i) => Number.isFinite(i));
		};
		const allPositive = (...inpt) => inpt.every((i) => i > 0);

		e.preventDefault();
		const typeOfTask = activities.value;
		const duration = +durationInpt.value;
		const { lat, lng } = this.#mapEvent.latlng;
		let activity;

		if (typeOfTask === "jogging") {
			const cadence = +cadenceInpt.value;
			const distance = +distanceInpt.value;
			if (
				!validInpt(distance, duration, cadence) ||
				!allPositive(distance, duration, cadence)
			)
				return console.log("Input not valid");

			activity = new Jogging([lat, lng], distance, duration, cadence);
		}

		if (typeOfTask === "cycling") {
			const elevGain = +elevInpt.value;
			const distance = +distanceInpt.value;
			if (
				!validInpt(distance, duration, elevGain) ||
				!allPositive(distance, duration, elevGain)
			)
				return console.log("Input not valid");

			activity = new Cycling([lat, lng], distance, duration, elevGain);
		}

		if (typeOfTask === "meditation") {
			const stress = +stressInpt.value;
			const meditationType = typeInpt.value;
			if (!validInpt(stress, duration) || !allPositive(stress, duration))
				return console.log("Input not valid");

			activity = new Meditation([lat, lng], stress, duration, meditationType);
		}

		if (typeOfTask === "groceries") {
			const amount = +amountInpt.value;
			const person = personInpt.value;
			if (!validInpt(amount, duration) || !allPositive(amount, duration))
				return console.log("Input not valid");
			activity = new Groceries([lat, lng], amount, duration, person);
		}

		this.#activities.push(activity);
		console.log(activity);
		//Clear Inputs
		this._clearInputs();

		//Render Popup
		this._renderPopUp(activity);
	}

	_renderPopUp(activity) {
		L.marker(activity.coords)
			.addTo(this.#map)
			.bindPopup(
				L.popup({
					maxWidth: 250,
					minWidth: 100,
					autoClose: false,
					closeOnClick: false,
					className: `${activity.type}_popup`,
				})
			)
			.setPopupContent("workout")
			.openPopup();
	}
}

const mapApp = new Map();
