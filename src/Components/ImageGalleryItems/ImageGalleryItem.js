import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ smallImage, largeImage, tags, onModalShow }) {
  return (
    <li
      className={s.ImageGalleryItem}
      onClick={() => {
        onModalShow(largeImage);
      }}
    >
      <img src={smallImage} alt={tags} className={s.ImageGalleryItemImage} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  onModalShow: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
};
