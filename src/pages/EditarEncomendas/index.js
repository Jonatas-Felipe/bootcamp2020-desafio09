import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import api from '~/services/api';
import { updateOrders } from '~/store/modules/encomendas/actions';

import {
  Container,
  Content,
  VoltarButton,
  InputContent,
  GroupInputs,
  InputGroup,
} from '~/components/Cadastrar/styles';

import Select from '~/components/AsyncSelect';

export default function EditarEncomendas() {
  const encomenda = useSelector(state => state.encomendas.encomenda);
  const dispatch = useDispatch();

  const [destinatarios, setDestinatarios] = useState([]);
  const [entregadores, setEntregadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [width, setWidth] = useState('');

  const ref = useRef();

  async function loadDestinatarios() {
    const response = await api.get('recipients');
    const data = response.data[0].data.map(destinatario => {
      return {
        value: destinatario.id,
        label: destinatario.recipient_name,
      };
    });

    setDestinatarios(data);
  }

  async function loadEntregadores() {
    const response = await api.get('deliveryman');
    const data = response.data[0].data.map(entregador => {
      return {
        value: entregador.id,
        label: entregador.name,
      };
    });

    setEntregadores(data);
    setLoading(false);
  }

  useEffect(() => {
    loadDestinatarios();
    loadEntregadores();
    setWidth(ref.current.scrollWidth);
  }, []);

  function handleSubmit({ recipient_id, deliveryman_id, product }) {
    dispatch(updateOrders(encomenda.id, recipient_id, deliveryman_id, product));
  }

  return (
    <Container ref={ref}>
      {loading ? (
        <Content>
          <p>Carregando...</p>
        </Content>
      ) : (
        <>
          <Form initialData={encomenda} onSubmit={handleSubmit}>
            <Content widthProp={width}>
              <h1>Edição de encomendas</h1>
              <div>
                <VoltarButton to="/encomendas">
                  <MdKeyboardArrowLeft size={16} color="#fff" />
                  VOLTAR
                </VoltarButton>
                <button type="submit">
                  <MdCheck size={16} color="#fff" />
                  SALVAR
                </button>
              </div>
            </Content>

            <InputContent>
              <GroupInputs fr={width > 798 && '1fr 1fr'}>
                <InputGroup>
                  <label>Destinatário</label>
                  <Select
                    name="recipient_id"
                    placeholder="Destinatário"
                    options={destinatarios}
                    valueSelect={destinatarios.find(
                      destinatario => destinatario.id !== encomenda.recipient_id
                    )}
                  />
                </InputGroup>
                <InputGroup>
                  <label>Entregador</label>
                  <Select
                    name="deliveryman_id"
                    placeholder="Entregador"
                    options={entregadores}
                    valueSelect={entregadores.find(
                      entregadore => entregadore.id !== encomenda.deliveryman_id
                    )}
                  />
                </InputGroup>
              </GroupInputs>

              <InputGroup>
                <label>Nome do produto</label>
                <Input name="product" placeholder="Nome do produto" />
              </InputGroup>
            </InputContent>
          </Form>
        </>
      )}
    </Container>
  );
}
