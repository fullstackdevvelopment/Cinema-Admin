import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function DashboardAll() {
  return (
    <table className="movies__dashboard__table">
      <thead>
        <tr className="movies__dashboard__table__thead">
          <td className="movies__dashboard__table__item">
            Number
          </td>
          <td className="movies__dashboard__table__item">
            Full Name
          </td>
          <td className="movies__dashboard__table__item">
            Date
          </td>
          <td className="movies__dashboard__table__item">
            Buy Films
          </td>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <td className="movies__dashboard__table__item" />
        </tr>
      </thead>
      <tbody>
        <tr className="movies__dashboard__table__item__info">
          <td className="movies__dashboard__table__item__info__items">N1450</td>
          <td className="movies__dashboard__table__item__info__items">Jon Nick</td>
          <td className="movies__dashboard__table__item__info__items">10.05.2019</td>
          <td className="movies__dashboard__table__item__info__items__price">$15</td>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <td className="movies__dashboard__table__item__info__items">
            <FontAwesomeIcon
              icon={faCheck}
            />
          </td>
        </tr>

        <tr className="movies__dashboard__table__item__info">
          <td className="movies__dashboard__table__item__info__items">N1450</td>
          <td className="movies__dashboard__table__item__info__items">Jon Nick</td>
          <td className="movies__dashboard__table__item__info__items">10.05.2019</td>
          <td className="movies__dashboard__table__item__info__items__price">$15</td>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <td className="movies__dashboard__table__item__info__items">
            <FontAwesomeIcon
              icon={faCheck}
            />
          </td>
        </tr>

        <tr className="movies__dashboard__table__item__info">
          <td className="movies__dashboard__table__item__info__items">N1450</td>
          <td className="movies__dashboard__table__item__info__items">Jon Nick</td>
          <td className="movies__dashboard__table__item__info__items">10.05.2019</td>
          <td className="movies__dashboard__table__item__info__items__price">$15</td>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <td className="movies__dashboard__table__item__info__items">
            <FontAwesomeIcon
              icon={faCheck}
            />
          </td>
        </tr>
        <tr className="movies__dashboard__table__item__info">
          <td className="movies__dashboard__table__item__info__items">N1450</td>
          <td className="movies__dashboard__table__item__info__items">Jon Nick</td>
          <td className="movies__dashboard__table__item__info__items">10.05.2019</td>
          <td className="movies__dashboard__table__item__info__items__price">$15</td>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <td className="movies__dashboard__table__item__info__items">
            <FontAwesomeIcon
              icon={faCheck}
            />
          </td>
        </tr>
        <tr className="movies__dashboard__table__item__info">
          <td className="movies__dashboard__table__item__info__items">N1450</td>
          <td className="movies__dashboard__table__item__info__items">Jon Nick</td>
          <td className="movies__dashboard__table__item__info__items">10.05.2019</td>
          <td className="movies__dashboard__table__item__info__items__price">$15</td>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <td className="movies__dashboard__table__item__info__items">
            <FontAwesomeIcon
              icon={faCheck}
            />
          </td>
        </tr>
        <tr className="movies__dashboard__table__item__info">
          <td className="movies__dashboard__table__item__info__items">N1450</td>
          <td className="movies__dashboard__table__item__info__items">Jon Nick</td>
          <td className="movies__dashboard__table__item__info__items">10.05.2019</td>
          <td className="movies__dashboard__table__item__info__items__price">$15</td>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <td className="movies__dashboard__table__item__info__items">
            <FontAwesomeIcon
              icon={faCheck}
            />
          </td>
        </tr>

      </tbody>

    </table>
  );
}

export default DashboardAll;
