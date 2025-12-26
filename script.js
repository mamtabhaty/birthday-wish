const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);
function drawText(){
    ctx.textAlign = "center";
}
  
let t = 0;
let hue = 0;
let beat = 1;
let beatDir = 1;
let showText = false;
let wave = 0;

const particles = [];

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.life = 50;
    this.color = color;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

function heartPoint(i, scale) {
  const x = 16 * Math.pow(Math.sin(i), 3);
  const y =
    13 * Math.cos(i) -
    5 * Math.cos(2 * i) -
    2 * Math.cos(3 * i) -
    Math.cos(4 * i);

  return {
    x: canvas.width / 2 + x * scale,
    y: canvas.height / 2 - y * scale
  };
}

function drawText() {
  ctx.textAlign = "center";

  // 🌈 Happy Birthday – slow color wave
  wave += 0.01;

  const grad1 = ctx.createLinearGradient(
    canvas.width / 2 - 180, 0,
    canvas.width / 2 + 180, 0
  );

  grad1.addColorStop(0, `hsl(${(wave * 50) % 360},100%,70%)`);
  grad1.addColorStop(0.5, `hsl(${(wave * 50 + 120) % 360},100%,70%)`);
  grad1.addColorStop(1, `hsl(${(wave * 50 + 240) % 360},100%,70%)`);

  ctx.font = "bold 36px Arial";
  ctx.fillStyle = grad1;
  ctx.shadowBlur = 30;
  ctx.shadowColor = "white";
  ctx.fillText("🎂 Happy Birthday 🎂",
    canvas.width / 2,
    canvas.height / 2 - 160
  );

  // 💖 I Love You
  ctx.font = "bold 36px Arial";
  ctx.fillStyle = "#ff4fd8";
  ctx.shadowBlur = 25;
  ctx.shadowColor = "#ff4fd8";
  ctx.fillText("💖 I Love You 💖",
    canvas.width / 2,
    canvas.height / 2 + 170
  );

  // ✨ Bottom text
  ctx.font = "24px Arial";
  ctx.fillStyle = `hsl(${(wave * 40) % 360},100%,75%)`;
  ctx.shadowBlur = 20;
  ctx.shadowColor = "pink";
  ctx.fillText("Will you be mine forever?",
    canvas.width / 2,
    canvas.height / 2 + 215
  );
}


function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 💓 Heart Beat
  beat += 0.005 * beatDir;
  if (beat > 1.1 || beat < 0.95) beatDir *= -1;

  const scale = Math.min(canvas.width, canvas.height) / 55 * beat;

  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.strokeStyle = `hsl(${hue},100%,70%)`;
  ctx.shadowBlur = 30;
  ctx.shadowColor = `hsl(${hue},100%,70%)`;

  for (let i = 0; i < t; i += 0.03) {
    const p = heartPoint(i, scale);
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);

    particles.push(new Particle(p.x, p.y, `hsl(${hue},100%,70%)`));
  }

  ctx.stroke();

  particles.forEach((p, i) => {
    p.update();
    p.draw();
    if (p.life <= 0) particles.splice(i, 1);
  });

  t += 0.03;
  hue += 1;

  if (t >= Math.PI * 2) {
    showText = true;
  }

  if (showText) drawText();

  requestAnimationFrame(animate);
}

animate();
function drawText() {
  ctx.textAlign = "center";

  // 🌈 Happy Birthday (Colorful Neon)
  const grad1 = ctx.createLinearGradient(
    canvas.width / 2 - 150, 0,
    canvas.width / 2 + 150, 0
  );
  grad1.addColorStop(0, "#ff0080");
  grad1.addColorStop(0.5, "#ffea00");
  grad1.addColorStop(1, "#00f2ff");

  ctx.font = "bold 34px Arial";
  ctx.fillStyle = grad1;
  ctx.shadowBlur = 30;
  ctx.shadowColor = "#ff4fd8";
  ctx.fillText(
    "🎂 Happy Birthday 🎂",
    canvas.width / 2,
    canvas.height / 2 - 160
  );

  // 💖 I Love You (Pink Neon)
  ctx.font = "bold 36px Arial";
  ctx.fillStyle = "#ff4fd8";
  ctx.shadowBlur = 25;
  ctx.shadowColor = "#ff4fd8";
  ctx.fillText(
    "💖 I Love You 💖",
    canvas.width / 2,
    canvas.height / 2 + 170
  );

  // ✨ Bottom text (Soft colorful glow)
  const grad2 = ctx.createLinearGradient(
    canvas.width / 2 - 120, 0,
    canvas.width / 2 + 120, 0
  );
  grad2.addColorStop(0, "#00f2ff");
  grad2.addColorStop(1, "#a855f7");

  ctx.font = "24px Arial";
  ctx.fillStyle = grad2;
  ctx.shadowBlur = 20;
  ctx.shadowColor = "#a855f7";
  ctx.fillText(
    "Will you be mine forever?",
    canvas.width / 2,
    canvas.height / 2 + 215
  );
}

