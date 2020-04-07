import React from 'react';
import PropTypes from 'prop-types';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';

import { Container, ButtonPage, NumberPage } from './styles';

export default function Paginacao({ page, pages, handlePage }) {
  let dinamicDisabled1;
  let dinamicDisabled2;
  let dinamicPage1;
  let dinamicPage3;
  let dinamicPage2;

  if (page > 5) {
    if (page <= pages - 3) {
      dinamicDisabled1 = true;
      dinamicPage1 = page - 1;
      dinamicPage2 = page;
      dinamicPage3 = page + 1;
      dinamicDisabled2 = true;
    } else {
      dinamicDisabled1 = true;
      dinamicPage1 = pages - 4;
      dinamicPage2 = pages - 3;
      dinamicPage3 = pages - 2;
      dinamicDisabled2 = false;
    }
  } else {
    dinamicDisabled1 = false;
    dinamicPage1 = 3;
    dinamicPage2 = 4;
    dinamicPage3 = 5;
    dinamicDisabled2 = true;
  }

  return (
    <Container>
      <ButtonPage
        type="button"
        disabled={page === 1}
        onClick={() => handlePage('back')}
      >
        <MdArrowBack color="#fff" size={20} />
      </ButtonPage>
      <NumberPage onClick={() => handlePage(1)} disabled={page === 1}>
        1
      </NumberPage>
      <NumberPage
        onClick={() => handlePage(2)}
        hide={pages < 2}
        disabled={dinamicDisabled1 || page === 2}
      >
        {page >= 6 ? '...' : 2}
      </NumberPage>
      <NumberPage
        onClick={() => handlePage(dinamicPage1)}
        hide={pages < 3}
        disabled={page === dinamicPage1}
      >
        {dinamicPage1}
      </NumberPage>
      <NumberPage
        onClick={() => handlePage(dinamicPage2)}
        hide={pages < 4}
        disabled={page === dinamicPage2}
      >
        {dinamicPage2}
      </NumberPage>
      <NumberPage
        onClick={() => handlePage(dinamicPage3)}
        hide={pages < 5}
        disabled={page === dinamicPage3}
      >
        {dinamicPage3}
      </NumberPage>
      <NumberPage
        onClick={() => handlePage(pages - 1)}
        hide={pages < 6}
        disabled={(page < pages - 3 && dinamicDisabled2) || page === pages - 1}
      >
        {page >= pages - 3 ? pages - 1 : '...'}
      </NumberPage>
      <NumberPage
        onClick={() => handlePage(pages)}
        hide={pages < 7}
        disabled={page === pages}
      >
        {pages}
      </NumberPage>
      <ButtonPage
        type="button"
        disabled={page === pages}
        onClick={() => handlePage('next')}
      >
        <MdArrowForward color="#fff" size={20} />
      </ButtonPage>
    </Container>
  );
}

Paginacao.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  handlePage: PropTypes.func.isRequired,
};
