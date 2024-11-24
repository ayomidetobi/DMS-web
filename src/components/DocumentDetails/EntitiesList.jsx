import PropTypes from "prop-types";

const EntitiesList = ({ entities }) => (
  <section className="entities my-4">
    <h3>References to Known Entities</h3>
    {entities.length > 0 ? (
      <ul>
        {entities.map((entity) => (
          <li key={entity.id}>
            {entity.url ? (
              <a href={entity.url} target="_blank" rel="noopener noreferrer">
                {entity.name}
              </a>
            ) : (
              <span>{entity.name}</span>
            )}
            <span> ({entity.label})</span>
          </li>
        ))}
      </ul>
    ) : (
      <p>No entities found.</p>
    )}
  </section>
);

EntitiesList.propTypes = {
  entities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
};

export default EntitiesList;
