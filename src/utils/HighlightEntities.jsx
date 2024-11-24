export const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export const getHighlightedText = (text, entities) => {
  let highlightedText = text;

  entities.forEach((entity) => {
    const escapedEntityName = escapeRegExp(entity.name);
    const regex = new RegExp(`\\b${escapedEntityName}\\b`, "g");
    const highlightedEntity = entity.url
      ? `<a href="${entity.url}" target="_blank" rel="noopener noreferrer" style="color: #b8860b; font-weight: bold;">${entity.name}</a>`
      : `<span style="color: #b8860b; font-weight: bold;">${entity.name}</span>`;
    highlightedText = highlightedText.replace(regex, highlightedEntity);
  });

  return highlightedText;
};
