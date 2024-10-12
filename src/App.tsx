import React from 'react';
import { Container } from './Container.tsx';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useForm, useWatch } from 'react-hook-form';
import { formDefaultValues, formSchema, FormSchema } from './formSchema.ts';
import { zodResolver } from '@hookform/resolvers/zod';

export const App = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useForm<FormSchema>({
    mode: 'all',
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
  });

  const hasWorkExperience = useWatch({ control, name: 'hasWorkExperience' });

  console.log('errors=', errors);

  return (
    <Container>
      <TextField
        {...register('fullName')}
        label='Full Name'
        helperText={errors.fullName?.message}
        error={!!errors.fullName}
      />
      <FormControlLabel
        {...register('hasWorkExperience')}
        label='Work Experience?'
        control={<Checkbox />}
        style={{ alignSelf: 'start' }}
      />
      {hasWorkExperience && (
        <TextField
          {...register('companyName')}
          label='Company Name'
          helperText={errors.companyName?.message}
          error={!!errors.companyName}
        />
      )}
    </Container>
  );
};
