import React from 'react';
import { Container } from './Container.tsx';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { formDefaultValues, formSchema, FormSchema } from './formSchema.ts';
import { zodResolver } from '@hookform/resolvers/zod';

export const App = () => {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<FormSchema>({
    mode: 'all',
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
  });

  const hasWorkExperience = useWatch({ control, name: 'hasWorkExperience' });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    alert(JSON.stringify(data, null, 2));
  };

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

      <Button variant='contained' onClick={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </Container>
  );
};
