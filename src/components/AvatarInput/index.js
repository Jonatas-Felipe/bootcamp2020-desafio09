import React, { useState, useEffect, useRef } from 'react';
import { useField } from '@rocketseat/unform';
import { MdPhoto } from 'react-icons/md';
import PropTypes from 'prop-types';

import { InputFileContent } from './styles';

export default function AvatarInput({ getAvatar, avatar }) {
  const { registerField } = useField('avatar');

  const [imagePreview, setImagePreview] = useState('');

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]);

  function handleChange(e) {
    const filePreview = e.target.files[0];
    if (filePreview) {
      getAvatar(filePreview);
      setImagePreview(URL.createObjectURL(filePreview));
    } else {
      setImagePreview('');
    }
  }

  return (
    <InputFileContent>
      <label>
        {!imagePreview && !avatar ? (
          <>
            <MdPhoto size={40} color="#ddd" />
            Adicionar foto
          </>
        ) : (
          <img src={imagePreview || avatar} alt="Avatar" />
        )}
        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={!!imagePreview}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </InputFileContent>
  );
}

AvatarInput.propTypes = {
  getAvatar: PropTypes.func.isRequired,
  avatar: PropTypes.string,
};

AvatarInput.defaultProps = {
  avatar: '',
};
