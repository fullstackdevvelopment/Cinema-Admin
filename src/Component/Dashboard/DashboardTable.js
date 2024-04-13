import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const checkIcon = <FontAwesomeIcon icon={faCheck} />;

function DashboardTable() {
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
            Price
          </td>
          <td className="movies__dashboard__table__item">Icon</td>
        </tr>
      </thead>
      <tbody>
        <tr className="movies__dashboard__table__item__info">
          <td className="movies__dashboard__table__item__info__items">N1450</td>
          <td className="movies__dashboard__table__item__info__item-s">Jon Nick</td>
          <td className="movies__dashboard__table__item__info__items">10.05.2019</td>
          <td className="movies__dashboard__table__item__info__items__price">$15</td>
          <td className="movies__dashboard__table__item__info__items">
            {checkIcon}
          </td>
        </tr>

        <tr className="movies__dashboard__table__item__info">
          <td className="movies__dashboard__table__item__info__items">N1450</td>
          <td className="movies__dashboard__table__item__info__items">Jon Nick</td>
          <td className="movies__dashboard__table__item__info__items">10.05.2019</td>
          <td className="movies__dashboard__table__item__info__items__price">$15</td>
          <td className="movies__dashboard__table__item__info__items">
            {checkIcon}
          </td>
        </tr>

        <tr className="movies__dashboard__table__item__info">
          <td className="movies__dashboard__table__item__info__items">N1450</td>
          <td className="movies__dashboard__table__item__info__items">Jon Nick</td>
          <td className="movies__dashboard__table__item__info__items">10.05.2019</td>
          <td className="movies__dashboard__table__item__info__items__price">$15</td>
          <td className="movies__dashboard__table__item__info__items">
            {checkIcon}
          </td>
        </tr>
        <tr className="movies__dashboard__table__item__info">
          <td className="movies__dashboard__table__item__info__items">N1450</td>
          <td className="movies__dashboard__table__item__info__items">Jon Nick</td>
          <td className="movies__dashboard__table__item__info__items">10.05.2019</td>
          <td className="movies__dashboard__table__item__info__items__price">$15</td>
          <td className="movies__dashboard__table__item__info__items">
            {checkIcon}
          </td>
        </tr>
        <tr className="movies__dashboard__table__item__info">
          <td className="movies__dashboard__table__item__info__items">N1450</td>
          <td className="movies__dashboard__table__item__info__items">Jon Nick</td>
          <td className="movies__dashboard__table__item__info__items">10.05.2019</td>
          <td className="movies__dashboard__table__item__info__items__price">$15</td>
          <td className="movies__dashboard__table__item__info__items">
            {checkIcon}
          </td>
        </tr>
        <tr className="movies__dashboard__table__item__info">
          <td className="movies__dashboard__table__item__info__items">N1450</td>
          <td className="movies__dashboard__table__item__info__items">Jon Nick</td>
          <td className="movies__dashboard__table__item__info__items">10.05.2019</td>
          <td className="movies__dashboard__table__item__info__items__price">$15</td>
          <td className="movies__dashboard__table__item__info__items">
            {checkIcon}
          </td>
        </tr>

      </tbody>

    </table>
  );
}

export default DashboardTable;
