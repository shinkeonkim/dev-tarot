import html2canvas from "html2canvas";

export async function captureCardImage(element: HTMLDivElement): Promise<Blob> {
  const scale = Math.max(2, Math.min(3, window.devicePixelRatio || 1));

  const canvas = await html2canvas(element, {
    backgroundColor: "#0d0a18",
    scale,
    useCORS: true,
    logging: false,
  });

  const ctx = canvas.getContext("2d");
  if (ctx) {
    const w = canvas.width;
    const h = canvas.height;

    const gradient = ctx.createLinearGradient(0, h - 80, 0, h);
    gradient.addColorStop(0, "rgba(13, 10, 24, 0)");
    gradient.addColorStop(1, "rgba(13, 10, 24, 0.85)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, h - 80, w, 80);

    ctx.font = "bold 24px 'JetBrains Mono', monospace";
    ctx.fillStyle = "rgba(204, 163, 59, 0.7)";
    ctx.textAlign = "left";
    ctx.fillText("✦ DevTarot", 20, h - 24);

    const today = new Date();
    const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;
    ctx.font = "16px 'JetBrains Mono', monospace";
    ctx.fillStyle = "rgba(204, 163, 59, 0.5)";
    ctx.textAlign = "right";
    ctx.fillText(dateStr, w - 20, h - 26);
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Failed to create blob"));
    }, "image/png");
  });
}

export function downloadBlob(blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `devtarot-${new Date().toISOString().split("T")[0]}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
