import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';
import { useEffect, useCallback } from 'react';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ largeImg, query, onClose }) {
  const handleKeyDown = useCallback(
    e => {
      if (e.code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
  // componentDidMount() {
  //   window.addEventListener('keydown', this.handelKeydown);
  // }
  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handelKeydown);
  // }

  const handelBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handelBackdropClick}>
      <ModalWindow>
        <img src={largeImg} alt={query} />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  largeImg: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
