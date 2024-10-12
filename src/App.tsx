import React, { useEffect } from 'react';
import { Container } from './Container.tsx';
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  TextField,
} from '@mui/material';
import {
  FieldErrors,
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch,
} from 'react-hook-form';
import { formDefaultValues, formSchema, FormSchema } from './formSchema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddCircleRounded, DeleteForeverRounded } from '@mui/icons-material';

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

  const { fields, replace, append, remove } = useFieldArray({
    control,
    name: 'languages',
  });

  // const fullErrors: FieldErrors<FormSchema> = errors;
  // const fullErrors: FieldErrors<
  //   Extract<FormSchema, { hasWorkExperience: true }>
  // > = errors;
  const fullErrors: FieldErrors<
    Extract<FormSchema, { hasWorkExperience: true }> &
      Extract<FormSchema, { knowsOtherLanguages: true }>
  > = errors;

  const hasWorkExperience = useWatch({ control, name: 'hasWorkExperience' });
  const knowsOtherLanguages = useWatch({
    control,
    name: 'knowsOtherLanguages',
  });

  useEffect(() => {
    if (knowsOtherLanguages) {
      replace([{ name: '' }]);
    }
  }, [knowsOtherLanguages, replace]);

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

      {/*---------------------------------------------------------*/}

      <FormControlLabel
        {...register('knowsOtherLanguages')}
        label='Know Other Languages?'
        control={<Checkbox />}
      />

      {/*{knowsOtherLanguages && <>array fields here</>}*/}
      {knowsOtherLanguages && (
        <>
          {fields.map((field, index) => (
            <div key={field.id}>
              <TextField
                sx={{ width: '100%' }}
                {...register(`languages.${index}.name`)}
                label='Language Name'
                helperText={fullErrors.languages?.[index]?.name?.message}
                error={!!fullErrors.languages?.[index]?.name?.message}
              />
              <IconButton
                disabled={fields.length === 1}
                onClick={() => remove(index)}
                color='error'
              >
                <DeleteForeverRounded />
              </IconButton>
            </div>
          ))}
          <IconButton
            sx={{ width: 'fit-content' }}
            onClick={() => append({ name: '' })}
            color='success'
          >
            <AddCircleRounded />
          </IconButton>
        </>
      )}

      <Button variant='contained' onClick={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </Container>
  );
};
