import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { MdSearch, MdAdd } from 'react-icons/md';
import { GiCycling } from 'react-icons/gi';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { getDataToUpdate } from '~/store/modules/entregadores/actions';

import {
  H1,
  Content,
  CadastrarButton,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  ContentNull,
} from '~/components/Table/styles';
import Acoes from '~/components/Acoes';
import Loading from '~/components/Loading';
import Paginacao from '~/components/Paginacao';

import { Foto } from './styles';

export default function Encomendas() {
  const [entregadores, setEntregadores] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [busca, setBusca] = useState('');
  const [width, setWidth] = useState('');
  const [loading, setLoading] = useState(true);

  const ref = useRef();

  const dispatch = useDispatch();

  async function loadEntregadores(entregador, pagina) {
    const response = await api.get('deliveryman', {
      params: {
        name: entregador,
        page: pagina,
      },
    });

    setEntregadores(response.data[0].data);
    setPages(response.data[1].pages);
    setLoading(false);
  }

  useEffect(() => {
    setWidth(ref.current.scrollWidth);
  }, []);

  useEffect(() => {
    loadEntregadores('', page);
  }, [page]);

  function handleSearch(e) {
    const entregador = e.target.value;
    loadEntregadores(entregador);
    setBusca(entregador);
  }

  function handleClickEditar(id) {
    dispatch(getDataToUpdate(id));
  }

  function handleClickExcluir(id, name) {
    // Mudei de alert pois acho o alert do JavaScript muito feio!
    // Código utilizando Confirm do JavaScript:
    // const response = window.confirm(
    //   'Tem certeza que de deseja excluir o entregador?'
    // );

    // if (response) {
    //   await api.delete(`/deliveryman/${id}`);
    //   setEntregadores(entregadores.filter(entregador => entregador.id !== id));
    //   toast.success('Entregador apagado.');
    // }

    Swal.fire({
      title: `Tem certeza que de deseja excluir o entregador ${name}?`,
      text:
        'Ao excluir este entregador todas as encomendas a ele vinculadas deverão ser redicionados a outro entregador.',
      icon: 'question',
      confirmButtonText: 'Sim',
      showCancelButton: true,
      cancelButtonText: 'Não',
      confirmButtonColor: '#7159c1',
      cancelButtonColor: '#de3b3b',
    }).then(async result => {
      if (result.value) {
        await api.delete(`/deliveryman/${id}`);
        setEntregadores(
          entregadores.filter(entregador => entregador.id !== id)
        );
        toast.success('Entregador apagado.');
      }
    });
  }

  function handlePage(action) {
    let pagina;

    if (action > 0) {
      pagina = action;
    } else {
      pagina = action === 'next' ? page + 1 : page - 1;
    }

    setPage(pagina);
    loadEntregadores(busca, pagina);
  }

  return (
    <>
      <H1 widthProps={width}>Gerenciando entregadores</H1>
      <Content ref={ref} widthProps={width}>
        <label>
          <MdSearch size={16} color="#999" />
          <input
            type="text"
            placeholder="Buscar por entregadores"
            onChange={handleSearch}
          />
        </label>
        <CadastrarButton to="/entregadores/cadastrar" widthProps={width}>
          <MdAdd size={16} color="#fff" />
          {width > 798 && 'CADASTRAR'}
        </CadastrarButton>
      </Content>

      {!loading ? (
        <>
          {entregadores.length ? (
            <>
              <Table widthProps={width}>
                <Thead>
                  <Th>ID</Th>
                  <Th>Foto</Th>
                  <Th>Nome</Th>
                  <Th>Email</Th>
                  <Th>Ações</Th>
                </Thead>
                {entregadores.map(entregador => (
                  <Tr key={entregador.id}>
                    <Td>#{entregador.id}</Td>
                    <Td>
                      <Foto
                        src={
                          entregador.avatar
                            ? entregador.avatar.url
                            : 'https://api.adorable.io/avatars/50/abott@adorable.io.png'
                        }
                        alt="Avatar"
                      />
                    </Td>
                    <Td>{entregador.name}</Td>
                    <Td>{entregador.email}</Td>
                    <Td>
                      <Acoes
                        id={entregador.id}
                        options={2}
                        handleClickEditar={() =>
                          handleClickEditar(entregador.id)
                        }
                        handleClickExcluir={() =>
                          handleClickExcluir(entregador.id, entregador.name)
                        }
                      />
                    </Td>
                  </Tr>
                ))}
              </Table>

              <Paginacao page={page} pages={pages} handlePage={handlePage} />
            </>
          ) : (
            <ContentNull>
              <GiCycling color="#ccc" size={60} />
              <h2>
                Sem entregadores até o momento
                {busca ? ` para ${busca.substring(0, 64)}.` : '.'}
              </h2>
            </ContentNull>
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
