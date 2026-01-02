const form = document.getElementById("carbon-form");
const resetBtn = document.getElementById("reset");

const result = document.getElementById("result");
const emptyState = document.getElementById("emptyState");

const totalTons = document.getElementById("totalTons");
const breakdownEl = document.getElementById("breakdown");
const badge = document.getElementById("badge");

document.getElementById("year").textContent = new Date().getFullYear();

// Simplified factors for demo purposes (not an audit)
const FACTORS = {
  drivingKgPerMile: 0.30,
  electricityKgPerKwh: 0.20,
  shortFlightKg: 250,
  longFlightKg: 1100,
  dietKgPerYear: {
    mixed: 2000,
    lowmeat: 1600,
    vegetarian: 1200,
    vegan: 900,
  },
};

function num(v){
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function badgeText(totalTonsValue){
  if (totalTonsValue < 4) return "Lower estimate";
  if (totalTonsValue < 8) return "Medium estimate";
  return "Higher estimate";
}

function item(label, value){
  return `
    <div class="item">
      <div class="k">${label}</div>
      <div class="v">${value}</div>
    </div>
  `;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const milesWeekly = num(form.miles.value);
  const kwhMonthly = num(form.kwh.value);
  const shortFlights = num(form.shortFlights.value);
  const longFlights = num(form.longFlights.value);
  const diet = form.diet.value || "mixed";

  const drivingKg = milesWeekly * 52 * FACTORS.drivingKgPerMile;
  const electricityKg = kwhMonthly * 12 * FACTORS.electricityKgPerKwh;
  const flightsKg = (shortFlights * FACTORS.shortFlightKg) + (longFlights * FACTORS.longFlightKg);
  const dietKg = FACTORS.dietKgPerYear[diet] ?? FACTORS.dietKgPerYear.mixed;

  const totalKg = drivingKg + electricityKg + flightsKg + dietKg;
  const total = totalKg / 1000;

  totalTons.textContent = total.toFixed(1);
  badge.textContent = badgeText(total);

  breakdownEl.innerHTML =
    item("Driving", `${(drivingKg/1000).toFixed(1)} tCO₂e`) +
    item("Electricity", `${(electricityKg/1000).toFixed(1)} tCO₂e`) +
    item("Flights", `${(flightsKg/1000).toFixed(1)} tCO₂e`) +
    item("Diet", `${(dietKg/1000).toFixed(1)} tCO₂e`);

  emptyState.hidden = true;
  result.hidden = false;
});

resetBtn.addEventListener("click", () => {
  form.reset();
  result.hidden = true;
  emptyState.hidden = false;
  breakdownEl.innerHTML = "";
  totalTons.textContent = "0.0";
  badge.textContent = "Estimate";
});
