// ===== CONFIG =====
let desktopMode = false; // Cambia a true para modo escritorio

// ===== AUDIO =====
let sonido; // Referencia al <audio> de HTML

function initAudio() {
  if (desktopMode) return;

  // Obtener el audio del HTML
  sonido = document.getElementById('bg-audio');
  if (!sonido) return;

  sonido.src = './assets/kirby.mp3';
  sonido.volume = 0.8;
  sonido.loop = true;

  // Escuchar si se pausa y reactivar
  sonido.addEventListener('pause', () => {
    console.log('Audio pausado, reintentando...');
    sonido.play().catch(e => console.log("No se pudo reactivar:", e));
  });

  // Reiniciar si termina (por seguridad)
  sonido.addEventListener('ended', () => sonido.play());
}

function enableAudioOnClick() {
  if (desktopMode) return; // No reproducir en desktopMode

  function reproducir() {
    if (sonido) {
      sonido.play().catch(e => console.log("Autoplay bloqueado:", e));
      document.removeEventListener("click", reproducir);
    }
  }

  document.addEventListener("click", reproducir);
}

// ===== VIDEO / IMAGEN =====
function setupBackground() {
  const video = document.getElementById("bg-video");

  if (desktopMode) {
    // Mostrar solo background CSS
    document.body.classList.add("desktop-background");

    // Ocultar el video
    if (video) video.style.display = "none";
  } else {
    // Ocultar el background CSS
    document.body.classList.remove("desktop-background");

    // Mostrar y configurar el video
    if (video) {
      video.style.display = "block";
      Object.assign(video.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: "-1"
      });
    }
  }
}

// ===== REPRODUCIR AUDIO AL CLICK =====
function enableAudioOnClick() {
  if (desktopMode) return; // No reproducir en desktopMode

  function reproducir() {
    if (sonido) {
      sonido.play().catch(e => console.log("Autoplay bloqueado:", e));
      document.removeEventListener("click", reproducir);
    }
  }

  document.addEventListener("click", reproducir);
}
