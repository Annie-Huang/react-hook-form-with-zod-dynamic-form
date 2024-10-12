import React from 'react';
import { Container } from './Container.tsx';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { FieldErrors, SubmitHandler, useForm, useWatch } from 'react-hook-form';
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

  // const fullErrors: FieldErrors<FormSchema> = errors;
  const fullErrors: FieldErrors<
    Extract<FormSchema, { hasWorkExperience: true }>
  > = errors;

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
        // helperText={errors.fullName?.message}
        // error={!!errors.fullName}
        helperText={fullErrors.fullName?.message}
        error={!!fullErrors.fullName}
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
          // Will get type error for discriminatedUnion
          // helperText={errors.companyName?.message}
          // error={!!errors.companyName}

          helperText={fullErrors.companyName?.message}
          error={!!fullErrors.companyName}
        />
      )}

      <Button variant='contained' onClick={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </Container>
  );
};
