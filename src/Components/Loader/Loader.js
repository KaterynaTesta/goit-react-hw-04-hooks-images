import React from 'react';
import { BallTriangle } from 'react-loader-spinner';

const Loader = () => (
  <BallTriangle
    type="Audio"
    color="#3f51b5"
    height={100}
    width={100}
    timeout={300000}
    style={{
      paddingTop: '25px',
      justifyContent: 'center',
      display: 'flex',
      alignItems: 'center',
    }}
  />
);
export default Loader;
