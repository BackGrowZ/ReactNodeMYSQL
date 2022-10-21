export const inputLength = (input, length = 255) => {
    return input.length < length
}

export const capitalize =(string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}