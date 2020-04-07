import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import * as Yup from 'yup';

import { registerRecipients } from '~/store/modules/destinatarios/actions';

import {
  Container,
  Content,
  VoltarButton,
  InputContent,
  GroupInputs,
  InputGroup,
} from '~/components/Cadastrar/styles';

import MaskInput from '~/components/MaskInput';

const schema = Yup.object().shape({
  recipient_name: Yup.string().required('O nome é obrigatório'),
  street: Yup.string().required('A rua é obrigatório'),
  number: Yup.string().required('O número é obrigatório'),
  complement: Yup.string(),
  city: Yup.string().required('A cidade é obrigatória'),
  state: Yup.string().required('O estado é obrigatório'),
  zipcode: Yup.string().required('O CEP é obrigatório'),
});

export default function CadastrarDestinatarios() {
  const [width, setWidth] = useState('');

  const ref = useRef();

  useEffect(() => {
    setWidth(ref.current.scrollWidth);
  }, []);

  const dispatch = useDispatch();
  function handleSubmit({
    recipient_name,
    street,
    number,
    complement,
    city,
    state,
    zipcode,
  }) {
    dispatch(
      registerRecipients(
        recipient_name,
        street,
        number,
        complement,
        city,
        state,
        zipcode
      )
    );
  }

  return (
    <Container ref={ref}>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Content widthProp={width}>
          <h1>Cadastro de destinatário</h1>
          <div>
            <VoltarButton to="/destinatarios">
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
          <InputGroup>
            <label>Nome</label>
            <Input name="recipient_name" placeholder="Nome" required />
          </InputGroup>

          <GroupInputs fr={width > 798 && '3fr 1fr 1fr'}>
            <InputGroup>
              <label>Rua</label>
              <Input name="street" placeholder="Rua" required />
            </InputGroup>
            <InputGroup>
              <label>Número</label>
              <Input name="number" placeholder="Número" required />
            </InputGroup>
            <InputGroup>
              <label>Complemento</label>
              <Input name="complement" placeholder="Complemento" />
            </InputGroup>
          </GroupInputs>

          <GroupInputs fr={width > 798 && '1fr 1fr 1fr'}>
            <InputGroup>
              <label>Cidade</label>
              <Input name="city" placeholder="Cidade" required />
            </InputGroup>
            <InputGroup>
              <label>Estado</label>
              <Input name="state" placeholder="Estado" required />
            </InputGroup>
            <InputGroup>
              <label>CEP</label>
              <MaskInput
                name="zipcode"
                placeholder="CEP"
                mask="99999-999"
                required
              />
            </InputGroup>
          </GroupInputs>
        </InputContent>
      </Form>
    </Container>
  );
}
