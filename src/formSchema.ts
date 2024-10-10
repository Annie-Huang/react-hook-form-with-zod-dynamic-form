import { z } from 'zod';

/*
https://zod.dev/?id=discriminated-unions
Zod can check the discriminator key (status in the example above) to determine which schema should be used to parse the input. This makes parsing more efficient and lets Zod report friendlier errors.
*/
const workExperienceSchema = z.discriminatedUnion('hasWorkExperience', [
  z.object({
    hasWorkExperience: z.literal(true),
    companyName: z.string().min(1),
  }),
  z.object({ hasWorkExperience: z.literal(false) }),
]);

const formSchema = z
  .object({
    fullName: z.string().min(1),
  })
  .and(workExperienceSchema);

type FormSchema = z.infer<typeof formSchema>;

const formDefaultValues: FormSchema = {
  fullName: '',
  hasWorkExperience: false,
};

export { formDefaultValues, formSchema, type FormSchema };
