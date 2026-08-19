document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.lang = "en";
  document.documentElement.dir = "ltr";
  document.querySelectorAll('link[href*="bootstrap.rtl.min.css"]').forEach((link) => {
    link.href = link.href.replace("bootstrap.rtl.min.css", "bootstrap.min.css");
  });
  const translations = new Map([
    ["لوحة إعداد النظام", "System Setup Dashboard"], ["الإعداد", "Setup"], ["العمال", "Workers"],
    ["المجموعات", "Groups"], ["مجموعات العمل", "Work Groups"], ["جداول العمل", "Work Schedules"],
    ["سياسات الحضور", "Attendance Policies"], ["سياسات الحضور والوقت", "Attendance & Time Policies"],
    ["سياسات الرواتب", "Payroll Policies"], ["الحضور والانصراف", "Attendance"], ["الرواتب والإقفال", "Payroll & Closing"],
    ["المساعدة والدعم", "Help & Support"], ["تسجيل الخروج", "Sign Out"], ["محمد أحمد", "Mohammed Ahmed"],
    ["مدير النظام", "System Administrator"], ["شركة النمو", "Growth Company"], ["العربية", "English"],
    ["نظرة عامة على إعدادات نظام القوى العاملة المؤقتة والمرنة", "An overview of temporary and flexible workforce settings"],
    ["العقود التي تنتهي قريبًا", "Contracts Expiring Soon"], ["المجموعات الحالية", "Current Groups"],
    ["العقود النشطة", "Active Contracts"], ["عدد العمال", "Total Workers"], ["خلال 30 يومًا القادمة", "Within the next 30 days"],
    ["من الشهر الماضي", "from last month"], ["بدء سريع", "Quick Start"], ["عامل جديد", "New Worker"],
    ["عقد جديد", "New Contract"], ["مجموعة جديدة", "New Group"], ["جدول عمل جديد", "New Work Schedule"],
    ["نظرة على الإعدادات", "Settings Overview"], ["سياسات الحضور", "Attendance Policies"], ["طرق الدفع", "Payment Methods"],
    ["إعداد قواعد وإجراءات الحضور والانصراف وتتبع الوقت.", "Configure attendance rules, procedures, and time tracking."],
    ["إعداد مكونات الرواتب والاستقطاعات والبدلات.", "Configure payroll components, deductions, and allowances."],
    ["إعداد فترات وأوقات الدوام والعطلات وأيام العمل.", "Configure shifts, working hours, holidays, and working days."],
    ["إدارة طرق دفع الرواتب والحسابات المصرفية.", "Manage payroll payment methods and bank accounts."],
    ["عرض التفاصيل", "View details"], ["المهام أو العناصر التي تحتاج متابعة", "Tasks and Items Requiring Attention"],
    ["النوع", "Type"], ["العنوان", "Title"], ["التفاصيل", "Details"], ["تاريخ الاستحقاق", "Due Date"],
    ["الأولوية", "Priority"], ["الإجراء", "Action"], ["عقود تنتهي", "Expiring Contracts"],
    ["عقود تنتهي قريبًا", "Contracts Expiring Soon"], ["مجموعة تبدأ", "Starting Group"], ["مجموعات تبدأ", "Starting Groups"],
    ["مجموعات تبدأ قريبًا", "Groups Starting Soon"], ["بيانات ناقصة", "Missing Data"], ["بيانات عمال ناقصة", "Incomplete Worker Profiles"],
    ["متوسطة", "Medium"], ["معلومات", "Information"], ["عالية", "High"], ["عرض العقود", "View Contracts"],
    ["عرض المجموعات", "View Groups"], ["مراجعة البيانات", "Review Data"], ["قبل 30 يومًا", "30 days before"],
    ["23 عقدًا تنتهي خلال 30 يومًا القادمة.", "23 contracts expire within the next 30 days."],
    ["5 مجموعات تبدأ خلال 14 يومًا القادمة.", "5 groups start within the next 14 days."],
    ["46 ملف عامل يحتاج إلى تحديث.", "46 worker profiles need updating."],
    ["قبل 14 يومًا", "14 days before"], ["القائمة الرئيسية لجميع العمال المؤقتين والمرنين في النظام.", "The central directory for all temporary and flexible workers."],
    ["ملفات غير مكتملة", "Incomplete Profiles"], ["عمال بعقود نشطة", "Workers with Active Contracts"], ["عمال نشطون", "Active Workers"],
    ["إجمالي العمال", "Total Workers"], ["ابحث بالاسم أو رقم الهوية أو الجوال", "Search by name, ID, or mobile"],
    ["الحالة", "Status"], ["الجنسية", "Nationality"], ["حالة العقد", "Contract Status"], ["المجموعة", "Group"],
    ["الكل", "All"], ["نشط", "Active"], ["بانتظار", "Pending"], ["غير نشط", "Inactive"], ["سعودي", "Saudi"], ["مصري", "Egyptian"],
    ["عقد يومي", "Daily Contract"], ["عقد أسبوعي", "Weekly Contract"], ["عقد منتهي", "Expired Contract"],
    ["الإنشاءات", "Construction"], ["الصيانة", "Maintenance"], ["التشغيل", "Operations"], ["مسح الفلاتر", "Clear Filters"],
    ["رقم العامل", "Worker ID"], ["طريقة الدفع", "Payment Method"], ["العامل", "Worker"], ["المجموعة الحالية", "Current Group"],
    ["الجوال", "Mobile"], ["رقم الهوية / الإقامة", "National ID / Iqama"], ["الاسم", "Name"], ["الإجراءات", "Actions"],
    ["تحويل بنكي", "Bank Transfer"], ["مدى", "Mada"], ["النظافة", "Cleaning"], ["ينتهي", "Ends"], ["انتهى", "Ended"],
    ["إدارة مجموعات العمل التشغيلية وتعيين الجداول والأجور الافتراضية لكل مجموعة.", "Manage operational work groups and assign default schedules and pay rates."],
    ["مجموعات نشطة", "Active Groups"], ["تبدأ قريبًا", "Starting Soon"], ["تنتهي قريبًا", "Ending Soon"],
    ["إجمالي العاملين المعيّنين", "Total Assigned Workers"], ["من أصل 24 مجموعة", "of 24 groups"], ["خلال 14 يومًا", "Within 14 days"],
    ["عبر جميع المجموعات", "Across all groups"], ["البحث في المجموعات...", "Search groups..."], ["المشروع / الموقع", "Project / Site"],
    ["نوع العمل", "Work Type"], ["نطاق التاريخ", "Date Range"], ["إعادة تعيين", "Reset"], ["اسم المجموعة", "Group Name"],
    ["تاريخ البداية", "Start Date"], ["عدد العمال", "Workers"], ["الجدول الافتراضي", "Default Schedule"], ["الأجر الافتراضي", "Default Pay"],
    ["معرض الرياض - أغسطس", "Riyadh Expo - August"], ["تركيب وتجهيز المعرض", "Expo installation and preparation"],
    ["معرض الرياض الدولي", "Riyadh International Expo"], ["الرياض", "Riyadh"], ["عامل", "worker"], ["عمال", "workers"],
    ["أيام / أسبوع", "days / week"], ["يوميًا", "daily"], ["عمال المخازن", "Warehouse Workers"],
    ["مستودع الرياض", "Riyadh Warehouse"], ["تحميل وتنزيل وترتيب", "Loading, unloading, and shelving"],
    ["فريق الفعاليات", "Events Team"], ["تنظيم وإدارة الفعاليات", "Event organization and operations"], ["مركز واجهة الرياض", "Riyadh Front Center"],
    ["إنشاء مجموعة عمل", "Create Work Group"], ["حدد بيانات المجموعة وإعداداتها التشغيلية الافتراضية قبل إسناد العمال.", "Define the group and its operational defaults before assigning workers."],
    ["إلغاء", "Cancel"], ["بيانات المجموعة", "Group Details"], ["الخطوة 1 من 2", "Step 1 of 2"], ["اسم المجموعة *", "Group Name *"],
    ["المشروع / الموقع *", "Project / Site *"], ["تاريخ البداية *", "Start Date *"], ["تاريخ النهاية *", "End Date *"], ["الوصف", "Description"],
    ["الإعدادات الافتراضية", "Default Settings"], ["جدول العمل", "Work Schedule"], ["سياسة الحضور", "Attendance Policy"],
    ["سياسة الرواتب", "Payroll Policy"], ["أساس الأجر", "Pay Basis"], ["بالساعة", "Hourly"], ["معدل الأجر", "Pay Rate"],
    ["دورة الدفع", "Pay Cycle"], ["كل أسبوعين", "Every two weeks"], ["كل 10 أيام", "Every 10 days"], ["شهريًا", "Monthly"],
    ["متابعة إلى إسناد العمال", "Continue to Worker Assignment"], ["حفظ كمسودة", "Save Draft"],
    ["عقد العامل", "Worker Contract"], ["العاملون", "Workers"], ["رقم الإقامة", "Iqama Number"], ["رقم الجوال", "Mobile Number"],
    ["بيانات العقد", "Contract Details"], ["الربط التشغيلي", "Operational Links"], ["السياسات", "Policies"], ["الدفع", "Payment"],
    ["تفاصيل العقد", "Contract Details"], ["عقد مؤقت", "Temporary Contract"], ["رقم العقد", "Contract Number"], ["تاريخ الانتهاء", "End Date"],
    ["مدة العقد", "Contract Duration"], ["يومي", "Daily"], ["جدول الدوام المرتبط", "Linked Work Schedule"], ["تعديل العقد", "Edit Contract"],
    ["تجديد العقد", "Renew Contract"], ["إنهاء العقد", "Terminate Contract"], ["ملخص العقد", "Contract Summary"], ["نوع العقد", "Contract Type"],
    ["فترة العقد", "Contract Period"], ["بيانات الدفع", "Payment Details"], ["إنشاء وإدارة جداول عمل قابلة لإعادة الاستخدام وتطبيقها على العاملين أو المجموعات.", "Create reusable work schedules and apply them to workers or groups."],
    ["قوالب جداول العمل", "Work Schedule Templates"], ["جدول جديد", "New Schedule"], ["جدول عمال المعرض", "Expo Workers Schedule"],
    ["افتراضي", "Default"], ["مخصص لعمال المعرض", "Assigned to expo workers"], ["جدول مشرف المعرض", "Expo Supervisor Schedule"],
    ["جدول عمال المخازن", "Warehouse Workers Schedule"], ["عرض الجداول غير النشطة", "View inactive schedules"], ["تعديل", "Edit"],
    ["إجمالي الساعات المجدولة", "Total Scheduled Hours"], ["ساعات يوميًا", "hours daily"], ["الجلسات في اليوم", "Sessions per Day"],
    ["جلسة", "session"], ["الأحد - الخميس", "Sunday - Thursday"], ["متاحة", "Available"], ["الجمعة والسبت إجازة", "Friday and Saturday off"],
    ["جلسات العمل", "Work Sessions"], ["الجلسة", "Session"], ["من", "From"], ["إلى", "To"], ["المدة", "Duration"],
    ["نوع الجلسة", "Session Type"], ["الجلسة الأولى", "First Session"], ["الجلسة الثانية", "Second Session"], ["ساعات", "hours"],
    ["مدفوعة", "Paid"], ["أيام الإجازة (اختياري)", "Days Off (Optional)"], ["الاستراحة غير المدفوعة", "Unpaid Break"], ["فترات السماح", "Grace Periods"],
    ["قائمة السياسات", "Policy List"], ["بحث في السياسات...", "Search policies..."], ["سياسة العمال المؤقتين", "Temporary Workers Policy"],
    ["سياسة المشرفين", "Supervisors Policy"], ["سياسة المخازن", "Warehouse Policy"], ["قواعد الاحتساب", "Calculation Rules"],
    ["التغطية", "Coverage"], ["سجل التغييرات", "Change Log"], ["معالجة الغياب", "Absence Handling"], ["غياب يوم كامل", "Full-day absence"],
    ["خصم يوم كامل", "Deduct a Full Day"], ["الانصراف المبكر", "Early Departure"], ["فترة السماح", "Grace Period"], ["دقيقة", "minutes"],
    ["التأخر عن الحضور", "Late Arrival"], ["احتساب الوقت الإضافي", "Overtime Calculation"], ["يبدأ بعد", "Starts after"],
    ["ساعتين", "2 hours"], ["البصمات المفقودة", "Missing Punches"], ["الأذونات", "Permissions"], ["قواعد قفل الحضور", "Attendance Lock Rules"],
    ["حفظ التغييرات", "Save Changes"], ["قوالب سياسات الرواتب", "Payroll Policy Templates"], ["سياسة جديدة", "New Policy"],
    ["سياسة الرواتب الأساسية", "Base Payroll Policy"], ["سياسة العمل الموسمي", "Seasonal Work Policy"], ["تفاصيل سياسة الرواتب الأساسية", "Base Payroll Policy Details"],
    ["تعديل السياسة", "Edit Policy"], ["قواعد خصم التأخير", "Late Deduction Rules"], ["طريقة الخصم", "Deduction Method"],
    ["قواعد خصم الغياب", "Absence Deduction Rules"], ["الخصم لكل يوم غياب", "Deduction per absence day"], ["يوم واحد", "One Day"],
    ["أساس احتساب الأجر", "Pay Calculation Basis"], ["البدلات", "Allowances"], ["قواعد العمل الإضافي", "Overtime Rules"],
    ["التعامل مع الإذن", "Permission Handling"], ["خصم بالساعة", "Hourly Deduction"], ["منطق دورة الدفع", "Pay Cycle Logic"],
    ["إسناد العمال إلى المجموعة", "Assign Workers to Group"], ["أضف العمال إلى المجموعة مع تطبيق الإعدادات الافتراضية أو تخصيصها عند الحاجة.", "Add workers to the group using its defaults or override them when needed."],
    ["رجوع", "Back"], ["المجموعة المحددة", "Selected Group"], ["حاليًا", "currently"], ["العمال المتاحون", "Available Workers"],
    ["العمال المعيّنون", "Assigned Workers"], ["الوظيفة الحالية", "Current Job"], ["الدور", "Role"], ["الجدول", "Schedule"],
    ["الأجر", "Pay"], ["إضافة للمجموعة", "Add to Group"], ["إزالة من المجموعة", "Remove from Group"], ["حفظ الإسناد", "Save Assignment"]
  ]);
  const translate = (value) => {
    let output = value;
    [...translations.entries()].sort((a, b) => b[0].length - a[0].length).forEach(([arabic, english]) => {
      output = output.replaceAll(arabic, english);
    });
    const finalTerms = new Map([
      ["أحمد محمد عبدالله", "Ahmed Mohammed Abdullah"], ["أحمد عبدالله محمد", "Ahmed Abdullah Mohammed"],
      ["سالم عبدالله الحربي", "Salem Abdullah Alharbi"], ["سالم محمد العتيبي", "Salem Mohammed Alotaibi"],
      ["محمد فهد العتيبي", "Mohammed Fahad Alotaibi"], ["علي حسن الشهري", "Ali Hassan Alshahri"],
      ["ياسر خالد المطيري", "Yasser Khaled Almutairi"], ["فهد سعد المطيري", "Fahad Saad Almutairi"],
      ["عبدالله ناصر العنزي", "Abdullah Nasser Alanazi"], ["سعود عبدالله الدوسري", "Saud Abdullah Aldosari"],
      ["علي محمد الحربي", "Ali Mohammed Alharbi"], ["نواف منصور الشمري", "Nawaf Mansour Alshammari"],
      ["أغسطس", "August"], ["سبتمبر", "September"], ["أكتوبر", "October"], ["ديسمبر", "December"], ["مايو", "May"], ["يوليو", "July"],
      ["الأحد", "Sunday"], ["الاثنين", "Monday"], ["الثلاثاء", "Tuesday"], ["الخميس", "Thursday"], ["الجمعة", "Friday"], ["السبت", "Saturday"],
      ["ر.س", "SAR"], ["عامل تركيب", "Installation Worker"], ["عامل دهان", "Painter"], ["عامل كهرباء", "Electrician"], ["عامل عام", "General Worker"],
      ["مشرف", "Supervisor"], ["مؤقت", "Temporary"], ["موسمي", "Seasonal"], ["جدة", "Jeddah"],
      ["آخر تحديث", "Last updated"], ["آخر يوم من الشهر", "Last day of the month"], ["صباحًا", "AM"],
      ["إعداد قواعد المطابقة والمعالجة", "Configure matching and resolution rules"],
      ["لا توجد استراحة غير مدفوعة خارج الجلسات.", "No unpaid break outside scheduled sessions."],
      ["الجمعة والسبت أيام الأسبوع غير العاملة.", "Friday and Saturday are non-working days."],
      ["دقيقة لبداية الدوام و15 دقيقة لنهايته.", "15 minutes at shift start and 15 minutes at shift end."],
      ["تتطلب المعالجة قبل اعتماد الفترة.", "Must be resolved before period approval."],
      ["بعد تجاوز مدة الدوام اليومية.", "After exceeding the scheduled daily hours."],
      ["بعد فترة السماح يتم احتساب التأخير.", "Late time is calculated after the grace period."],
      ["بعد فترة السماح يتم الخصم من رصيد الدوام.", "Time is deducted after the grace period."],
      ["تحدد قواعد احتساب الحضور والانصراف والمعالجات المتعلقة بالوقت.", "Defines attendance calculations and time-related handling."],
      ["إعداد وإدارة قواعد ومعايير احتساب الرواتب والمستحقات.", "Configure payroll calculation rules and entitlements."],
      ["العامل مرتبط بمجموعة معرض الرياض وجدول عمال المعرض وسياسة العمال المؤقتين.", "The worker is linked to the Riyadh Expo group, Expo Workers Schedule, and Temporary Workers Policy."],
      ["تحويل بنكي إلى حساب موثق، ودورة الدفع كل 10 أيام.", "Bank transfer to a verified account with a 10-day pay cycle."],
      ["سياسة الحضور للعمال المؤقتين وسياسة الرواتب الأساسية.", "Temporary Workers Attendance Policy and Base Payroll Policy."],
      ["تطبق هذه الإعدادات على جميع العمال المضافين ما لم تتم تجاوزها على مستوى العامل.", "These defaults apply to all assigned workers unless overridden at worker level."],
      ["ستطبق هذه الإعدادات على العمال المضافين للمجموعة ما لم يتم تحديد استثناء على مستوى العامل.", "These defaults apply to assigned workers unless a worker-level exception is set."],
      ["دفعة", "Payment"], ["غير مدفوع", "Unpaid"], ["إذن مدفوع", "Paid Permission"], ["إذن غير مدفوع", "Unpaid Permission"]
    ]);
    [...finalTerms.entries()].sort((a, b) => b[0].length - a[0].length).forEach(([arabic, english]) => {
      output = output.replaceAll(arabic, english);
    });
    output = output.replace(/[\u0600-\u06ff]+/g, "").replace(/\s{2,}/g, " ");
    return output;
  };
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach((node) => { node.nodeValue = translate(node.nodeValue); });
  document.querySelectorAll("[placeholder],[title],[aria-label]").forEach((element) => {
    ["placeholder", "title", "aria-label"].forEach((attribute) => {
      if (element.hasAttribute(attribute)) element.setAttribute(attribute, translate(element.getAttribute(attribute)));
    });
  });
  document.title = translate(document.title);

  const currentPage = location.pathname.split("/").pop();
  if (document.body.dataset.layoutDirection === "rtl") document.documentElement.dir = "rtl";
  const activeSection = {
    "s00-setup-dashboard.html": "dashboard",
    "s01-groups.html": "groups",
    "s02-group-details.html": "groups",
    "s06-assign-workers.html": "groups",
    "s05-workers.html": "workers",
    "s05-worker-profile.html": "workers",
    "s08-new-worker.html": "workers",
    "s12-new-contract.html": "workers",
    "s03-work-schedule.html": "schedules",
    "s09-new-schedule.html": "schedules",
    "s07-attendance-policies.html": "attendancePolicies",
    "s10-new-attendance-policy.html": "attendancePolicies",
    "s04-pay-rules.html": "payrollPolicies",
    "s11-new-pay-policy.html": "payrollPolicies"
  }[currentPage] || "dashboard";
  const sidebar = document.querySelector(".setup-sidebar");
  if (sidebar) {
    const active = (section) => section === activeSection ? " active" : "";
    sidebar.innerHTML = `
      <a class="setup-brand" href="s00-setup-dashboard.html">
        <span class="brand-mark" aria-hidden="true"></span>
        <span class="brand-word">TAMAM <span>Flex</span></span>
      </a>
      <nav class="setup-nav" aria-label="Main navigation">
        <div class="nav-group">
          <div class="nav-parent">
            <i class="bi bi-gear" aria-hidden="true"></i>
            <span>Setup</span>
            <i class="bi bi-chevron-up chevron" aria-hidden="true"></i>
          </div>
          <div class="nav-sub">
            <a class="nav-link${active("dashboard")}" href="s00-setup-dashboard.html"><i class="bi bi-grid-1x2"></i><span>System Setup Dashboard</span></a>
            <a class="nav-link${active("workers")}" href="s05-workers.html"><i class="bi bi-people"></i><span>Workers</span></a>
            <a class="nav-link${active("groups")}" href="s01-groups.html"><i class="bi bi-collection"></i><span>Groups</span></a>
            <a class="nav-link${active("schedules")}" href="s03-work-schedule.html"><i class="bi bi-calendar3"></i><span>Work Schedules</span></a>
            <a class="nav-link${active("attendancePolicies")}" href="s07-attendance-policies.html"><i class="bi bi-fingerprint"></i><span>Attendance Policies</span></a>
            <a class="nav-link${active("payrollPolicies")}" href="s04-pay-rules.html"><i class="bi bi-wallet2"></i><span>Payroll Policies</span></a>
          </div>
        </div>
        <a class="nav-section" href="a01-group-attendance.html"><i class="bi bi-calendar2-check"></i><span>Attendance</span><i class="bi bi-chevron-right"></i></a>
        <a class="nav-section" href="p01-open-payroll.html"><i class="bi bi-wallet2"></i><span>Payroll &amp; Closing</span><i class="bi bi-chevron-right"></i></a>
      </nav>
      <div class="sidebar-foot">
        <a href="#"><i class="bi bi-question-circle"></i><span>Help &amp; Support</span></a>
        <a href="#"><i class="bi bi-box-arrow-left"></i><span>Sign Out</span></a>
      </div>`;
  }

  const body = document.body;
  document.querySelectorAll("[data-sidebar-open]").forEach((button) => {
    button.addEventListener("click", () => body.classList.toggle("sidebar-open"));
  });

  document.querySelectorAll(".nav-parent").forEach((parent) => {
    parent.tabIndex = 0;
    parent.setAttribute("role", "button");
    parent.setAttribute("aria-expanded", "true");
    const toggle = () => {
      const submenu = parent.nextElementSibling;
      const open = !submenu.hidden;
      submenu.hidden = open;
      parent.setAttribute("aria-expanded", String(!open));
      parent.querySelector(".chevron")?.classList.toggle("bi-chevron-down", open);
      parent.querySelector(".chevron")?.classList.toggle("bi-chevron-up", !open);
    };
    parent.addEventListener("click", toggle);
    parent.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") toggle(); });
  });

  const page = location.pathname.split("/").pop();
  document.querySelectorAll("a").forEach((link) => {
    const label = link.textContent.trim();
    if (label.includes("New Worker")) link.href = "s08-new-worker.html";
    if (label.includes("New Contract")) link.href = "s12-new-contract.html";
    if (label.includes("New Work Schedule")) link.href = "s09-new-schedule.html";
  });
  if (page === "s05-workers.html") {
    const headings = document.querySelectorAll("#workers-table thead th");
    if (headings.length >= 8) {
      headings[3].textContent = "Group";
      headings[4].textContent = "Current Contract";
      headings[7].textContent = "Name";
    }
  }
  document.querySelectorAll("button").forEach((button) => {
    const label = button.textContent.trim();
    if (label.includes("New Worker")) button.addEventListener("click", () => location.href = "s08-new-worker.html");
    if (label.includes("New Schedule")) button.addEventListener("click", () => location.href = "s09-new-schedule.html");
    if (label.includes("New Policy") && page === "s04-pay-rules.html") button.addEventListener("click", () => location.href = "s11-new-pay-policy.html");
  });
  if (page === "s07-attendance-policies.html") {
    document.querySelector(".template-head .icon-btn")?.addEventListener("click", () => location.href = "s10-new-attendance-policy.html");
    const policyPanel = document.querySelector(".detail-panel");
    const policyGrid = policyPanel?.querySelector(".policy-grid");
    const lockCard = policyGrid?.nextElementSibling;
    const tabs = [...(policyPanel?.querySelectorAll(".tabs .tab") || [])];
    tabs.forEach((tab, index) => tab.addEventListener("click", (event) => {
      event.preventDefault(); tabs.forEach((item) => item.classList.remove("active")); tab.classList.add("active");
      if (index === 0) { policyGrid.hidden = false; lockCard.hidden = false; }
      if (index === 1) { policyGrid.hidden = true; lockCard.hidden = false; lockCard.innerHTML = '<h3>Policy Coverage</h3><div class="info-cards"><div><small>Workers</small><div class="focus-value">812</div><p>Workers with active temporary contracts</p></div><div><small>Groups</small><div class="focus-value">18</div><p>All active operational groups</p></div><div><small>Effective Date</small><div class="focus-value">May 10, 2026</div><p>Applies to new attendance periods</p></div></div>'; }
      if (index === 2) { policyGrid.hidden = true; lockCard.hidden = false; lockCard.innerHTML = '<h3>Change Log</h3><table class="setup-table"><thead><tr><th>Date</th><th>Changed By</th><th>Change</th></tr></thead><tbody><tr><td>May 10, 2026</td><td>Mohammed Ahmed</td><td>Late-arrival grace period updated to 15 minutes.</td></tr><tr><td>May 6, 2026</td><td>Sarah Ali</td><td>Missing-punch approval rule enabled.</td></tr></tbody></table>'; }
    }));
  }

  document.querySelectorAll("[data-filter-table]").forEach((form) => {
    const table = document.getElementById(form.dataset.filterTable);
    if (!table) return;
    const rows = [...table.querySelectorAll("tbody tr")];
    const counter = document.querySelector(`[data-count-for="${table.id}"]`);
    const apply = () => {
      const query = form.querySelector("[type=search]")?.value.trim().toLowerCase() || "";
      const filters = [...form.querySelectorAll("select")].filter((select) => select.value);
      let visible = 0;
      rows.forEach((row) => {
        const matchesQuery = !query || row.textContent.toLowerCase().includes(query);
        const matchesFilters = filters.every((select) => {
          const value = select.value.toLowerCase();
          return row.textContent.toLowerCase().includes(value) || row.dataset[select.dataset.field] === select.value;
        });
        row.classList.toggle("hidden-row", !(matchesQuery && matchesFilters));
        if (matchesQuery && matchesFilters) visible += 1;
      });
      if (counter) counter.textContent = `Showing ${visible} of ${rows.length}`;
    };
    form.addEventListener("input", apply);
    form.addEventListener("change", apply);
    form.addEventListener("reset", () => setTimeout(apply));
    apply();
  });

  document.querySelectorAll("[data-template]").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelectorAll("[data-template]").forEach((other) => other.classList.remove("active"));
      item.classList.add("active");
      document.querySelectorAll("[data-template-view]").forEach((view) => {
        view.hidden = view.dataset.templateView !== item.dataset.template;
      });
    });
  });

  document.querySelectorAll("[data-tab]").forEach((tab) => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();
      const scope = tab.closest("[data-tabs-scope]") || document;
      scope.querySelectorAll("[data-tab]").forEach((other) => other.classList.remove("active"));
      scope.querySelectorAll("[data-tab-panel]").forEach((panel) => panel.hidden = true);
      tab.classList.add("active");
      scope.querySelector(`[data-tab-panel="${tab.dataset.tab}"]`)?.removeAttribute("hidden");
    });
  });

  const moveRows = (sourceId, targetId) => {
    const source = document.querySelector(`#${sourceId} tbody`);
    const target = document.querySelector(`#${targetId} tbody`);
    if (!source || !target) return;
    source.querySelectorAll("input[type=checkbox]:checked").forEach((checkbox) => {
      checkbox.checked = false;
      target.appendChild(checkbox.closest("tr"));
    });
    refreshAssignmentCounts();
  };
  const refreshAssignmentCounts = () => {
    const available = document.querySelectorAll("#available-workers tbody tr").length;
    const assigned = document.querySelectorAll("#assigned-workers tbody tr").length;
    const availableCount = document.querySelector(".worker-pool:not(.assigned-pool) .pool-count");
    const assignedCount = document.querySelector(".assigned-pool .pool-count");
    const availableFooter = document.querySelector(".worker-pool:not(.assigned-pool) .worker-pool-footer>span");
    const assignedFooter = document.querySelector(".assigned-pool .worker-pool-footer>span");
    if (availableCount) availableCount.textContent = `${available} available`;
    if (assignedCount) assignedCount.textContent = `${assigned} shown`;
    if (availableFooter) availableFooter.textContent = `Showing ${available} available workers`;
    if (assignedFooter) assignedFooter.textContent = `Showing ${assigned} assigned workers`;
  };
  const bindWorkerSearch = (inputId, tableId) => {
    const input = document.getElementById(inputId);
    const rows = [...document.querySelectorAll(`#${tableId} tbody tr`)];
    input?.addEventListener("input", () => {
      const query = input.value.trim().toLowerCase();
      rows.forEach((row) => row.classList.toggle("hidden-row", query && !row.textContent.toLowerCase().includes(query)));
    });
  };
  bindWorkerSearch("available-search", "available-workers");
  bindWorkerSearch("assigned-search", "assigned-workers");
  document.querySelectorAll(".assignment-table thead input[type=checkbox]").forEach((selectAll) => {
    selectAll.addEventListener("change", () => {
      selectAll.closest("table").querySelectorAll("tbody input[type=checkbox]").forEach((checkbox) => { checkbox.checked = selectAll.checked; });
    });
  });
  document.querySelector("[data-assign-workers]")?.addEventListener("click", () => moveRows("available-workers", "assigned-workers"));
  document.querySelector("[data-remove-workers]")?.addEventListener("click", () => moveRows("assigned-workers", "available-workers"));

  document.querySelectorAll("[data-toast-message]").forEach((button) => {
    button.addEventListener("click", () => {
      const message = document.createElement("div");
      message.className = "position-fixed bottom-0 start-0 m-4 alert alert-success shadow";
      message.style.zIndex = "2000";
      message.textContent = button.dataset.toastMessage;
      document.body.appendChild(message);
      setTimeout(() => message.remove(), 2400);
    });
  });
});
