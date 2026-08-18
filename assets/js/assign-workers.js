document.addEventListener("DOMContentLoaded", () => {
  const filters = document.getElementById(
    "worker-assignment-filters"
  );

  if (!filters) {
    return;
  }

  const searchInput = document.getElementById(
    "assignment-worker-search"
  );

  const contractFilter = document.getElementById(
    "contract-status-filter"
  );

  const availabilityFilter = document.getElementById(
    "availability-filter"
  );

  const selectAll = document.getElementById("select-all-workers");

  const workerRows = [
    ...document.querySelectorAll("[data-assignment-worker]"),
  ];

  const selectedCount = document.getElementById(
    "selected-workers-count"
  );

  const resultsCount = document.getElementById(
    "assignment-results-count"
  );

  const selectionWarning = document.getElementById(
    "selection-warning"
  );

  const createButton = document.getElementById(
    "create-group-button"
  );

  const confirmationCount = document.getElementById(
    "confirmation-worker-count"
  );

  const createModalElement = document.getElementById(
    "create-group-modal"
  );

  const createModal = new bootstrap.Modal(createModalElement);

  const confirmCreateButton = document.getElementById(
    "confirm-create-group"
  );

  const saveDraftButton = document.getElementById(
    "save-assignment-draft"
  );

  const workerSettingsModal = document.getElementById(
    "worker-settings-modal"
  );

  const configuredWorkerName = document.getElementById(
    "configured-worker-name"
  );

  const saveWorkerSettingsButton = document.getElementById(
    "save-worker-settings"
  );

  const toastElement = document.getElementById(
    "assignment-toast"
  );

  const toastMessage = document.getElementById(
    "assignment-toast-message"
  );

  const assignmentToast = new bootstrap.Toast(toastElement, {
    delay: 2600,
  });

  function showToast(message) {
    toastMessage.textContent = message;
    assignmentToast.show();
  }

  function getVisibleRows() {
    return workerRows.filter((row) => !row.hidden);
  }

  function getSelectedRows() {
    return workerRows.filter((row) => {
      const checkbox = row.querySelector(".worker-select");
      return checkbox.checked;
    });
  }

  function updateSelection() {
    const visibleRows = getVisibleRows();
    const selectedRows = getSelectedRows();

    selectedCount.textContent = selectedRows.length;

    workerRows.forEach((row) => {
      const checkbox = row.querySelector(".worker-select");

      row.classList.toggle(
        "worker-selected",
        checkbox.checked
      );
    });

    const visibleCheckboxes = visibleRows.map((row) => {
      return row.querySelector(".worker-select");
    });

    const selectedVisible = visibleCheckboxes.filter((checkbox) => {
      return checkbox.checked;
    }).length;

    selectAll.checked =
      visibleCheckboxes.length > 0 &&
      selectedVisible === visibleCheckboxes.length;

    selectAll.indeterminate =
      selectedVisible > 0 &&
      selectedVisible < visibleCheckboxes.length;

    if (selectedRows.length > 0) {
      selectionWarning.hidden = true;
    }
  }

  function applyFilters() {
    const searchValue = searchInput.value
      .trim()
      .toLowerCase();

    let visibleCount = 0;

    workerRows.forEach((row) => {
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

      const matchesContract =
        !contractFilter.value ||
        row.dataset.contractStatus === contractFilter.value;

      const matchesAvailability =
        !availabilityFilter.value ||
        row.dataset.availability === availabilityFilter.value;

      const isVisible =
        matchesSearch &&
        matchesContract &&
        matchesAvailability;

      row.hidden = !isVisible;

      if (isVisible) {
        visibleCount += 1;
      }
    });

    resultsCount.textContent =
      visibleCount === 1
        ? "Showing 1 eligible worker"
        : `Showing ${visibleCount} eligible workers`;

    updateSelection();
  }

  filters.addEventListener("input", applyFilters);
  filters.addEventListener("change", applyFilters);

  filters.addEventListener("reset", () => {
    window.setTimeout(applyFilters);
  });

  selectAll.addEventListener("change", () => {
    getVisibleRows().forEach((row) => {
      const checkbox = row.querySelector(".worker-select");
      checkbox.checked = selectAll.checked;
    });

    updateSelection();
  });

  document
    .querySelectorAll(".worker-select")
    .forEach((checkbox) => {
      checkbox.addEventListener("change", updateSelection);
    });

  document
    .querySelectorAll("[data-configure-worker]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        configuredWorkerName.textContent =
          button.dataset.workerName;
      });
    });

  saveWorkerSettingsButton.addEventListener("click", () => {
    const modalInstance =
      bootstrap.Modal.getInstance(workerSettingsModal);

    modalInstance?.hide();

    showToast(
      `Assignment settings for ${configuredWorkerName.textContent} were saved.`
    );
  });

  saveDraftButton.addEventListener("click", () => {
    showToast("The group assignment draft was saved.");
  });

  createButton.addEventListener("click", () => {
    const selectedRows = getSelectedRows();

    if (selectedRows.length === 0) {
      selectionWarning.hidden = false;

      selectionWarning.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      return;
    }

    const workerLabel =
      selectedRows.length === 1
        ? "1 worker"
        : `${selectedRows.length} workers`;

    confirmationCount.textContent = workerLabel;
    createModal.show();
  });

  confirmCreateButton.addEventListener("click", () => {
    confirmCreateButton.disabled = true;

    confirmCreateButton.innerHTML = `
      <span
        class="spinner-border spinner-border-sm me-2"
        aria-hidden="true"
      ></span>
      Creating...
    `;

    window.setTimeout(() => {
      window.location.href = "s01-groups.html";
    }, 800);
  });

  applyFilters();
});