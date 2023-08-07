function createTspanElements(words, lineBreak) {
  if (words.length === 0) return "";

  const currentTspan = words.slice(0, lineBreak).join(" ");
  const remainingWords = words.slice(lineBreak);

  return (
    `<tspan x="${WIDTH / 2}" dy="1.2em">${currentTspan}</tspan>` +
    createTspanElements(remainingWords)
  );
}

export default createTspanElements;
