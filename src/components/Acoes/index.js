import React, { useState } from 'react';
import PropsTypes from 'prop-types';

import {
  MdMoreHoriz,
  MdVisibility,
  MdCreate,
  MdDeleteForever,
} from 'react-icons/md';

import { OptionsButton, OptionsList, Option, OptionButton } from './styles';

export default function Acoes({
  id,
  options,
  textOption,
  handleClick,
  handleClickEditar,
  handleClickExcluir,
}) {
  const [visible, setVisible] = useState(0);

  function handleToggleVisible(number_id) {
    visible === number_id ? setVisible(0) : setVisible(number_id);
  }

  return (
    <>
      <OptionsButton onClick={() => handleToggleVisible(id)}>
        <MdMoreHoriz size={20} color="#666" />
      </OptionsButton>
      <OptionsList visible={visible === id}>
        {options === 3 || textOption.opt1 === 'Visualizar' ? (
          <Option>
            <OptionButton hover="visualizar" onClick={handleClick}>
              <MdVisibility size={16} color="#7159c1" />
              Vizualizar
            </OptionButton>
          </Option>
        ) : (
          ''
        )}
        {textOption.opt1 !== 'Visualizar' && (
          <Option>
            <OptionButton hover="editar" onClick={handleClickEditar}>
              <MdCreate size={16} color="#4D85EE" />
              {textOption.opt1 ? textOption.opt1 : 'Editar'}
            </OptionButton>
          </Option>
        )}
        <Option>
          <OptionButton hover="exluir" onClick={handleClickExcluir}>
            <MdDeleteForever size={16} color="#DE3B3B" />
            {textOption.opt2 ? textOption.opt2 : 'Excluir'}
          </OptionButton>
        </Option>
      </OptionsList>
    </>
  );
}

Acoes.propTypes = {
  id: PropsTypes.number.isRequired,
  options: PropsTypes.number.isRequired,
  textOption: PropsTypes.shape({
    opt1: PropsTypes.string,
    opt2: PropsTypes.string,
  }),
  handleClick: PropsTypes.func,
  handleClickEditar: PropsTypes.func,
  handleClickExcluir: PropsTypes.func.isRequired,
};

Acoes.defaultProps = {
  textOption: PropsTypes.shape({
    opt1: 'Editar',
    opt2: 'Excluir',
  }),
  handleClick: '',
  handleClickEditar: '',
};
