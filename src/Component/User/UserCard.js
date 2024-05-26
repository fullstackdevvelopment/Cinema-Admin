import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import photo1 from '../../assets/images/actorPhoto1.jpg';
import Movies from './Movies';
import AccordionMovies from './AccordionMovies';

export default function AccordionUsage() {
  return (
    <Accordion className="user__card__content">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
        className="user__card__content__block"
      >
        <div className="user__card__content__photos">
          <img className="user__card__content__photos__user" src={photo1} alt="userphoto" />
          <p>John Nick</p>
          <Movies />
        </div>
      </AccordionSummary>
      <AccordionMovies />
    </Accordion>
  );
}
