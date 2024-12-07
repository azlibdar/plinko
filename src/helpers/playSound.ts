type Sound = "/sounds/collision.mp3" | "/sounds/cash-register.wav";

const playSound = (sound: Sound, volume = 0.8) => {
  const audio = new Audio(sound);
  audio.volume = volume;
  audio.addEventListener("canplaythrough", () => {
    audio.play();
  });
  audio.load();
};

export default playSound;
