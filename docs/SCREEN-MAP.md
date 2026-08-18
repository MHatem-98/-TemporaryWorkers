# Screen map

The supplied Arabic images are visual references only. The implemented product language is English and the document direction is LTR.

## Current implementation status

- `S01` Groups (Contracts) — implemented with functional table-level and row-level action menus.
- All remaining routes — static HTML shells ready for implementation.
- Screen codes are documentation references only and do not appear in the product interface.
- Visible content and navigation are written directly in each HTML file. JavaScript is used for interaction only.

## Phase 1 — Setup

1. `S01` Groups (Contracts)
2. `S02` Create / Edit Group — Basic Information
3. `S03` Work Schedule
4. `S04` Pay Rules
5. `S05` Temporary Workers
6. `S06` Assign Workers to Group

## Phase 2 — Attendance

1. `A01` Group Attendance
2. `A02` Worker Attendance Details
3. `A03` Attendance Exceptions
4. `A04` Time Calculation
5. `A05` Attendance Review & Approval

## Phase 3 — Payroll

1. `P01` Open Payroll Period
2. `P02` Payroll Calculation
3. `P03` Payroll Review
4. `P04` Payroll Approval
5. `P05` Record Payment
6. `P06` Close Payroll Period

## Shared visual rules

- Dark navy fixed sidebar on desktop and slide-in sidebar on mobile.
- White cards, subtle gray borders, restrained shadows, and compact spacing.
- Blue is the main action and active-navigation color.
- Green, amber, red, and light blue communicate success, warning, error, and informational states.
- Desktop data tables must remain readable; on smaller screens they must scroll horizontally or switch to a deliberate mobile pattern.
- Use accessible labels, keyboard focus states, semantic tables, and meaningful button text.
