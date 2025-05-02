// By V1an1337
const originalSetItem = localStorage.setItem;

// Block SME to set the value
(() => {
  localStorage.setItem = function(key, value) {
    if (key === "SME.revision-note-views") {
      console.log("[Plugin] Blocked SME.revision-note-views set:", value);
    }
    return originalSetItem.apply(this, arguments);
  };
})();

// Prevent Storage sync
window.addEventListener("storage", (event) => {
  if (event.key === "SME.revision-note-views") {
    console.log("[Plugin] Storage sync detected, clearing...");
    originalSetItem.call(localStorage, "SME.revision-note-views", "");
  }
});

// Brute force for insurance
setInterval(() => {
  originalSetItem.call(localStorage, "SME.revision-note-views", "");
}, 500);
