import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useField } from '@rocketseat/unform';
import SelectAsync from 'react-select/async';
import PropTypes from 'prop-types';

export default function AsyncSelect({
  name,
  placeholder,
  options,
  valueSelect,
}) {
  const [newValue, setNewValue] = useState({});
  const { fieldName, defaultValue, registerField } = useField(name);

  const selectRef = useRef();

  useEffect(() => {
    if (selectRef.current) {
      registerField({
        name: fieldName,
        ref: selectRef.current,
        path: 'select.state.value.value',
      });
    }
  }, [fieldName, name, registerField]);

  function filterOptions(inputValue) {
    return options.filter(option =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  function loadOptions(inputValue, callback) {
    setTimeout(() => {
      callback(filterOptions(inputValue));
    }, 1000);
  }

  const handleChange = useCallback(
    value => {
      !value && valueSelect ? setNewValue(valueSelect) : setNewValue(value);
    },
    [valueSelect]
  );

  useEffect(() => {
    handleChange(null);
  }, [handleChange]);

  return (
    <>
      <SelectAsync
        defaultValue={defaultValue}
        ref={selectRef}
        placeholder={placeholder}
        name={name}
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        value={newValue}
        onChange={value => handleChange(value)}
      />
    </>
  );
}

AsyncSelect.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.array.isRequired,
  valueSelect: PropTypes.object,
};

AsyncSelect.defaultProps = {
  placeholder: '',
  valueSelect: [],
};
