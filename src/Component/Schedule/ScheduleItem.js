import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment-timezone';

function ScheduleItem(props) {
  const {
    title, duration, moviePhoto, times, dates,
  } = props;
  const armenianTimeZone = 'Asia/Yerevan';
  const currentDates = moment().format('YYYY-MM-DD');

  const formattedTimes = times.map((time) => {
    const dateTimeString = `${currentDates}T${time}`;
    return moment.utc(dateTimeString).tz(armenianTimeZone).format('HH:mm');
  });

  const getWeekDates = (dateString) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const startDate = new Date(dateString);
    const weekDates = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      const dayOfWeek = daysOfWeek[currentDate.getDay()];
      const dayOfMonth = currentDate.getDate();
      const month = months[currentDate.getMonth()];

      weekDates.push({
        dayOfWeek,
        dayOfMonth,
        month,
      });
    }

    return weekDates;
  };

  const formattedDate = getWeekDates(dates);

  return (
    <div className="schedule__dashboard__table__block__list">
      <div className="schedule__dashboard__table__block__list__item">
        <p>{title}</p>
        <p>{duration}</p>
        <img src={`http://localhost:4000/${moviePhoto}`} alt="title" />
      </div>
      <div className="schedule__dashboard__table__block__list__item">
        <div className="schedule__dashboard__table__block__list__item__block">
          {formattedDate.map((d) => (
            <div key={d.dayOfMonth} className="schedule__dashboard__table__block__list__item__block__item">
              <p>{d.dayOfWeek}</p>
              <p>{d.dayOfMonth}</p>
              <p>{d.month}</p>
            </div>
          ))}
        </div>
        <div className="schedule__dashboard__table__block__list__item__schedule">
          {formattedTimes.map((d, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className="schedule__dashboard__table__block__list__item__schedule__item">
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScheduleItem;
