const navigationToggle = document.querySelector(".nav-toggle");
const primaryNavigation = document.querySelector("#primary-nav");

function setNavigationState(isOpen) {
  if (!navigationToggle || !primaryNavigation) {
    return;
  }

  navigationToggle.setAttribute("aria-expanded", String(isOpen));
  navigationToggle.setAttribute("title", isOpen ? "Close navigation" : "Open navigation");
  navigationToggle.querySelector(".sr-only").textContent = isOpen ? "Close navigation" : "Open navigation";
  primaryNavigation.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);

}

navigationToggle?.addEventListener("click", () => {
  const isOpen = navigationToggle.getAttribute("aria-expanded") !== "true";
  setNavigationState(isOpen);
});

primaryNavigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setNavigationState(false));
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 920) {
    setNavigationState(false);
  }
});

const topicTabs = Array.from(document.querySelectorAll("[data-topic]"));
const topicPanels = Array.from(document.querySelectorAll("[data-panel]"));

function activateTopic(topicName) {
  topicTabs.forEach((tab) => {
    const isActive = tab.dataset.topic === topicName;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
  });

  topicPanels.forEach((panel) => {
    const isActive = panel.dataset.panel === topicName;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
}

topicTabs.forEach((tab, tabIndex) => {
  tab.addEventListener("click", () => activateTopic(tab.dataset.topic));

  tab.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }

    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (tabIndex + direction + topicTabs.length) % topicTabs.length;
    const nextTab = topicTabs[nextIndex];
    activateTopic(nextTab.dataset.topic);
    nextTab.focus();
  });
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(".reveal");

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
}

const currentYear = document.querySelector("#current-year");
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

window.lucide?.createIcons({
  attrs: {
    "stroke-width": 1.8,
  },
});
