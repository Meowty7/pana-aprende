import { defineCollection, z } from 'astro:content';

const questionSchema = z.object({
    question: z.string(),
    options: z.array(
        z.object({
            text: z.string(),
            isCorrect: z.boolean(),
        })
    ),
});


const blogsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        level: z.number(),
        date: z.date(),
        image: z.string(),
        questions: z.array(questionSchema),
    }),
});

const snippetsCollection = defineCollection({
    type: 'content',
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            image: image(),
        }),
});

export const collections = {
    categorias: blogsCollection,
    snippets: snippetsCollection,
};

const questionsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        slug: z.string(),
        questions: z.array(z.object({
            question: z.string(),
            options: z.array(z.object({
                text: z.string(),
                isCorrect: z.boolean(),
            })),
        })),
    }),
});

export const questions = questionsCollection;