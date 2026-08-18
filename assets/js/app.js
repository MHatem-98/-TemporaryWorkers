document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((element) => new bootstrap.Tooltip(element));

  const groupFilters = document.getElementById("group-filters");
  if (!groupFilters) return;

  const search = document.getElementById("group-search");
  const workType = document.getElementById("work-type");
  const project = document.getElementById("project-site");
  const status = document.getElementById("group-status");
  const rows = [...document.querySelectorAll("[data-group-row]")];
  const count = document.getElementById("group-results-count");
  const completedLabel = document.querySelector("[data-completed-label]");
  const actionModalElement = document.getElementById("group-action-modal");
  const actionModal = actionModalElement ? new bootstrap.Modal(actionModalElement) : null;
  const actionTitle = document.getElementById("group-action-title");
  const actionMessage = document.getElementById("group-action-message");
  const confirmAction = document.getElementById("confirm-group-action");
  const toastElement = document.getElementById("group-action-toast");
  const toast = toastElement ? new bootstrap.Toast(toastElement, { delay: 2800 }) : null;
  const toastMessage = document.getElementById("group-toast-message");
  let hideCompleted = false;
  let pendingAction = null;

  const groupNameFor = (row) => row.querySelector(".table-primary-link")?.textContent.trim() || "this group";
  const showToast = (message) => {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.show();
  };

  const applyGroupFilters = () => {
    const query = search.value.trim().toLowerCase();
    let visibleRows = 0;

    rows.forEach((row) => {
      const matchesSearch = !query || row.dataset.name.includes(query);
      const matchesWorkType = workType.selectedIndex === 0 || row.dataset.workType === workType.value;
      const matchesProject = project.selectedIndex === 0 || row.dataset.project === project.value;
      const matchesStatus = status.selectedIndex === 0 || row.dataset.status === status.value;
      const matchesCompletedView = !hideCompleted || row.dataset.status !== "Completed";
      const isArchived = row.dataset.archived === "true";
      const isVisible = matchesSearch && matchesWorkType && matchesProject && matchesStatus && matchesCompletedView && !isArchived;

      row.hidden = !isVisible;
      if (isVisible) visibleRows += 1;
    });

    count.textContent = visibleRows ? `Showing 1 to ${visibleRows} of ${visibleRows} groups` : "No groups match the selected filters";
  };

  const updateStatus = (row, nextStatus) => {
    const badge = row.querySelector(".status-badge");
    const statusClasses = { Active: "status-success", Completed: "status-neutral", Upcoming: "status-info", Cancelled: "status-danger", Archived: "status-neutral" };
    if (!badge) return;
    row.dataset.status = nextStatus;
    badge.textContent = nextStatus;
    badge.className = `status-badge ${statusClasses[nextStatus] || "status-neutral"}`;
    applyGroupFilters();
  };

  const exportVisibleGroups = () => {
    const headers = [...document.querySelectorAll(".workforce-table thead th")].slice(0, -1).map((cell) => cell.textContent.trim());
    const values = rows.filter((row) => !row.hidden).map((row) => [...row.cells].slice(0, -1).map((cell) => `"${cell.textContent.trim().replaceAll('"', '""')}"`));
    const csv = [headers.map((value) => `"${value}"`), ...values].map((line) => line.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    link.download = "tamam-workforce-groups.csv";
    link.click();
    URL.revokeObjectURL(link.href);
    showToast("The visible group list was exported successfully.");
  };

  groupFilters.addEventListener("input", applyGroupFilters);
  groupFilters.addEventListener("change", applyGroupFilters);
  groupFilters.addEventListener("reset", () => window.setTimeout(applyGroupFilters));

  document.querySelectorAll("[data-table-action]").forEach((button) => button.addEventListener("click", () => {
    const action = button.dataset.tableAction;
    if (action === "export-csv") exportVisibleGroups();
    if (action === "print") window.print();
    if (action === "refresh") {
      groupFilters.reset();
      hideCompleted = false;
      completedLabel.textContent = "Hide completed groups";
      window.setTimeout(applyGroupFilters);
      showToast("Group data and filters were refreshed.");
    }
    if (action === "toggle-completed") {
      hideCompleted = !hideCompleted;
      completedLabel.textContent = hideCompleted ? "Show completed groups" : "Hide completed groups";
      button.querySelector("i").className = hideCompleted ? "bi bi-eye" : "bi bi-eye-slash";
      applyGroupFilters();
    }
  }));

  document.querySelectorAll("[data-row-action]").forEach((button) => button.addEventListener("click", () => {
    const row = button.closest("[data-group-row]");
    const groupName = groupNameFor(row);
    const action = button.dataset.rowAction;
    if (action === "duplicate") {
      window.location.href = `s02-group-details.html?mode=duplicate&group=${encodeURIComponent(row.dataset.name)}`;
      return;
    }

    const labels = {
      close: ["Close group", `Close ${groupName} and mark it as completed?`],
      reopen: ["Reopen group", `Reopen ${groupName} and mark it as active?`],
      archive: ["Archive group", `Archive ${groupName}? It will be removed from the active workflow.`],
      activate: ["Activate group", `Activate ${groupName} now?`],
      cancel: ["Cancel group", `Cancel ${groupName}?`]
    };
    pendingAction = { row, action, nextStatus: button.dataset.nextStatus };
    actionTitle.textContent = labels[action][0];
    actionMessage.textContent = labels[action][1];
    confirmAction.className = action === "archive" || action === "cancel" ? "btn btn-danger" : "btn btn-primary";
    confirmAction.textContent = labels[action][0];
    actionModal.show();
  }));

  confirmAction?.addEventListener("click", () => {
    if (!pendingAction) return;
    const { row, action, nextStatus } = pendingAction;
    const groupName = groupNameFor(row);
    if (action === "archive") {
      row.dataset.archived = "true";
      updateStatus(row, "Archived");
    } else if (action === "cancel") {
      updateStatus(row, "Cancelled");
    } else {
      updateStatus(row, nextStatus);
    }
    actionModal.hide();
    showToast(`${groupName} was updated successfully.`);
    pendingAction = null;
  });

  applyGroupFilters();
});
