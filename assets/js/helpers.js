export function $(selector) {
  const elements = document.querySelectorAll(selector);

  if (elements.length === 0) return null;
  if (elements.length === 1) return elements[0];

  return elements;
}

export function removeComasFromNumber(number) {
  return number.split(",").join("");
}

export function formatNumber(number) {
  return number.toLocaleString();
}
