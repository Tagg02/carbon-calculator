const form = document.getElementById("carbon-form");
const result = document.getElementById("result");

// Simplified emission factors (demo purposes)
const FACTORS = {
  driving: 0.3,
  electricity: 0.2,
  shortFlight: 250,
  longFlight: 1100,
  diet: {
    mixed: 2000,
    vegetarian: 1200,
    vegan: 900
  }
};

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const miles = Number(form.miles.value) || 0;
  const kwh = Number(form.kwh.value) || 0;
  const shortFlights = Number(form.shortFlights.value) || 0;
  const longFlights = Number(form.longFlights.value) || 0;
  const diet = form.diet.value;

  const drivingEmissions = miles * 52 * FACTORS.driving;
  const electricityEmissions = kwh * 12 * FACTORS.electricity;
  const flightEmissions =
    shortFlights * FACTORS.shortFlight +
    longFlights * FACTORS.longFlight;

  const dietEmissions = FACTORS.diet[diet];

  const totalKg =
    drivingEmissions +
    electricityEmissions +
    flightEmissions +
    dietEmissions;

  result.textContent =
    `Estimated footprint: ${(totalKg / 1000).toFixed(1)} tCO₂e per year`;
});
