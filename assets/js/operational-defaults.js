document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("operational-defaults-form");

  if (!form) {
    return;
  }

  const scheduleSelect = document.getElementById("default-schedule");
  const schedulePreview = document.getElementById("schedule-preview");
  const previewButton = document.getElementById(
    "preview-schedule-button"
  );

  const financialToggle = document.getElementById(
    "financial-defaults-toggle"
  );

  const financialContent = document.getElementById(
    "financial-defaults-content"
  );

  const financialFields = document.getElementById(
    "financial-defaults-fields"
  );

  const saveDraftButton = document.getElementById(
    "save-defaults-draft"
  );

  const toastElement = document.getElementById("defaults-toast");

  const defaultsToast = toastElement
    ? new bootstrap.Toast(toastElement, {
        delay: 2500,
      })
    : null;

  const schedules = {
    standard: {
      name: "Standard Day Shift",
      sessions: "08:00 AM – 05:00 PM",
      breakTime: "1 hour break",
      total: "8 working hours",
      workingDays: ["Sun", "Mon", "Tue", "Wed", "Thu"],
      offDays: ["Fri", "Sat"],
    },

    split: {
      name: "Split Shift",
      sessions: "09:00 AM – 12:00 PM / 05:00 PM – 09:00 PM",
      breakTime: "Split between sessions",
      total: "7 working hours",
      workingDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Sat"],
      offDays: ["Fri"],
    },

    evening: {
      name: "Evening Shift",
      sessions: "04:00 PM – 12:00 AM",
      breakTime: "30 minute break",
      total: "7.5 working hours",
      workingDays: ["Sun", "Mon", "Tue", "Wed", "Thu"],
      offDays: ["Fri", "Sat"],
    },

    flexible: {
      name: "Flexible Schedule",
      sessions: "Flexible start and end time",
      breakTime: "According to policy",
      total: "8 required hours",
      workingDays: ["Sun", "Mon", "Tue", "Wed", "Thu"],
      offDays: ["Fri", "Sat"],
    },
  };

  function renderSchedulePreview() {
    const schedule = schedules[scheduleSelect.value];

    if (!schedule) {
      schedulePreview.classList.add("empty");

      schedulePreview.innerHTML = `
        <div class="schedule-preview-icon">
          <i class="bi bi-calendar-week"></i>
        </div>

        <div>
          <strong>No schedule selected</strong>
          <p>
            Select a schedule to display its working days and sessions.
          </p>
        </div>
      `;

      return;
    }

    const workingDays = schedule.workingDays
      .map((day) => {
        return `<span class="schedule-day">${day}</span>`;
      })
      .join("");

    const offDays = schedule.offDays
      .map((day) => {
        return `<span class="schedule-day off">${day} Off</span>`;
      })
      .join("");

    schedulePreview.classList.remove("empty");

    schedulePreview.innerHTML = `
      <div class="schedule-preview-icon">
        <i class="bi bi-calendar-check"></i>
      </div>

      <div class="flex-grow-1">
        <strong>${schedule.name}</strong>

        <p>
          ${schedule.sessions} · ${schedule.breakTime} · ${schedule.total}
        </p>

        <div class="schedule-days">
          ${workingDays}
          ${offDays}
        </div>
      </div>
    `;
  }

  function toggleFinancialDefaults() {
    const isEnabled = financialToggle.checked;

    financialFields.disabled = !isEnabled;
    financialContent.classList.toggle("enabled", isEnabled);
    financialContent.setAttribute(
      "aria-hidden",
      String(!isEnabled)
    );
  }

  scheduleSelect.addEventListener("change", renderSchedulePreview);

  previewButton.addEventListener("click", () => {
    if (!scheduleSelect.value) {
      scheduleSelect.focus();
      scheduleSelect.classList.add("is-invalid");
      return;
    }

    scheduleSelect.classList.remove("is-invalid");
    renderSchedulePreview();

    schedulePreview.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  });

  financialToggle.addEventListener(
    "change",
    toggleFinancialDefaults
  );

  saveDraftButton.addEventListener("click", () => {
    defaultsToast?.show();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    form.classList.add("was-validated");

    if (!form.checkValidity()) {
      const firstInvalidField = form.querySelector(":invalid");
      firstInvalidField?.focus();
      return;
    }

    window.location.href = "s06-assign-workers.html";
  });

  toggleFinancialDefaults();
});