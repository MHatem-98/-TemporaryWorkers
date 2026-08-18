document.addEventListener("DOMContentLoaded", () => {
  const filters = document.getElementById("worker-filters");

  if (!filters) {
    return;
  }

  const search = document.getElementById("worker-search");
  const statusFilter = document.getElementById(
    "worker-status-filter"
  );

  const contractFilter = document.getElementById(
    "worker-contract-filter"
  );

  const profileFilter = document.getElementById(
    "worker-profile-filter"
  );

  const rows = [
    ...document.querySelectorAll("[data-worker-row]"),
  ];

  const resultsTop = document.getElementById(
    "worker-results-top"
  );

  const resultsBottom = document.getElementById(
    "worker-results-count"
  );

  const workerForm = document.getElementById(
    "add-worker-form"
  );

  const workerFormModal = document.getElementById(
    "worker-form-modal"
  );

  const statusModalElement = document.getElementById(
    "worker-status-modal"
  );

  const statusModal = new bootstrap.Modal(statusModalElement);

  const statusTitle = document.getElementById(
    "worker-status-title"
  );

  const statusMessage = document.getElementById(
    "worker-status-message"
  );

  const confirmStatusButton = document.getElementById(
    "confirm-worker-status"
  );

  const toastElement = document.getElementById(
    "worker-toast"
  );

  const toastMessage = document.getElementById(
    "worker-toast-message"
  );

  const workerToast = new bootstrap.Toast(toastElement, {
    delay: 2600,
  });

  let pendingStatusChange = null;

  function showToast(message) {
    toastMessage.textContent = message;
    workerToast.show();
  }

  function applyFilters() {
    const searchValue = search.value.trim().toLowerCase();

    let visibleCount = 0;

    rows.forEach((row) => {
      const searchableText = [
        row.dataset.name,
        row.dataset.identity,
        row.dataset.mobile,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !searchValue ||
        searchableText.includes(searchValue);

      const matchesStatus =
        !statusFilter.value ||
        row.dataset.status === statusFilter.value;

      const matchesContract =
        !contractFilter.value ||
        row.dataset.contract === contractFilter.value;

      const matchesProfile =
        !profileFilter.value ||
        row.dataset.profile === profileFilter.value;

      const isVisible =
        matchesSearch &&
        matchesStatus &&
        matchesContract &&
        matchesProfile;

      row.hidden = !isVisible;

      if (isVisible) {
        visibleCount += 1;
      }
    });

    resultsTop.textContent =
      visibleCount === 1
        ? "1 worker"
        : `${visibleCount} workers`;

    resultsBottom.textContent =
      visibleCount === 0
        ? "No workers match the selected filters"
        : `Showing 1 to ${visibleCount} of ${visibleCount} workers`;
  }

  function updateWorkerStatus(row, newStatus) {
    const badge = row.querySelector(".status-badge");

    const statusClasses = {
      Active: "status-success",
      Inactive: "status-neutral",
      Blocked: "status-danger",
    };

    row.dataset.status = newStatus;
    badge.textContent = newStatus;
    badge.className =
      `status-badge ${statusClasses[newStatus]}`;

    row.classList.remove("status-updated");

    window.requestAnimationFrame(() => {
      row.classList.add("status-updated");
    });

    applyFilters();
  }

  filters.addEventListener("input", applyFilters);
  filters.addEventListener("change", applyFilters);

  filters.addEventListener("reset", () => {
    window.setTimeout(applyFilters);
  });

  document
    .querySelectorAll("[data-change-worker-status]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const row = button.closest("[data-worker-row]");
        const workerName = button.dataset.workerName;
        const newStatus = button.dataset.changeWorkerStatus;

        pendingStatusChange = {
          row,
          workerName,
          newStatus,
        };

        statusTitle.textContent =
          newStatus === "Active"
            ? "Activate worker"
            : "Deactivate worker";

        statusMessage.textContent =
          `Change ${workerName}’s status to ${newStatus}?`;

        confirmStatusButton.className =
          newStatus === "Inactive"
            ? "btn btn-danger"
            : "btn btn-primary";

        statusModal.show();
      });
    });

  confirmStatusButton.addEventListener("click", () => {
    if (!pendingStatusChange) {
      return;
    }

    const { row, workerName, newStatus } =
      pendingStatusChange;

    updateWorkerStatus(row, newStatus);
    statusModal.hide();

    showToast(
      `${workerName} is now ${newStatus.toLowerCase()}.`
    );

    pendingStatusChange = null;
  });

  document
    .querySelectorAll("[data-view-worker]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        showToast(
          `${button.dataset.viewWorker} profile will open here.`
        );
      });
    });

  document
    .querySelectorAll("[data-worker-table-action]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.dataset.workerTableAction;

        if (action === "refresh") {
          filters.reset();
          window.setTimeout(applyFilters);
          showToast("Worker data was refreshed.");
        }

        if (action === "import") {
          showToast("Worker import dialog will open here.");
        }

        if (action === "export") {
          showToast("The visible worker list was exported.");
        }
      });
    });

  workerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    workerForm.classList.add("was-validated");

    if (!workerForm.checkValidity()) {
      workerForm.querySelector(":invalid")?.focus();
      return;
    }

    bootstrap.Modal.getInstance(workerFormModal)?.hide();

    showToast("The new worker profile was created.");

    workerForm.reset();
    workerForm.classList.remove("was-validated");
  });

  applyFilters();
});