export default function validateName(name) {
  const nameRegex = new RegExp(/^[^0-9].{3,}/);
  return nameRegex.test(name);
}
