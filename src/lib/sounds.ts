// Mystical sound effects using Web Audio API
const audioCtx = () => new (window.AudioContext || (window as any).webkitAudioContext)();

let ctx: AudioContext | null = null;

function getCtx() {
  if (!ctx) ctx = audioCtx();
  return ctx;
}

function playTone(freq: number, duration: number, type: OscillatorType = "sine", volume = 0.15, delay = 0) {
  const c = getCtx();
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, c.currentTime + delay);
  gain.gain.setValueAtTime(0, c.currentTime + delay);
  gain.gain.linearRampToValueAtTime(volume, c.currentTime + delay + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + delay + duration);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(c.currentTime + delay);
  osc.stop(c.currentTime + delay + duration);
}

export function playSelectSound() {
  // Soft chime when hovering/selecting a card
  playTone(523, 0.2, "sine", 0.08);
  playTone(659, 0.15, "sine", 0.06, 0.05);
}

export function playFlipSound() {
  // Mystical reveal: ascending ethereal tones
  playTone(261, 0.4, "sine", 0.12);
  playTone(329, 0.4, "sine", 0.1, 0.1);
  playTone(392, 0.5, "sine", 0.1, 0.2);
  playTone(523, 0.6, "sine", 0.12, 0.35);
  playTone(659, 0.8, "triangle", 0.08, 0.5);
  // Shimmer
  playTone(1046, 0.3, "sine", 0.04, 0.6);
  playTone(1318, 0.3, "sine", 0.03, 0.7);
}

export function playResetSound() {
  // Soft descending tone
  playTone(392, 0.2, "sine", 0.06);
  playTone(329, 0.2, "sine", 0.05, 0.08);
  playTone(261, 0.3, "sine", 0.04, 0.16);
}
