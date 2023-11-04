function handleNoTranslation(message: string, category: string) {
  const extractedName = message.replace(category, "");
  const words = extractedName.split("_");

  const defaultValue = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return defaultValue;
}

export { handleNoTranslation };
