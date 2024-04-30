import { z } from 'zod';
import { generateSlug } from '~/lib/utils';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '~/server/api/trpc';

export const itemRouter = createTRPCRouter({
	itemList: publicProcedure.query(async ({ ctx }) => {
		return ctx.db.item.findMany();
	}),

	create: protectedProcedure
		.input(
			z.object({
				title: z.string().min(1).trim(),
				category: z.enum(['TEXTBOOKS', 'ELECTRONICS', 'CLOTHING', 'ESSENTIALS', 'FURNITURE', 'OTHER']),
				price: z.number().positive().safe(),
				description: z.string().min(10).trim(),
				images: z.array(z.string().url()),
				location: z.string().min(5).trim(),
				institution: z.string().min(3).trim(),
				condition: z.enum(['NEW', 'LIKE_NEW', 'GOOD', 'FAIR', 'POOR']),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return ctx.db.item.create({
				data: {
					title: input.title,
					slug: generateSlug(input.title),
					category: input.category,
					price: input.price,
					description: input.description,
					images: input.images,
					location: input.location,
					institution: input.institution,
					condition: input.condition,
					createdBy: { connect: { id: ctx.session.user.id } },
				},
			});
		}),

	getItemSlug: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
		return ctx.db.item.findFirst({ where: { slug: input }, include: { offers: true, createdBy: true } });
	}),

	getItemMatchList: publicProcedure
		.input(
			z.object({
				input: z.optional(z.string()),
				category: z.optional(
					z.enum(['TEXTBOOKS', 'ELECTRONICS', 'CLOTHING', 'ESSENTIALS', 'FURNITURE', 'OTHER', 'ALL']),
				),
			}),
		)
		.query(async ({ ctx, input }) => {
			return ctx.db.item.findMany({
				where: {
					title: input.input ? { contains: input.input, mode: 'insensitive' } : undefined,
					category: input.category === 'ALL' ? undefined : input.category,
				},
			});
		}),

	getUserItems: protectedProcedure.query(async ({ ctx }) => {
		//order by length of offers
		return ctx.db.item.findMany({
			where: { createdById: ctx.session.user.id },
			include: { offers: true },
			orderBy: { offers: { _count: 'desc' } },
		});
	}),

	deleteUserItem: protectedProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
		return ctx.db.item.delete({ where: { id: input, createdBy: { id: ctx.session.user.id } } });
	}),
});
