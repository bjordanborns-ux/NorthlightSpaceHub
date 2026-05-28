const PROJECTS = [
  {
    id: "telemetry-dashboard",
    title: "Telemetry & Command Dashboard (Sim)",
    subtitle: "Mission-control style dashboard for rapid state awareness and safe command composition.",
    category: "ground",
    tags: ["Ground systems", "UI/UX", "Real-time", "Safety"],
    badge: "Operator UI",
    time: "2–4 weeks",
    overview:
      "Designed a mission-control dashboard for a simulated spacecraft to monitor key state vectors, health flags, and trend telemetry, then draft commands with validation and clear operator feedback.",
    built: [
      "Live telemetry panels with “signal vs noise” prioritization and readable units",
      "Command composer with input validation and “are you sure?” guardrails",
      "Event log with timestamps and quick filters",
      "Exportable snapshots for post-pass review",
    ],
    ops: [
      "Designed for fast scanning: consistent layout, stable numbers, and clear status affordances",
      "Validation to prevent common operator errors (range checks, missing parameters)",
      "Failure-mode thinking: what happens when data drops, stalls, or spikes",
    ],
    next: [
      "Add role-based command permissions and audit trails",
      "Add alerting thresholds with debounce and acknowledgement workflow",
      "Add “playback mode” to review past telemetry sessions",
    ],
    tech: ["TypeScript", "WebSockets (or polling)", "Charting", "Testing"],
    links: [
      { title: "Repo", sub: "Replace with GitHub link", href: "#" },
      { title: "Demo", sub: "Replace with deployed demo link", href: "#" },
    ],
    highlights: [
      { k: "Goal", v: "Reduce cognitive load" },
      { k: "Design", v: "High-contrast ops UI" },
      { k: "Safety", v: "Command guardrails" },
    ],
  },
  {
    id: "pass-planner",
    title: "Ground Station Pass Planning Tool",
    subtitle: "Compute and visualize pass windows, handovers, and operator checklists.",
    category: "planning",
    tags: ["Planning", "Visualization", "Constraints", "Automation"],
    badge: "Planning",
    time: "1–3 weeks",
    overview:
      "Built a planning utility to generate pass schedules and handover notes, turning orbital/visibility data into operator-ready timelines and checklists.",
    built: [
      "Pass window list with local time zones and a clean timeline view",
      "Operator checklist templates: pre-pass / on-pass / post-pass actions",
      "Conflict checks for overlapping passes and staffing constraints",
      "Export formats (CSV/PDF-friendly) for sharing",
    ],
    ops: [
      "Time correctness: explicit time zones, rounding rules, and clear epoch references",
      "Designed outputs that map directly to what an operator needs during a shift",
      "“Human-in-the-loop”: makes planning easy to verify before execution",
    ],
    next: [
      "Integrate station availability calendars and staffing rotations",
      "Add uncertainty margins for TLE/propagation variability",
      "Add automated “handover brief” generation",
    ],
    tech: ["Python", "CSV/ICS", "Plotting", "CLI + Web"],
    links: [
      { title: "Repo", sub: "Replace with GitHub link", href: "#" },
      { title: "Writeup", sub: "Replace with blog/notion link", href: "#" },
    ],
    highlights: [
      { k: "Output", v: "Operator-ready schedule" },
      { k: "Constraints", v: "Conflicts & margins" },
      { k: "Share", v: "Exports" },
    ],
  },
  {
    id: "timeline-checker",
    title: "Mission Timeline Constraint Checker",
    subtitle: "Validate sequences against rules (power, comms, thermal, pointing) and surface actionable errors.",
    category: "automation",
    tags: ["Automation", "Rules", "Testing", "Reliability"],
    badge: "Validation",
    time: "1–2 weeks",
    overview:
      "Created a rule-based validator that scans planned timelines for constraint violations and generates readable, actionable findings so planners can fix issues quickly.",
    built: [
      "Rule engine for constraint checks (ordering, minimum gaps, mutually exclusive modes)",
      "Human-readable findings with line references and suggested fixes",
      "Test suite of edge cases and regression scenarios",
      "Structured output for CI and report generation",
    ],
    ops: [
      "Prioritizes actionable errors: what broke, why it matters, and how to correct",
      "Deterministic results: same input yields same findings",
      "Designed for integration into planning workflows and CI checks",
    ],
    next: [
      "Add partial auto-fixes and “what-if” simulation",
      "Add visualization overlay to show violations in a timeline view",
      "Add severity scoring aligned to mission risk",
    ],
    tech: ["Python", "Rule engine", "JSON", "CI"],
    links: [
      { title: "Repo", sub: "Replace with GitHub link", href: "#" },
      { title: "Tests", sub: "Link to a test report or badge", href: "#" },
    ],
    highlights: [
      { k: "Impact", v: "Catch issues pre-flight" },
      { k: "Output", v: "Actionable findings" },
      { k: "Quality", v: "Regression tests" },
    ],
  },
];

