// ===== CONFIG =====
let desktopMode = false; // Cambia a true para modo escritorio

// ===== AUDIO =====
let sonido; 
let canciones = [
  "./assets/songs/dreamland.mp3",
  "./assets/songs/itembounce.mp3",
  "./assets/songs/riders.mp3"
  // more...
];

let ultimaCancion = null;

// Seleccionar canción aleatoria evitando repetir la última
function escogerCancionRandom() {
  if (canciones.length === 0) return null;

  // random seguro, nunca cacheado
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);

  let index = array[0] % canciones.length;
  let candidata = canciones[index];

  // evitar repetir la misma si hay más de 1
  if (canciones.length > 1 && candidata === ultimaCancion) {
    index = (index + 1) % canciones.length;
    candidata = canciones[index];
  }

  ultimaCancion = candidata;
  return candidata;
}

function initAudio() {
  if (desktopMode) return;

  sonido = document.getElementById('bg-audio');
  if (!sonido) return;

  sonido.loop = false; // Ya no usamos loop, porque queremos cambiar de canción

  // Primera canción aleatoria
  const inicial = escogerCancionRandom();
  sonido.src = inicial;

  // Cuando termina → siguiente canción aleatoria
  sonido.addEventListener("ended", () => {
    const nueva = escogerCancionRandom();

    if (nueva) {
      sonido.src = nueva;

      sonido.volume = 0.8;
    }

    sonido.play().catch(e => console.log("No pudo reproducir nueva canción:", e));
  });

}

// ===== REPRODUCIR AL CLICK =====
function enableAudioOnClick() {
  if (desktopMode) return;

  function reproducir() {

  if (!sonido.src) {
    const inicial = escogerCancionRandom();
    sonido.src = inicial;

    // 🔥 Aplicar volumen desde la PRIMERA canción
    sonido.volume = 0.8;
  }

  sonido.play().catch(e => console.log("Autoplay bloqueado:", e));
  document.removeEventListener("click", reproducir);
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