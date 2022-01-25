import React from 'react';
import { LoadMore, Container } from './ButtonStyled';
import PropTypes from 'prop-types';

export default function Button({ onLoadMore }) {
  return (
    <Container>
      <LoadMore type="button" onClick={onLoadMore}>
        Load more
      </LoadMore>
    </Container>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
};
