import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { MdSearch, MdAdd } from 'react-icons/md';
import { GiPositionMarker } from 'react-icons/gi';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { getDataToUpdate } from '~/store/modules/destinatarios/actions';

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

export default function Encomendas() {
  const [destinatarios, setDestinatarios] = useState([]);
  const [busca, setBusca] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [width, setWidth] = useState('');
  const [loading, setLoading] = useState(true);

  const ref = useRef();

  const dispatch = useDispatch();

  async function loadDestinatarios(destinatario, pagina) {
    const response = await api.get('recipients', {
      params: {
        recipient_name: destinatario,
        page: pagina,
      },
    });
    setDestinatarios(response.data[0].data);
    setPages(response.data[1].pages);
    setLoading(false);
  }

  useEffect(() => {
    setWidth(ref.current.scrollWidth);
  }, []);

  useEffect(() => {
    loadDestinatarios('', page);
  }, [page]);

  function handleSearch(e) {
    const destinatario = e.target.value;
    loadDestinatarios(destinatario);
    setBusca(destinatario);
  }

  function handleClickEditar(id) {
    dispatch(getDataToUpdate(id));
  }

  async function handleClickExcluir(id, name) {
    // Mudei de alert pois acho o alert do JavaScript muito feio!
    // Código utilizando Confirm do JavaScript:
    // const response = window.confirm(
    //   'Tem certeza que de deseja excluir o destinatário?'
    // );
    // if (response) {
    //   await api.delete(`/recipient/${id}`);
    //   setDestinatarios(
    //     destinatarios.filter(destinatario => destinatario.id !== id)
    //   );
    //   toast.success('Destinatário apagado.');
    // }

    Swal.fire({
      title: `Tem certeza que de deseja excluir o destinátario ${name}?`,
      text:
        'Ao excluir o destinatário será deletado todas a encomenda a ele vinculada.',
      icon: 'question',
      confirmButtonText: 'Sim',
      showCancelButton: true,
      cancelButtonText: 'Não',
      confirmButtonColor: '#7159c1',
      cancelButtonColor: '#de3b3b',
    }).then(async result => {
      if (result.value) {
        await api.delete(`/recipient/${id}`);
        setDestinatarios(
          destinatarios.filter(destinatario => destinatario.id !== id)
        );
        toast.success('Destinatário apagado.');
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
    loadDestinatarios(busca, pagina);
  }

  return (
    <>
      <H1 widthProps={width}>Gerenciando destinatários</H1>
      <Content ref={ref} widthProps={width}>
        <label>
          <MdSearch size={16} color="#999" />
          <input
            type="text"
            placeholder="Buscar por destinatários"
            onChange={handleSearch}
          />
        </label>
        <CadastrarButton to="/destinatarios/cadastrar" widthProps={width}>
          <MdAdd size={16} color="#fff" />
          {width > 798 && 'CADASTRAR'}
        </CadastrarButton>
      </Content>

      {!loading ? (
        <>
          {destinatarios.length ? (
            <>
              <Table widthProps={width}>
                <Thead>
                  <Th>ID</Th>
                  <Th>Nome</Th>
                  <Th>Endereço</Th>
                  <Th>Ações</Th>
                </Thead>
                {destinatarios.map(destinatario => (
                  <Tr key={destinatario.id}>
                    <Td>#{destinatario.id}</Td>
                    <Td>{destinatario.recipient_name}</Td>
                    <Td>
                      {destinatario.street}, {destinatario.number},{' '}
                      {destinatario.complement} {destinatario.city} -{' '}
                      {destinatario.state}
                    </Td>
                    <Td>
                      <Acoes
                        id={destinatario.id}
                        options={2}
                        handleClickEditar={() =>
                          handleClickEditar(destinatario.id)
                        }
                        handleClickExcluir={() =>
                          handleClickExcluir(
                            destinatario.id,
                            destinatario.recipient_name
                          )
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
              <GiPositionMarker color="#ccc" size={60} />
              <h2>
                Sem destinatários até o momento
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
