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

const languageKnowledgeSchema = z.discriminatedUnion('knowsOtherLanguages', [
  z.object({
    knowsOtherLanguages: z.literal(true),
    languages: z
      .array(
        z.object({
          name: z.string().min(1),
        }),
      )
      .min(1),
  }),
  z.object({ knowsOtherLanguages: z.literal(false) }),
]);

const formSchema = z
  .object({
    fullName: z.string().min(1),
  })
  .and(workExperienceSchema)
  .and(languageKnowledgeSchema);

type FormSchema = z.infer<typeof formSchema>;

const formDefaultValues: FormSchema = {
  fullName: '',
  hasWorkExperience: false,
  knowsOtherLanguages: false,
};

export { formDefaultValues, formSchema, type FormSchema };
