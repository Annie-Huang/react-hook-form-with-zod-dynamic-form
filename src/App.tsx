import React from 'react';
import { Container } from './Container.tsx';
import { TextField } from '@mui/material';

export const App = () => {
  return (
    <Container>
      <TextField label='Full Name' />
    </Container>
  );
};
