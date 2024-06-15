import moment from 'moment';
import PropTypes from 'prop-types';

function generateOptions({ startDate, endDate }) {
  const options = [];
  let currentDate = moment(startDate);
  const lastDate = moment(endDate);

  while (currentDate.isSameOrBefore(lastDate)) {
    options.push({
      value: currentDate.format('YYYY-MM-DD'),
      label: currentDate.format('YYYY-MM-DD'),
    });
    currentDate = currentDate.add(1, 'day');
  }

  return options;
}

generateOptions.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};

export default generateOptions;