function qs(sel, el = document) {
  const node = el.querySelector(sel);
  if (!node) throw new Error(`Missing element: ${sel}`);
  return node;
}

function qsa(sel, el = document) {
  return Array.from(el.querySelectorAll(sel));
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderProjectCard(p) {
  const tags = p.tags
    .slice(0, 4)
    .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
    .join("");

  return `
    <article class="project" role="button" tabindex="0" aria-label="Open details for ${escapeHtml(p.title)}" data-id="${escapeHtml(
      p.id,
    )}" data-category="${escapeHtml(p.category)}" data-glass>
      <div class="project-head">
        <div>
          <h3 class="project-title">${escapeHtml(p.title)}</h3>
          <p class="project-subtitle">${escapeHtml(p.subtitle)}</p>
        </div>
        <span class="badge">${escapeHtml(p.badge)}</span>
      </div>
      <div class="project-tags">${tags}</div>
      <div class="project-footer">
        <span class="muted">${escapeHtml(p.time)}</span>
        <span class="muted">Open details →</span>
      </div>
    </article>
  `;
}

function renderProjects(filter) {
  const grid = qs("#project-grid");
  const normalized = filter || "all";
  const filtered = normalized === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === normalized);

  grid.innerHTML = filtered.map(renderProjectCard).join("");
}

function setActiveChip(filter) {
  qsa(".chip").forEach((btn) => {
    const isActive = btn.dataset.filter === filter;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });
}

function openProjectModal(id) {
  const modal = qs("#project-modal");
  const p = PROJECTS.find((x) => x.id === id);
  if (!p) return;

  qs("#modal-title").textContent = p.title;
  qs("#modal-subtitle").textContent = p.subtitle;
  qs("#modal-overview").textContent = p.overview;

  const bullets = qs("#modal-bullets");
  bullets.innerHTML = p.built.map((x) => `<li>${escapeHtml(x)}</li>`).join("");

  const ops = qs("#modal-ops");
  ops.innerHTML = p.ops.map((x) => `<li>${escapeHtml(x)}</li>`).join("");

  const next = qs("#modal-next");
  next.innerHTML = p.next.map((x) => `<li>${escapeHtml(x)}</li>`).join("");

  const tech = qs("#modal-tech");
  tech.innerHTML = p.tech.map((x) => `<span class="tag">${escapeHtml(x)}</span>`).join("");

  const links = qs("#modal-links");
  links.innerHTML = p.links
    .map(
      (l) => `
        <a class="link-item" href="${escapeHtml(l.href)}" ${l.href === "#" ? 'aria-disabled="true"' : ""}>
          <span class="link-title">${escapeHtml(l.title)}</span>
          <span class="link-sub">${escapeHtml(l.sub)}</span>
        </a>
      `,
    )
    .join("");

  const highlights = qs("#modal-highlights");
  highlights.innerHTML = p.highlights
    .map(
      (h) => `
        <div class="highlight">
          <p class="highlight-k">${escapeHtml(h.k)}</p>
          <p class="highlight-v">${escapeHtml(h.v)}</p>
        </div>
      `,
    )
    .join("");

  if (typeof modal.showModal === "function") {
    modal.showModal();
  } else {
    modal.setAttribute("open", "true");
  }
}

function closeProjectModal() {
  const modal = qs("#project-modal");
  if (typeof modal.close === "function") modal.close();
  else modal.removeAttribute("open");
}

function installProjectInteractions() {
  const grid = qs("#project-grid");

  grid.addEventListener("click", (e) => {
    const card = e.target?.closest?.(".project");
    if (!card) return;
    openProjectModal(card.dataset.id);
  });

  grid.addEventListener("keydown", (e) => {
    const isEnter = e.key === "Enter";
    const isSpace = e.key === " ";
    if (!isEnter && !isSpace) return;

    const card = e.target?.closest?.(".project");
    if (!card) return;
    e.preventDefault();
    openProjectModal(card.dataset.id);
  });

  qs("#modal-close").addEventListener("click", closeProjectModal);

  const modal = qs("#project-modal");
  modal.addEventListener("click", (e) => {
    const inner = qs(".modal-inner", modal);
    if (!inner.contains(e.target)) closeProjectModal();
  });
}

function installFilters() {
  qsa(".chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter || "all";
      setActiveChip(filter);
      renderProjects(filter);
    });
  });
}

function installContactForm() {
  const form = qs("#contact-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);

    const name = String(fd.get("name") || "").trim();
    const team = String(fd.get("team") || "").trim();
    const message = String(fd.get("message") || "").trim();

    const subject = `Portfolio inquiry${team ? ` — ${team}` : ""}`;
    const body = [
      `Hi, my name is ${name}.`,
      "",
      message,
      "",
      "—",
      "Sent from your portfolio site",
    ].join("\n");

    const to = "you@example.com";
    const href = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  });
}

function main() {
  qs("#year").textContent = String(new Date().getFullYear());

  renderProjects("all");
  setActiveChip("all");

  installProjectInteractions();
  installFilters();
  installContactForm();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}

