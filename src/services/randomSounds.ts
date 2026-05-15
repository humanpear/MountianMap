let audioContext: AudioContext | null = null;

function getAudioContext() {
  if (typeof window === 'undefined') {
    return null;
  }

  const AudioContextConstructor =
    window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

  if (!AudioContextConstructor) {
    return null;
  }

  audioContext ??= new AudioContextConstructor();
  return audioContext;
}

function playTone(frequency: number, startTime: number, duration: number, volume: number, type: OscillatorType) {
  const context = getAudioContext();
  if (!context) {
    return;
  }

  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startTime);
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.02);
}

export function playRouletteTick(step: number) {
  const context = getAudioContext();
  if (!context) {
    return;
  }

  void context.resume();
  playTone(640 + (step % 6) * 45, context.currentTime, 0.055, 0.055, 'square');
}

export function playFanfare() {
  const context = getAudioContext();
  if (!context) {
    return;
  }

  void context.resume();

  const now = context.currentTime;
  const notes = [
    { frequency: 523.25, offset: 0 },
    { frequency: 659.25, offset: 0.09 },
    { frequency: 783.99, offset: 0.18 },
    { frequency: 1046.5, offset: 0.32 },
    { frequency: 1318.51, offset: 0.32 }
  ];

  notes.forEach(({ frequency, offset }) => {
    playTone(frequency, now + offset, 0.22, 0.07, 'triangle');
  });
}
