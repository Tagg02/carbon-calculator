const form = document.getElementById("carbon-form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const miles = form.miles.value;
  const kwh = form.kwh.value;
  const shortFlights = form.shortFlights.value;
  const longFlights = form.longFlights.value;
  const diet = form.diet.value;

  console.log(miles, kwh, shortFlights, longFlights, diet);
});
