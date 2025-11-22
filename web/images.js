// ===== CARGA DE ASSETS =====
function cargarAssets() {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = './assets/files-db.js';
    script.onload = () => {
      console.log('Assets:', assets.length);
      resolve();
    };
    script.onerror = () => {
      console.error('Error loading files :c');
      assets = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Bsodwindows10.png/1200px-Bsodwindows10.png"];
      resolve();
    };
    document.head.appendChild(script);
  });
}

// ===== VARIABLES =====
let bolas = [];
const minBolas = 20;
const maxBolas = 30;



// ===== FUNCIONES =====
function crearTexto() {
  const div = document.createElement("div");
  div.className = "texto-loco";
  if (!window.frases || window.frases.length === 0) return;
  div.innerText = window.frases[Math.floor(Math.random() * window.frases.length)];
  div.style.left = Math.random() * window.innerWidth + "px";
  div.style.top = Math.random() * window.innerHeight + "px";
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}

function crearBola(src) {
  const img = document.createElement("img");
  img.src = src;
  img.className = "soggy-img";
  img.style.opacity = "0.8";
  const size = 100 + Math.random() * 150;
  img.style.width = size + "px";
  document.body.appendChild(img);

  const bola = {
    el: img,
    x: Math.random() * (window.innerWidth - size),
    y: Math.random() * (window.innerHeight - size),
    vx: (Math.random() - 0.5) * 8,
    vy: (Math.random() - 0.5) * 8,
    size: size
  };
  bolas.push(bola);
}

function actualizarBolas() {
  const currentCount = bolas.length;

  if (currentCount < maxBolas && Math.random() < 0.6 && assets.length > 0) {
    const src = assets[Math.floor(Math.random() * assets.length)];
    crearBola(src);
  }

  if (currentCount > minBolas && Math.random() < 0.4) {
    const idx = Math.floor(Math.random() * bolas.length);
    const bola = bolas[idx];
    bola.el.remove();
    bolas.splice(idx, 1);
  }
}

function animar() {
  bolas.forEach(b => {
    b.x += b.vx;
    b.y += b.vy;
    if (b.x <= 0 || b.x + b.size >= window.innerWidth) b.vx *= -1;
    if (b.y <= 0 || b.y + b.size >= window.innerHeight) b.vy *= -1;
    b.el.style.left = b.x + "px";
    b.el.style.top = b.y + "px";
  });
  requestAnimationFrame(animar);
}

function boostBolasTemporales() {
  const boostAmount = 10;
  const tempBolas = [];

  for (let i = 0; i < boostAmount && assets.length > 0; i++) {
    const src = assets[Math.floor(Math.random() * assets.length)];
    const img = document.createElement("img");
    img.src = src;
    img.className = "soggy-img";
    img.style.opacity = "0.8";
    const size = 100 + Math.random() * 150;
    img.style.width = size + "px";
    document.body.appendChild(img);

    const bola = {
      el: img,
      x: Math.random() * (window.innerWidth - size),
      y: Math.random() * (window.innerHeight - size),
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      size: size
    };
    tempBolas.push(bola);
  }

  function animarBoost() {
    tempBolas.forEach(b => {
      b.x += b.vx;
      b.y += b.vy;
      if (b.x <= 0 || b.x + b.size >= window.innerWidth) b.vx *= -1;
      if (b.y <= 0 || b.y + b.size >= window.innerHeight) b.vy *= -1;
      b.el.style.left = b.x + "px";
      b.el.style.top = b.y + "px";
    });
    if (tempBolas.length) requestAnimationFrame(animarBoost);
  }

  animarBoost();

  setTimeout(() => {
    tempBolas.forEach(b => b.el.remove());
  }, 6000);
}

function loadingFunction() {
  const loading = document.getElementById("loadingIndicator");
  if (loading) {
    loading.style.transition = "opacity 0.5s ease";
    loading.style.opacity = "0";
    setTimeout(() => loading.remove(), 600);
  }
}

function cargarFrases() {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = './assets/text.js';
    script.onload = () => resolve();
    script.onerror = () => {
      console.error('Error cargando frases.js');
      window.frases = ["no se cargaron las frases", "algo de relleno"]; 
      resolve();
    };
    console.error('cargados los frases');
    document.head.appendChild(script);
  });
}

