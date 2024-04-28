import { z } from 'zod';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '~/server/api/trpc';

export const offerRouter = createTRPCRouter({
	create: protectedProcedure
		.input(
			z.object({
				amount: z.number().positive().safe(),
				status: z.enum(['PENDING', 'ACCEPTED', 'REJECTED']),
				price: z.number().positive().safe(),
				item: z.number(),
				buyer: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return ctx.db.offer.create({
				data: {
					...input,
					item: { connect: { id: input.item } },
					buyer: { connect: { id: ctx.session.user.id } },
				},
			});
		}),

	getUserOffers: protectedProcedure.query(async ({ ctx }) => {
		return ctx.db.offer.findMany({ where: { buyer: { id: ctx.session.user.id } } });
	}),
});
