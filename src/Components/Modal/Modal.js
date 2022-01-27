import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');
const Modal = props => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        props.onClose();
      } else if (e.code === 'ArrowLeft') {
        props.onLeft();
      } else if (e.code === 'ArrowRight') {
        props.onRight();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [props]);

  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      props.onClose();
    }
  };
  return createPortal(
    <div className={s.Overlay} onClick={handleOverlayClick}>
      <div>
        <img src={props.image} alt={props.tags} className={s.Modal} />
      </div>
    </div>,
    modalRoot,
  );
};
// const modalRoot = document.querySelector('#modal-root');
// export default class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     } else if (e.code === 'ArrowLeft') {
//       this.props.onLeft();
//     } else if (e.code === 'ArrowRight') {
//       this.props.onRight();
//     }
//   };

//   handleOverlayClick = event => {
//     if (event.currentTarget === event.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className={s.Overlay} onClick={this.handleOverlayClick}>
//         <div>
//           <img src={this.props.image} alt={this.props.tags} className={s.Modal} />
//         </div>
//       </div>,
//       modalRoot,
//     );
//   }
// }

Modal.propTypes = {
  src: PropTypes.string,
  tags: PropTypes.string,
};
export default Modal;
