import React from 'react';
import PropsTypes from 'prop-types';

import { Wrapper, Container } from './styles';
import Header from '~/components/Header';

export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      <Container>{children}</Container>
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropsTypes.element.isRequired,
};
