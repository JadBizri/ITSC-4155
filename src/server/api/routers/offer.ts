import { z } from 'zod';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '~/server/api/trpc';

export const offerRouter = createTRPCRouter({
	create: protectedProcedure
		.input(
			z.object({
				price: z.number().positive().safe(),
				item: z.number(),
				buyer: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return ctx.db.offer.create({
				data: {
					...input,
					price: Math.round(input.price * 100) / 100,
					item: { connect: { id: input.item } },
					buyer: { connect: { id: ctx.session.user.id } },
				},
			});
		}),

	getUserOffers: protectedProcedure.query(async ({ ctx }) => {
		//populate the user of the offer
		return ctx.db.offer.findMany({
			where: { buyerId: ctx.session.user.id },
			include: { item: true },
		});
	}),

	getItemOffers: protectedProcedure.input(z.number()).query(async ({ ctx, input }) => {
		return ctx.db.offer.findMany({
			where: { itemId: input },
			include: { buyer: true },
		});
	}),

	updateStatus: protectedProcedure
		.input(z.object({ itemId: z.number(), offerId: z.number(), status: z.enum(['PENDING', 'ACCEPTED', 'REJECTED']) }))
		.mutation(async ({ ctx, input }) => {
			if (input.status === 'ACCEPTED') {
				await ctx.db.item.update({
					where: { id: input.itemId },
					data: { Active: false },
				});
				await ctx.db.offer.update({
					where: { id: input.offerId },
					data: { status: 'ACCEPTED' },
				});
				await ctx.db.offer.updateMany({
					where: { itemId: input.itemId, status: { not: 'ACCEPTED' } },
					data: { status: 'REJECTED' },
				});
			} else {
				await ctx.db.offer.update({
					where: { id: input.offerId },
					data: { status: 'REJECTED' },
				});
			}
		}),
});
