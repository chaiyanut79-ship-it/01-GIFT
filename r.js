const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cake = document.getElementById("cake");
const instruction = document.getElementById("instruction");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --- Matrix Setup ---
const matrixLetters = "HAPPYBIRTHDAY";
const fontSize = 18;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

let matrixActive = true; 
let fireworksActive = false;
let fireworks = [];

function createFirework() {
  fireworks.push({
    x: Math.random() * canvas.width,
    y: canvas.height,
    targetY: Math.random() * (canvas.height / 2.5),
    exploded: false,
    particles: []
  });
}

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (matrixActive) {
    ctx.fillStyle = "#FF69B4";
    ctx.font = `bold ${fontSize}px arial`;
    for (let i = 0; i < drops.length; i++) {
      const char = matrixLetters[Math.floor(Math.random() * matrixLetters.length)];
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  if (fireworksActive) {
    fireworks.forEach((f) => {
      if (!f.exploded) {
        f.y -= 5;
        ctx.fillStyle = "white";
        ctx.fillRect(f.x, f.y, 3, 3);
        if (f.y <= f.targetY) {
          f.exploded = true;
          for (let i = 0; i < 50; i++) {
            f.particles.push({
              x: f.x, y: f.y,
              dx: (Math.random() - 0.5) * 7,
              dy: (Math.random() - 0.5) * 7,
              color: `hsl(${Math.random() * 360}, 100%, 60%)`
            });
          }
        }
      }
      f.particles.forEach((p) => {
        p.x += p.dx; p.y += p.dy; p.dy += 0.08;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 2, 2);
      });
    });
  }
  requestAnimationFrame(animate);
}

animate();

// --- Timing ---
setTimeout(() => { matrixActive = false; }, 4000); // 4 วิ ลายน้ำหยุด

setTimeout(() => {
    fireworksActive = true;
    cake.classList.add("show"); // เค้กเด้ง
    instruction.classList.add("show"); // ข้อความเด้ง
    
    let count = 0;
    let interval = setInterval(() => {
        createFirework();
        count++;
        if (count > 20) clearInterval(interval);
    }, 600);
}, 5000); // 5 วิ พลุมา

cake.onclick = () => { window.location.href = "wish.html"; };

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});