import { z } from 'zod';

/*
https://zod.dev/?id=discriminated-unions
Zod can check the discriminator key (status in the example above) to determine which schema should be used to parse the input. This makes parsing more efficient and lets Zod report friendlier errors.
*/
const workExperienceSchema = z.discriminatedUnion();

const formSchema = z.object({
  fullName: z.string().min(1),
});

type FormSchema = z.infer<typeof formSchema>;

const formDefaultValues: FormSchema = {
  fullName: '',
};

export { formDefaultValues, formSchema, type FormSchema };
