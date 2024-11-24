import { useState } from "react";

import PropTypes from "prop-types";

const ParsedContent = ({ mainText, entities, getHighlightedText }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 2000;

  const handleToggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const getDisplayText = () => {
    if (isExpanded || mainText.length <= MAX_LENGTH) {
      return mainText;
    }
    return mainText.substring(0, MAX_LENGTH) + "...";
  };

  return (
    <section className="parsed-content my-4">
      <h3>Main Text</h3>
      <blockquote className="blockquote">
        <p
          dangerouslySetInnerHTML={{
            __html: getHighlightedText(getDisplayText(), entities),
          }}
        />
      </blockquote>
      {mainText.length > MAX_LENGTH && (
        <button className="btn btn-link p-0" onClick={handleToggleReadMore}>
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </section>
  );
};

ParsedContent.propTypes = {
  mainText: PropTypes.string.isRequired,
  entities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
  getHighlightedText: PropTypes.func.isRequired,
};

export default ParsedContent;
