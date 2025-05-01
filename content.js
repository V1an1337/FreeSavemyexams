// By V1an1337
const originalSetItem = localStorage.setItem;

// Actually, the sync is never detected by this method
(() => {
  localStorage.setItem = function(key, value) {
    if (key === "SME.revision-note-views") {
      console.log("[Plugin] Blocked SME.revision-note-views set:", value);
    }
    return originalSetItem.apply(this, arguments);
  };
})();

// Storage sync? Fucked! (the sync mostly prevented by this method)
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
