import PropTypes from "prop-types";

const OrderingDropdown = ({ options, selectedOrder, onOrderChange }) => {
  return (
    <div className="mb-3">
      <label htmlFor="ordering" className="form-label">
        Order By:
      </label>
      <select
        id="ordering"
        value={selectedOrder}
        onChange={(e) => onOrderChange(e.target.value)}
        className="form-select"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

OrderingDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedOrder: PropTypes.string.isRequired,
  onOrderChange: PropTypes.func.isRequired,
};

export default OrderingDropdown;
