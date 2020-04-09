import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { MdSearch, MdAdd } from 'react-icons/md';
import { GiCardboardBox } from 'react-icons/gi';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { parseISO, format } from 'date-fns';

import api from '~/services/api';
import { getDataToUpdate } from '~/store/modules/encomendas/actions';

import {
  H1,
  Content,
  CadastrarButton,
  ButtonGroup,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  VisualizarContainer,
  Visualizar,
  ContentNull,
} from '~/components/Table/styles';
import Acoes from '~/components/Acoes';
import Loading from '~/components/Loading';
import Paginacao from '~/components/Paginacao';
import { Entregador, Status } from './styles';

export default function Encomendas() {
  const [encomendas, setEncomendas] = useState([]);
  const [busca, setBusca] = useState('');
  const [visualizarInfo, setVisualizarInfo] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [width, setWidth] = useState('');
  const [loading, setLoading] = useState(true);
  const [buttonFiltro, setButtonFiltro] = useState('');

  const ref = useRef();

  const dispatch = useDispatch();

  async function loadEncomendas(product, pagina, filtro = '') {
    const response = await api.get('/entregas', {
      params: {
        product,
        page: pagina,
        filtro,
      },
    });

    const data = response.data[0].data.map(encomenda => {
      let status;

      status =
        !encomenda.start_date && !encomenda.canceled_at ? 'retirada' : false;

      status = !status && encomenda.end_date ? 'entregue' : status;

      status = !status && encomenda.canceled_at ? 'cancelada' : status;

      if (
        encomenda.start_date &&
        !encomenda.end_date &&
        !encomenda.canceled_at
      ) {
        status = 'pendente';
      }

      let entregador;
      let avatar;

      if (encomenda.deliveryman) {
        entregador = encomenda.deliveryman.name;
        avatar = encomenda.deliveryman.avatar
          ? encomenda.deliveryman.avatar.url
          : 'https://api.adorable.io/avatars/50/abott@adorable.png';
      } else {
        entregador = 'Entregador Apagado';
        avatar = 'https://api.adorable.io/avatars/50/abott@adorable.png';
      }

      return {
        id: encomenda.id,
        destinatario: encomenda.recipient.recipient_name,
        entregador,
        avatar,
        rua: encomenda.recipient.street,
        numero: encomenda.recipient.number,
        complemento: encomenda.recipient.complement
          ? encomenda.recipient.complement
          : '',
        cidade: encomenda.recipient.city,
        estado: encomenda.recipient.state,
        cep: encomenda.recipient.zipcode,
        retirada: encomenda.start_date ? encomenda.start_date : '',
        entrega: encomenda.end_date ? encomenda.end_date : '',
        assinatura: encomenda.signature ? encomenda.signature.url : null,
        status,
      };
    });
    setEncomendas(data);
    setPages(response.data[1].pages);
    setLoading(false);
  }

  useEffect(() => {
    setWidth(ref.current.scrollWidth);
    loadEncomendas('', 1);
  }, []);

  function handleSearch(e) {
    const product = e.target.value;
    loadEncomendas(product, 1, buttonFiltro);
    setBusca(product);
    setPage(1);
  }

  function handleClick(encomenda) {
    if (encomenda) {
      const dadosEncomenda = {
        rua: encomenda.rua,
        numero: encomenda.numero,
        complemento: encomenda.complemento,
        cidade: encomenda.cidade,
        estado: encomenda.estado,
        cep: encomenda.cep,
        retirada: encomenda.retirada,
        entrega: encomenda.entrega,
        assinatura: encomenda.assinatura,
      };

      setVisualizarInfo(dadosEncomenda);
    }
    setVisibility(!visibility);
  }

  function handleClickEditar(id) {
    dispatch(getDataToUpdate(id));
  }

  function handlePage(action) {
    let pagina;

    if (action > 0) {
      pagina = action;
    } else {
      pagina = action === 'next' ? page + 1 : page - 1;
    }

    setPage(pagina);
    loadEncomendas(busca, pagina);
  }

  async function handleClickExcluir(id) {
    // Mudei de alert pois acho o alert do JavaScript muito feio!
    // Código utilizando Confirm do JavaScript:
    // const response = window.confirm(
    //   'Tem certeza que de deseja excluir a encomenda?'
    // );

    // if (response) {
    //   await api.delete(`/entrega/${id}`);
    //   setEncomendas(encomendas.filter(encomenda => encomenda.id !== id));
    //   toast.success('Encomenda apagada.');
    // }

    Swal.fire({
      title: `Tem certeza que de deseja excluir e encomenda #${id}?`,
      icon: 'question',
      confirmButtonText: 'Sim',
      showCancelButton: true,
      cancelButtonText: 'Não',
      confirmButtonColor: '#7159c1',
      cancelButtonColor: '#de3b3b',
    }).then(async result => {
      if (result.value) {
        await api.delete(`/entrega/${id}`);
        setEncomendas(encomendas.filter(encomenda => encomenda.id !== id));
        toast.success('Encomenda apagada.');
      }
    });
  }

  function handleClickButtonFiltro(filtro) {
    setButtonFiltro(filtro);
    loadEncomendas('', 1, filtro);
    setBusca('');
    setPage(1);
  }

  return (
    <>
      <H1 widthProps={width}>Gerenciando encomendas</H1>
      <Content ref={ref} widthProps={width}>
        <label>
          <MdSearch size={16} color="#999" />
          <input
            type="text"
            placeholder="Buscar por encomendas"
            onChange={handleSearch}
            value={busca}
          />
        </label>
        <CadastrarButton to="/encomendas/cadastrar" widthProps={width}>
          <MdAdd size={16} color="#fff" />
          {width > 798 && 'CADASTRAR'}
        </CadastrarButton>
      </Content>
      <ButtonGroup widthProps={width} buttonActive={buttonFiltro}>
        <button type="button" onClick={() => handleClickButtonFiltro()}>
          Todas entregas
        </button>
        <button
          type="button"
          onClick={() => handleClickButtonFiltro('problema')}
        >
          Com Problemas
        </button>
      </ButtonGroup>

      {!loading ? (
        <>
          {encomendas.length ? (
            <>
              <Table widthProps={width}>
                <Thead>
                  <Th>ID</Th>
                  <Th>Destinatário</Th>
                  <Th>Entregador</Th>
                  <Th>Cidade</Th>
                  <Th>Estado</Th>
                  <Th>Status</Th>
                  <Th>Ações</Th>
                </Thead>
                {encomendas.map(encomenda => (
                  <Tr key={encomenda.id}>
                    <Td>#{encomenda.id}</Td>
                    <Td>{encomenda.destinatario}</Td>
                    <Td>
                      <Entregador>
                        <img
                          src={encomenda.avatar}
                          alt={encomenda.entregador}
                        />
                        {encomenda.entregador}
                      </Entregador>
                    </Td>
                    <Td>{encomenda.cidade}</Td>
                    <Td>{encomenda.estado}</Td>
                    <Td>
                      <Status status={encomenda.status}>
                        {encomenda.status}
                      </Status>
                    </Td>
                    <Td>
                      <Acoes
                        id={encomenda.id}
                        options={3}
                        handleClick={() => handleClick(encomenda)}
                        handleClickEditar={() =>
                          handleClickEditar(encomenda.id)
                        }
                        handleClickExcluir={() =>
                          handleClickExcluir(encomenda.id)
                        }
                      />
                    </Td>
                  </Tr>
                ))}
              </Table>

              <VisualizarContainer
                onClick={() => handleClick(false)}
                visibility={visibility}
              >
                <Visualizar>
                  <div>
                    <div>
                      <strong>Informações da encomenda</strong>
                      <p>
                        {visualizarInfo.rua}, {visualizarInfo.numero}
                      </p>
                      <p>{visualizarInfo.complemento}</p>
                      <p>
                        {visualizarInfo.cidade} - {visualizarInfo.estado}
                      </p>
                      <p>{visualizarInfo.cep}</p>
                    </div>
                    <div>
                      <strong>Datas</strong>
                      <p>
                        <b>Retirada:</b>{' '}
                        {visualizarInfo.retirada
                          ? format(
                              parseISO(visualizarInfo.retirada),
                              'dd/MM/yyyy'
                            )
                          : 'Retirada pendente'}
                      </p>
                      <p>
                        <b>Entrega:</b>{' '}
                        {visualizarInfo.entrega
                          ? format(
                              parseISO(visualizarInfo.entrega),
                              'dd/MM/yyyy'
                            )
                          : 'Entrega pendente'}
                      </p>
                    </div>
                    <div>
                      <strong>Assinatura do destinatário</strong>
                      {visualizarInfo.assinatura ? (
                        <img src={visualizarInfo.assinatura} alt="Assinatura" />
                      ) : (
                        <p>Entrega Pendente</p>
                      )}
                    </div>
                  </div>
                </Visualizar>
              </VisualizarContainer>

              <Paginacao page={page} pages={pages} handlePage={handlePage} />
            </>
          ) : (
            <ContentNull>
              <GiCardboardBox color="#ccc" size={60} />
              <h2>
                Sem encomendas até o momento
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
