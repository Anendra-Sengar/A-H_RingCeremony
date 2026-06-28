/**
 * Custom Web Audio API synthesizer for premium audio effects.
 * This guarantees audio feedback even if the user's local .mp3 assets are missing.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    // Create audio context
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays a realistic, resonant temple bell sound using FM/additive synthesis.
 * Simulates a large bronze bell with multiple metallic partials and a long decay.
 */
export function playTempleBellFallback() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Primary bell frequencies (non-harmonic partials for metallic sound)
    const partials = [
      { freq: 240, gain: 0.8, decay: 4 },  // Fundamental
      { freq: 380, gain: 0.6, decay: 3 },  // Minor third-ish
      { freq: 540, gain: 0.4, decay: 2 },  // Quint
      { freq: 770, gain: 0.3, decay: 1.5 },// Nominal
      { freq: 940, gain: 0.2, decay: 1 },  // Superius
      { freq: 1200, gain: 0.15, decay: 0.5 }
    ];

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.5, now + 0.02); // quick attack
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 5); // slow decay
    masterGain.connect(ctx.destination);

    // Bandpass filter to warm the sound
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(500, now);
    filter.Q.setValueAtTime(1, now);
    filter.connect(masterGain);

    partials.forEach((p) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(p.freq, now);

      // Add a slight frequency modulation for pitch sway
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 4; // 4Hz pitch drift
      lfoGain.gain.value = p.freq * 0.005; // 0.5% drift

      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      // Decays individual partials at different rates
      oscGain.gain.setValueAtTime(p.gain, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + p.decay);

      osc.connect(oscGain);
      oscGain.connect(filter);

      lfo.start(now);
      osc.start(now);

      lfo.stop(now + p.decay + 0.1);
      osc.stop(now + p.decay + 0.1);
    });

  } catch (error) {
    console.warn("Failed to play synthesized temple bell:", error);
  }
}

/**
 * Plays a magical celebration sound (a rapid sparkling arpeggio of chimes).
 */
export function playCelebrationSoundFallback() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Major pentatonic scale notes to play in sequence
    const baseFreq = 523.25; // C5
    const multipliers = [1.0, 1.125, 1.25, 1.5, 1.6875, 2.0, 2.25, 2.5, 3.0]; // C5, D5, E5, G5, A5, C6, D6, E6, G6
    
    multipliers.forEach((mult, index) => {
      const noteTime = now + index * 0.08; // staggered times for arpeggio
      const freq = baseFreq * mult;
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, noteTime);
      
      // Add vibrato
      const vibrato = ctx.createOscillator();
      const vibratoGain = ctx.createGain();
      vibrato.frequency.value = 8;
      vibratoGain.gain.value = freq * 0.01;
      vibrato.connect(vibratoGain);
      vibratoGain.connect(osc.frequency);
      
      gainNode.gain.setValueAtTime(0, noteTime);
      gainNode.gain.linearRampToValueAtTime(0.15, noteTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, noteTime + 1.2);
      
      osc.connect(gainNode);
      
      // Add highpass filter to make it sound sparkling and clean
      const hpFilter = ctx.createBiquadFilter();
      hpFilter.type = "highpass";
      hpFilter.frequency.setValueAtTime(1000, noteTime);
      
      gainNode.connect(hpFilter);
      hpFilter.connect(ctx.destination);
      
      vibrato.start(noteTime);
      osc.start(noteTime);
      
      vibrato.stop(noteTime + 1.3);
      osc.stop(noteTime + 1.3);
    });

  } catch (error) {
    console.warn("Failed to play synthesized celebration sound:", error);
  }
}

/**
 * Attempts to play an audio file, falling back to Web Audio API synthesizer.
 */
export async function playSound(url: string, type: "bell" | "celebration") {
  try {
    const audio = new Audio(url);
    audio.volume = 0.5;
    await audio.play();
  } catch (e) {
    // If loading files fails (common when assets don't exist yet or autoplay blocks),
    // trigger Web Audio API synthesizers
    if (type === "bell") {
      playTempleBellFallback();
    } else {
      playCelebrationSoundFallback();
    }
  }
}
