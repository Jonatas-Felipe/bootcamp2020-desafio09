import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/fastfeet-logo.png';

export default function Error404() {
  return (
    <div>
      <p>Nós da Equipe</p>
      <img src={logo} alt="FastFeet" />
      <p>Lamentamos, mas infelizmente esta página não existe.</p>
      <Link to="/">Voltar ao Inicio</Link>
    </div>
  );
}
