export class AudioSynthEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: any = null;
  private analyser: AnalyserNode | null = null;
  private gainNode: GainNode | null = null;
  private tempo: number = 120; // BPM
  private beatDuration: number = 60 / 120; // Duration of one beat in seconds
  private currentBeat: number = 0;

  // Melody pattern (Moroccan minor pentatonic scale feel)
  // E-flat minor / Phrygian vibes: Eb, Gb, Ab, Bb, Db
  private melodyFreqs: number[] = [155.56, 185.00, 207.65, 233.08, 277.18, 311.13, 369.99, 415.30];

  constructor() {}

  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  public init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    this.ctx = new AudioContextClass();
    
    // Create nodes
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 64;
    
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.12, this.ctx.currentTime); // Low volume background default
    
    // Connect nodes
    this.gainNode.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);
  }

  public setVolume(volume: number) {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);
    }
  }

  public async start() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    if (this.isPlaying) return;
    this.isPlaying = true;
    this.currentBeat = 0;

    // Start scheduler loop
    let nextNoteTime = this.ctx.currentTime;
    const scheduleAheadTime = 0.1; // How far ahead to schedule audio (secs)
    const lookahead = 25.0; // How frequently to call scheduler (ms)

    const scheduler = () => {
      while (nextNoteTime < this.ctx!.currentTime + scheduleAheadTime) {
        this.scheduleBeat(this.currentBeat, nextNoteTime);
        nextNoteTime += this.beatDuration / 2; // 8th notes
        this.currentBeat = (this.currentBeat + 1) % 16;
      }
      if (this.isPlaying) {
        this.intervalId = setTimeout(scheduler, lookahead);
      }
    };

    scheduler();
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
  }

  // Synthesize instruments on-the-fly
  private scheduleBeat(beat: number, time: number) {
    if (!this.ctx || !this.gainNode) return;

    // 1. KICK DRUM - Standard House beat on 0, 4, 8, 12
    if (beat % 4 === 0) {
      this.playKick(time);
    }

    // 2. HI-HATS - Offbeats on 2, 6, 10, 14
    if (beat % 4 === 2) {
      this.playHat(time, 0.05);
    }
    // Sub-hats
    if (beat % 2 === 1 && Math.random() > 0.4) {
      this.playHat(time, 0.02);
    }

    // 3. MOROCCAN CLAP / SNARE - Beats 4, 12 (with a slight delay pattern simulating Dakka)
    if (beat === 4 || beat === 12) {
      this.playSnare(time);
      // Double clap effect for organic festival feel
      this.playSnare(time + 0.06);
    }

    // 4. CHORD PAD / AMBIENCE (sustained chord changes every 8 beats)
    if (beat === 0) {
      this.playAmbientPad(time, [155.56, 185.00, 233.08], 1.8); // Eb minor triad
    } else if (beat === 8) {
      this.playAmbientPad(time, [138.59, 164.81, 207.65], 1.8); // Db major feel
    }

    // 5. THE MELODY RIFF - Moroccan electro lead pattern
    // Play on specific beats with some controlled randomness
    const melodySteps = [0, 2, 3, 5, 8, 10, 11, 13];
    if (melodySteps.includes(beat) && Math.random() > 0.15) {
      // Pick note from minor scale of current chord vibe
      const rootIndex = beat < 8 ? 0 : 2; // Chord shifts root
      const scaleOffset = Math.floor(Math.random() * 5); // 5 notes limit
      const freq = this.melodyFreqs[rootIndex + scaleOffset];
      this.playMelodyLead(time, freq);
    }
  }

  private playKick(time: number) {
    if (!this.ctx || !this.gainNode) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.gainNode);

    osc.frequency.setValueAtTime(150, time);
    // Rapidly sweep frequency from 150Hz down to 40Hz (heart-thumping bass kick)
    osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.3);

    gain.gain.setValueAtTime(1.0, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.25);

    osc.start(time);
    osc.stop(time + 0.3);
  }

  private playHat(time: number, vol: number) {
    if (!this.ctx || !this.gainNode) return;

    // White noise style hi-hat simulation using a high pass filtered source
    const bufferSize = this.ctx.sampleRate * 0.06; // short burst
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(7000, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(vol, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.gainNode);

    source.start(time);
    source.stop(time + 0.06);
  }

  private playSnare(time: number) {
    if (!this.ctx || !this.gainNode) return;

    // Organic clap: combine a quick noise burst with a 180Hz body
    const noiseLen = this.ctx.sampleRate * 0.12;
    const noiseBuf = this.ctx.createBuffer(1, noiseLen, this.ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < noiseLen; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const source = this.ctx.createBufferSource();
    source.buffer = noiseBuf;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, time);
    filter.Q.setValueAtTime(2, time);

    const snareGain = this.ctx.createGain();
    snareGain.gain.setValueAtTime(0.18, time);
    snareGain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

    source.connect(filter);
    filter.connect(snareGain);
    snareGain.connect(this.gainNode);

    source.start(time);
    source.stop(time + 0.13);

    // Warm snare body
    const bodyOsc = this.ctx.createOscillator();
    const bodyGain = this.ctx.createGain();
    bodyOsc.type = 'triangle';
    bodyOsc.frequency.setValueAtTime(180, time);
    bodyOsc.frequency.exponentialRampToValueAtTime(100, time + 0.1);

    bodyGain.gain.setValueAtTime(0.12, time);
    bodyGain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);

    bodyOsc.connect(bodyGain);
    bodyGain.connect(this.gainNode);

    bodyOsc.start(time);
    bodyOsc.stop(time + 0.11);
  }

  private playAmbientPad(time: number, freqs: number[], duration: number) {
    if (!this.ctx || !this.gainNode) return;

    // Play a series of soft overlapping triangles to form an atmospheric chord
    freqs.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      
      // Slightly detune oscillators for lush thickness
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq + (idx * 0.5), time);

      // Low pass filter to remove harsh high ends, keeping it ambient
      const lp = this.ctx!.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.setValueAtTime(450, time);
      lp.frequency.exponentialRampToValueAtTime(280, time + duration);

      osc.connect(lp);
      lp.connect(gain);
      gain.connect(this.gainNode!);

      // Smooth attack-decay envelope
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.04, time + 0.4); // slow onset
      gain.gain.setValueAtTime(0.04, time + duration - 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.start(time);
      osc.stop(time + duration);
    });
  }

  private playMelodyLead(time: number, freq: number) {
    if (!this.ctx || !this.gainNode) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);
    // Add vibrant sub-octave support
    osc.frequency.setValueAtTime(freq * 2, time); // Bright octave on top

    // Resonant sweep for that dynamic synthesizer feel
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1500, time);
    filter.frequency.exponentialRampToValueAtTime(600, time + 0.2);
    filter.Q.setValueAtTime(4, time);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.gainNode);

    gain.gain.setValueAtTime(0.08, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.22); // Plucky synth

    osc.start(time);
    osc.stop(time + 0.24);
  }
}
