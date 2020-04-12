import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, LinkComponent } from './styles';

import logo from '~/assets/fastfeet-logo.png';

export default function Header() {
  const location = useLocation();
  const dispatch = useDispatch();

  const [page, setPage] = useState('');
  const [width, setWidth] = useState('');
  const [menuOpened, setMenuOpened] = useState(false);

  const ref = useRef();

  function handleClickLink(pagina) {
    setMenuOpened(false);
    setPage(pagina);
  }

  useEffect(() => {
    const url = location.pathname.substring(1);
    handleClickLink(url);
    setWidth(ref.current.scrollWidth);
  }, [location.pathname]);

  function handleClick() {
    dispatch(signOut());
  }

  function handleClickMenu() {
    setMenuOpened(!menuOpened);
  }

  return (
    <Container ref={ref}>
      <Content widthProp={width} menuOpened={menuOpened}>
        <nav>
          <img src={logo} alt="FastFeet" />
          {width < 798 ? (
            <div>
              <button type="button" onClick={handleClickMenu}>
                <div />
                <div />
                <div />
              </button>
              <div>
                <ul>
                  <li>
                    <LinkComponent
                      to="/encomendas"
                      onClick={() => handleClickLink('encomendas')}
                      ativo={page === 'encomendas' ? 1 : 0}
                    >
                      ENCOMENDAS
                    </LinkComponent>
                  </li>
                  <li>
                    <LinkComponent
                      to="/entregadores"
                      onClick={() => handleClickLink('entregadores')}
                      ativo={page === 'entregadores' ? 1 : 0}
                    >
                      ENTREGADORES
                    </LinkComponent>
                  </li>
                  <li>
                    <LinkComponent
                      to="/destinatarios"
                      onClick={() => handleClickLink('destinatarios')}
                      ativo={page === 'destinatarios' ? 1 : 0}
                    >
                      DESTINATÁRIOS
                    </LinkComponent>
                  </li>
                  <li>
                    <LinkComponent
                      to="/problemas"
                      onClick={() => handleClickLink('problemas')}
                      ativo={page === 'problemas' ? 1 : 0}
                    >
                      PROBLEMAS
                    </LinkComponent>
                  </li>
                </ul>
                <div>
                  <strong>Admin FastFeet</strong>
                  <button type="button" onClick={handleClick}>
                    sair do sistema
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <ul>
              <li>
                <LinkComponent
                  to="/encomendas"
                  onClick={() => handleClickLink('encomendas')}
                  ativo={page === 'encomendas' ? 1 : 0}
                >
                  ENCOMENDAS
                </LinkComponent>
              </li>
              <li>
                <LinkComponent
                  to="/entregadores"
                  onClick={() => handleClickLink('entregadores')}
                  ativo={page === 'entregadores' ? 1 : 0}
                >
                  ENTREGADORES
                </LinkComponent>
              </li>
              <li>
                <LinkComponent
                  to="/destinatarios"
                  onClick={() => handleClickLink('destinatarios')}
                  ativo={page === 'destinatarios' ? 1 : 0}
                >
                  DESTINATÁRIOS
                </LinkComponent>
              </li>
              <li>
                <LinkComponent
                  to="/problemas"
                  onClick={() => handleClickLink('problemas')}
                  ativo={page === 'problemas' ? 1 : 0}
                >
                  PROBLEMAS
                </LinkComponent>
              </li>
            </ul>
          )}
        </nav>
        {width > 798 && (
          <div>
            <strong>Admin FastFeet</strong>
            <button type="button" onClick={handleClick}>
              sair do sistema
            </button>
          </div>
        )}
      </Content>
    </Container>
  );
}
