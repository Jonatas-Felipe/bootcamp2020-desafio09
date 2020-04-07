import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';

import Destinatarios from '~/pages/Destinatarios';
import CadastrarDestinatarios from '~/pages/CadastrarDestinatarios';
import EditarDestinatarios from '~/pages/EditarDestinatarios';

import Encomendas from '~/pages/Encomendas';
import CadastrarEncomendas from '~/pages/CadastrarEncomendas';
import EditarEncomendas from '~/pages/EditarEncomendas';

import Entregadores from '~/pages/Entregadores';
import CadastrarEntregadores from '~/pages/CadastrarEntregadores';
import EditarEntregadores from '~/pages/EditarEntregadores';

import Problemas from '~/pages/Problemas';
import Error404 from '~/pages/Error404';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/destinatarios" exact component={Destinatarios} isPrivate />
      <Route
        path="/destinatarios/cadastrar"
        component={CadastrarDestinatarios}
        isPrivate
      />
      <Route
        path="/destinatarios/editar"
        component={EditarDestinatarios}
        isPrivate
      />

      <Route path="/encomendas" exact component={Encomendas} isPrivate />
      <Route
        path="/encomendas/cadastrar"
        component={CadastrarEncomendas}
        isPrivate
      />
      <Route path="/encomendas/editar" component={EditarEncomendas} isPrivate />

      <Route path="/entregadores" exact component={Entregadores} isPrivate />
      <Route
        path="/entregadores/cadastrar"
        component={CadastrarEntregadores}
        isPrivate
      />
      <Route
        path="/entregadores/editar"
        component={EditarEntregadores}
        isPrivate
      />

      <Route path="/problemas" component={Problemas} isPrivate />

      <Route path="/" component={Error404} />
    </Switch>
  );
}
