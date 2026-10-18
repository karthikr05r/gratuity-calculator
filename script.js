const form = document.getElementById("gratuity-form");
const resultPanel = document.getElementById("result");
const amountElement = document.getElementById("amount");
const noteElement = document.getElementById("result-note");
const salaryElement = document.getElementById("result-salary");
const serviceElement = document.getElementById("result-service");

const rupees = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2
});

document.getElementById("year").textContent = new Date().getFullYear();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const salary = Number(document.getElementById("salary").value);
  const years = Number(document.getElementById("years").value);
  const months = Number(document.getElementById("months").value || 0);

  if (!Number.isFinite(salary) || salary <= 0 ||
      !Number.isInteger(years) || years < 0 ||
      !Number.isInteger(months) || months < 0 || months > 11) {
    alert("Please enter a valid salary, years, and additional months.");
    return;
  }

  const totalMonths = years * 12 + months;

  // Illustrative common formula: salary × 15 / 26 × counted years.
  // The statutory treatment of service periods and eligibility may vary.
  const countedYears = Math.floor(totalMonths / 12) +
    (totalMonths % 12 > 6 ? 1 : 0);
  const gratuity = salary * 15 / 26 * countedYears;

  amountElement.textContent = rupees.format(gratuity);
  salaryElement.textContent = rupees.format(salary);
  serviceElement.textContent = `${countedYears} ${countedYears === 1 ? "year" : "years"}`;
  noteElement.textContent = countedYears > 0
    ? `Estimated amount for ${countedYears} counted ${countedYears === 1 ? "year" : "years"} of service.`
    : "No service years were counted by this estimate. Check the eligibility rules that apply to you.";
  resultPanel.hidden = false;
  resultPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

form.addEventListener("reset", () => {
  resultPanel.hidden = true;
});
