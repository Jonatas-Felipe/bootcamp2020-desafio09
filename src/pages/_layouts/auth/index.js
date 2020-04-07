import React from 'react';
import PropsTypes from 'prop-types';

import { Container, Content } from './styles';

export default function AuthLayout({ children }) {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
}

AuthLayout.propTypes = {
  children: PropsTypes.element.isRequired,
};
