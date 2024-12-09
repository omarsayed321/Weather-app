// declartion
const apiKey = "cbb77d607f0b4ecab2c173140240512";
let contact = document.getElementById("contact");
let searchInput = document.getElementById("searchInput");
let findBtn = document.getElementById("findBtn");
let cityName = document.getElementById("cityName");
let temp_c = document.getElementById("temp_c");
let currentStatus = document.getElementById("currentStatus");
let currentIcon = document.querySelectorAll(".img");
let maxTemp = document.querySelectorAll(".maxTemp");
let minTemp = document.querySelectorAll(".minTemp");
let dayStatus = document.querySelectorAll(".dayStatus");
let dayName = document.querySelectorAll(".dayName");
let currentDate = document.querySelector(".date");

// display user current loc

(async function () {
	let cityResponse = await fetch(`http://ip-api.com/json/?fields=61439`);
	let cityData = await cityResponse.json();
	let city = cityData.city;
	let response2 = await fetch(
		`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`
	);
	let data2 = await response2.json();

	getData(data2);
})();

function getData(data) {
	// get current day date
	let dateStr = data.current.last_updated;
	const date = new Date(dateStr);
	const options = { day: "numeric", month: "long" };
	const optionsDay = { weekday: "long" };
	const formattedDate = date.toLocaleDateString("en-GB", options);

	currentDate.innerHTML = formattedDate;
	cityName.innerHTML = data.location.name;
	temp_c.innerHTML = data.current.temp_c;
	currentStatus.innerHTML = data.current.condition.text;
	// currentIcon.innerHTML = `<img src="${data.current.condition.icon}" alt="cloud" />`;

	// 2nd & 3rd days data

	// display day maxtemp
	for (let i = 0; i < maxTemp.length; i++) {
		maxTemp[i].innerHTML = data.forecast.forecastday[i + 1].day.maxtemp_c;
	}
	// display day maxtemp
	for (let i = 0; i < minTemp.length; i++) {
		minTemp[i].innerHTML = data.forecast.forecastday[i + 1].day.mintemp_c;
	}
	// display day status
	for (let i = 0; i < dayStatus.length; i++) {
		dayStatus[i].innerHTML =
			data.forecast.forecastday[i + 1].day.condition.text;
	}
	// display day icon
	currentIcon[0].innerHTML = `<img src="${
		data.current.condition.icon
	}"alt="weather-icon">`;
	for (let i = 1; i < currentIcon.length; i++) {
		currentIcon[i].innerHTML = `<img src="${
			data.forecast.forecastday[i].day.condition.icon
		}"alt="weather-icon">`;
	}
	// display day name
	for (let i = 0; i < dayName.length; i++) {
		const date = new Date(data.forecast.forecastday[i].date);
		let formattedDay = date.toLocaleDateString("en-GB", optionsDay);
		dayName[i].innerHTML = formattedDay;
	}
}

async function displayData() {
	try {
		let response = await fetch(
			`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchInput.value}&days=3`
		);
		let data = await response.json();

		getData(data);
	} catch (error) {
		console.log(error);
	}
}

// displayData();

searchInput.addEventListener("keyup", function () {
	if (searchInput.value.length >= 3) {
		displayData();
	}
});

contact.addEventListener("click", function () {
	window.location.replace("contact.html");
});
