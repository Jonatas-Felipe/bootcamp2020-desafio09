import React, { useState, useEffect } from 'react';
import { Input } from '@rocketseat/unform';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';

export default function MaskInput({
  mask,
  name,
  value,
  placeholder,
  required,
}) {
  const [newValue, setNewValue] = useState('');

  useEffect(() => {
    setNewValue(value);
  }, [value]);

  function handleChange(e) {
    setNewValue(e.target.value);
  }

  return (
    <InputMask mask={mask} value={newValue} onChange={handleChange}>
      {() => (
        <Input name={name} placeholder={placeholder} required={required} />
      )}
    </InputMask>
  );
}

MaskInput.propTypes = {
  mask: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  placeholder: PropTypes.any,
  required: PropTypes.bool,
};

MaskInput.defaultProps = {
  value: '',
  placeholder: '',
  required: false,
};
