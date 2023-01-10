export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //max is not included
}

export function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
