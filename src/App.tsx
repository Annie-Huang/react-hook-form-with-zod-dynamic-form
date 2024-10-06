import React from 'react';
import { Container } from './Container.tsx';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { formDefaultValues, formSchema, FormSchema } from './formSchema.ts';
import { zodResolver } from '@hookform/resolvers/zod';

export const App = () => {
  const {
    register,
    formState: { errors },
  } = useForm<FormSchema>({
    mode: 'all',
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
  });

  return (
    <Container>
      <TextField
        {...register('fullName')}
        label='Full Name'
        helperText={errors.fullName?.message}
        error={!!errors.fullName}
      />
    </Container>
  );
};
