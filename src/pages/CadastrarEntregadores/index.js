import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import * as Yup from 'yup';

import api from '~/services/api';
import { registerCouriers } from '~/store/modules/entregadores/actions';

import {
  Container,
  Content,
  VoltarButton,
  InputContent,
  InputGroup,
} from '~/components/Cadastrar/styles';

import AvatarInput from '~/components/AvatarInput';

const schema = Yup.object().shape({
  avatar: Yup.string(),
  name: Yup.string().required('O nome é obrigatorio'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
});

export default function CadastrarEntregadores() {
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
    let avatar_id = null;
    if (avatar === 'true') {
      const data = new FormData();
      data.append('file', avatarInput);
      const response = await api.post('files', data);
      avatar_id = response.data.id;
    }
    dispatch(registerCouriers(avatar_id, name, email));
  }

  return (
    <Container ref={ref}>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Content widthProp={width}>
          <h1>Cadastro de entregadores</h1>
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
          <AvatarInput getAvatar={getAvatar} />

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
