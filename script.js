const video = document.getElementById("video");
const canvas = document.getElementById("frameCanvas");
const ctx = canvas.getContext("2d");
const captureBtn = document.getElementById("captureBtn");
const downloadBtn = document.getElementById("downloadBtn");

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => { video.srcObject = stream; })
  .catch(err => {
    console.error("Gagal akses kamera:", err);
    alert("Izinkan kamera di browser agar bisa dipakai!");
  });

let slot = 0;

function drawFrame() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#4a90e2";
  ctx.lineWidth = 4;

  for (let i = 0; i < 3; i++) {
    ctx.strokeRect(35, 20 + i * 290, 230, 230);
  }

  ctx.fillStyle = "#4a90e2";
  ctx.font = "bold 18px Poppins";
  ctx.textAlign = "center";
  ctx.fillText("Mini Photobooth", canvas.width / 2, 880);
}

drawFrame();

captureBtn.addEventListener("click", () => {
  if (slot < 3) {
    ctx.save();
    ctx.translate(35 + 230, 0); 
    ctx.scale(-1, 1); 
    ctx.drawImage(video, 0, 20 + slot * 290, 230, 230); 
    ctx.restore();

    slot++;
    if (slot === 3) {
      downloadBtn.disabled = false;
    }
  } else {
    alert("Semua slot sudah terisi! Klik Download atau refresh untuk ulang.");
  }
});

downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "photobooth-mini.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});