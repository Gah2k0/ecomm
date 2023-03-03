export default function validateName(name, isNameRequired = true) {
  try {
    if (!isNameRequired) return true;
    const startsWithCharactersRegex = (/^[^0-9].{3,}/);
    return startsWithCharactersRegex.test(name.trim());
  } catch (error) {
    return false;
  }
}
