import React, { useState, useEffect, useRef } from 'react';
import { GiFlatTire } from 'react-icons/gi';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  H1,
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
import Paginacao from '~/components/Paginacao';
import Loading from '~/components/Loading';

export default function Encomendas() {
  const [visibility, setVisibility] = useState(false);
  const [visualizarInfo, setVisualizarInfo] = useState(false);
  const [problemas, setProblemas] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [width, setWidth] = useState('');
  const [loading, setLoading] = useState(true);

  const ref = useRef();

  async function loadProblemas(pagina) {
    const response = await api.get('problems', {
      params: {
        page: pagina,
      },
    });
    setProblemas(response.data[0].data);
    setPages(response.data[1].pages);
    setLoading(false);
  }

  useEffect(() => {
    loadProblemas(1);
    setWidth(ref.current.scrollWidth);
  }, []);

  function handleClick(problema) {
    if (problema) {
      setVisualizarInfo(problema);
    }
    setVisibility(!visibility);
  }

  async function handleClickExcluir(id) {
    // Mudei de alert pois acho o alert do JavaScript muito feio!
    // Código utilizando Confirm do JavaScript:
    // const response = window.confirm(
    //   'Tem certeza que de deseja cancelar a encomenda?'
    // );
    // if (response) {
    //   await api.delete(`/problem/${id}/cancel-delivery`);
    //   setProblemas(problemas.filter(problema => problema.id !== id));
    //   toast.success('Encomenda cancelada.');
    // }

    Swal.fire({
      title: `Tem certeza que de deseja cancelar a encomenda do problema #${id}`,
      icon: 'question',
      confirmButtonText: 'Sim',
      showCancelButton: true,
      cancelButtonText: 'Não',
      confirmButtonColor: '#7159c1',
      cancelButtonColor: '#de3b3b',
    }).then(async result => {
      if (result.value) {
        await api.delete(`/problem/${id}/cancel-delivery`);
        setProblemas(problemas.filter(problema => problema.id !== id));
        toast.success('Encomenda cancelada.');
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
    loadProblemas(pagina);
  }

  return (
    <>
      <H1 ref={ref} widthProps={width}>
        Problemas na entrega
      </H1>
      {!loading ? (
        <>
          {problemas.length ? (
            <>
              <Table widthProps={width}>
                <Thead>
                  <Th>Encomenda</Th>
                  <Th>Problema</Th>
                  <Th>Ações</Th>
                </Thead>
                {problemas.map(problema => (
                  <Tr key={problema.id}>
                    <Td>#{problema.id}</Td>
                    <Td>{problema.description}</Td>
                    <Td>
                      <Acoes
                        id={1}
                        option={2}
                        textOption={{
                          opt1: 'Visualizar',
                          opt2: 'Cancelar encomenda',
                        }}
                        handleClick={() => handleClick(problema.description)}
                        handleClickExcluir={() =>
                          handleClickExcluir(problema.id)
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
                      <strong>VISUALIZAR PROBLEMA</strong>
                      <p>{visualizarInfo}</p>
                    </div>
                  </div>
                </Visualizar>
              </VisualizarContainer>

              <Paginacao page={page} pages={pages} handlePage={handlePage} />
            </>
          ) : (
            <ContentNull>
              <GiFlatTire color="#ccc" size={60} />
              <h2>Sem problemas até o momento.</h2>
            </ContentNull>
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
