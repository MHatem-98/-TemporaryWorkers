document.addEventListener("DOMContentLoaded", () => {
  const groupDetailsForm = document.getElementById("group-details-form");

  if (!groupDetailsForm) {
    return;
  }

  const startDate = document.getElementById("group-start-date");
  const endDate = document.getElementById("group-end-date");
  const endDateFeedback = document.getElementById("end-date-feedback");
  const periodSummary = document.getElementById("group-period-summary");

  const description = document.getElementById("group-description");
  const descriptionCount = document.getElementById("description-count");

  const draftButton = document.getElementById("save-group-draft");
  const toastElement = document.getElementById("group-form-toast");

  const draftToast = toastElement
    ? new bootstrap.Toast(toastElement, {
        delay: 2500,
      })
    : null;

  function updateDescriptionCount() {
    descriptionCount.textContent = description.value.length;
  }

  function updateGroupPeriod() {
    endDate.setCustomValidity("");
    endDateFeedback.textContent = "Select an end date.";

    if (!startDate.value || !endDate.value) {
      periodSummary.innerHTML = `
        <i class="bi bi-calendar3"></i>
        <span>
          Select a start and end date to calculate the group period.
        </span>
      `;

      return true;
    }

    const start = new Date(`${startDate.value}T00:00:00`);
    const end = new Date(`${endDate.value}T00:00:00`);

    const difference = end.getTime() - start.getTime();
    const totalDays = Math.round(difference / 86400000) + 1;

    if (totalDays <= 0) {
      endDate.setCustomValidity(
        "End date must be on or after the start date."
      );

      endDateFeedback.textContent =
        "End date must be on or after the start date.";

      periodSummary.innerHTML = `
        <i class="bi bi-exclamation-circle text-danger"></i>
        <span class="text-danger">
          The selected period is not valid.
        </span>
      `;

      return false;
    }

    const dayLabel = totalDays === 1 ? "day" : "days";

    periodSummary.innerHTML = `
      <i class="bi bi-calendar-check"></i>
      <span>
        <strong>${totalDays} calendar ${dayLabel}</strong>
        in this group period.
      </span>
    `;

    return true;
  }

  startDate.addEventListener("change", updateGroupPeriod);
  endDate.addEventListener("change", updateGroupPeriod);

  description.addEventListener("input", updateDescriptionCount);

  draftButton.addEventListener("click", () => {
    draftToast?.show();
  });

  groupDetailsForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const datesAreValid = updateGroupPeriod();

    groupDetailsForm.classList.add("was-validated");

    if (!groupDetailsForm.checkValidity() || !datesAreValid) {
      const firstInvalidField =
        groupDetailsForm.querySelector(":invalid");

      firstInvalidField?.focus();
      return;
    }

    window.location.href = "s03-work-schedule.html";
  });

  updateDescriptionCount();
});