import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import api from '~/services/api';
import { updateCouriers } from '~/store/modules/entregadores/actions';

import {
  Container,
  Content,
  VoltarButton,
  InputContent,
  InputGroup,
} from '~/components/Cadastrar/styles';

import AvatarInput from '~/components/AvatarInput';

export default function EditartEntregadores() {
  const entregador = useSelector(state => state.entregadores.entregador);

  const dispatch = useDispatch();

  const [avatarInput, setAvatarInput] = useState([]);
  const [width, setWidth] = useState('');

  const ref = useRef();

  useEffect(() => {
    setWidth(ref.current.scrollWidth);
  }, []);

  function getAvatar(avatarFile) {
    setAvatarInput(avatarFile);
  }

  async function handleSubmit({ avatar, name, email }) {
    let { avatar_id } = entregador;
    if (avatar === 'true') {
      const data = new FormData();
      data.append('file', avatarInput);
      const response = await api.post('files', data);
      avatar_id = response.data.id;
    }
    dispatch(updateCouriers(entregador.id, avatar_id, name, email));
  }

  return (
    <Container ref={ref}>
      <Form initialData={entregador} onSubmit={handleSubmit}>
        <Content widthProp={width}>
          <h1>Edição de entregadores</h1>
          <div>
            <VoltarButton to="/entregadores">
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
          <AvatarInput
            getAvatar={getAvatar}
            avatar={entregador.avatar && entregador.avatar.url}
          />

          <InputGroup>
            <label>Nome</label>
            <Input name="name" placeholder="Nome" />
          </InputGroup>
          <InputGroup>
            <label>Email</label>
            <Input name="email" placeholder="Email" />
          </InputGroup>
        </InputContent>
      </Form>
    </Container>
  );
}
