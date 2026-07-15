export class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = [];
    this.allowedKeys = new Set([
      "ArrowDown",
      "ArrowUp",
      "ArrowLeft",
      "ArrowRight",
      "Enter",
    ]);
    this.activePointers = new Map();

    this.addKeyboardControls();
    this.addTouchControls();
  }

  // Agrega una tecla una sola vez. / Add a key only once.
  pressKey(key) {
    if (this.allowedKeys.has(key) && !this.keys.includes(key)) {
      this.keys.push(key);
    }
  }

  // Retira la tecla de forma segura. / Safely release a key.
  releaseKey(key) {
    const keyIndex = this.keys.indexOf(key);
    if (keyIndex !== -1) this.keys.splice(keyIndex, 1);
  }

  addKeyboardControls() {
    window.addEventListener("keydown", (event) => {
      if (this.allowedKeys.has(event.key)) {
        event.preventDefault();
        this.pressKey(event.key);
      } else if (event.key.toLowerCase() === "d") {
        this.game.debug = !this.game.debug;
      }
    });

    window.addEventListener("keyup", (event) => {
      if (this.allowedKeys.has(event.key)) {
        event.preventDefault();
        this.releaseKey(event.key);
      }
    });
  }

  addTouchControls() {
    const buttons = document.querySelectorAll("[data-key]");

    buttons.forEach((button) => {
      const key = button.dataset.key;

      button.addEventListener("pointerdown", (event) => {
        event.preventDefault();

        if (button.setPointerCapture) {
          button.setPointerCapture(event.pointerId);
        }

        this.activePointers.set(event.pointerId, key);
        this.pressKey(key);
        button.classList.add("is-active");
      });

      const releasePointer = (event) => {
        const activeKey = this.activePointers.get(event.pointerId);
        if (!activeKey) return;

        this.activePointers.delete(event.pointerId);

        // Permite mantener una acción si otro dedo sigue presionándola.
        // Keep the action active if another finger is still holding it.
        if (![...this.activePointers.values()].includes(activeKey)) {
          this.releaseKey(activeKey);
        }

        button.classList.remove("is-active");
      };

      button.addEventListener("pointerup", releasePointer);
      button.addEventListener("pointercancel", releasePointer);
      button.addEventListener("lostpointercapture", releasePointer);
      button.addEventListener("contextmenu", (event) => event.preventDefault());
    });

    // Evita que una acción quede presionada al cambiar de aplicación.
    // Prevent stuck controls when the app loses focus.
    window.addEventListener("blur", () => {
      this.keys.length = 0;
      this.activePointers.clear();
      buttons.forEach((button) => button.classList.remove("is-active"));
    });
  }
}
