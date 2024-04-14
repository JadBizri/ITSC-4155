import { z } from 'zod';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '~/server/api/trpc';

export const itemRouter = createTRPCRouter({
	hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
		return {
			greeting: `Hello ${input.text}`,
		};
	}),

	create: protectedProcedure.input(z.object({ title: z.string().min(1) })).mutation(async ({ ctx, input }) => {
		// simulate a slow db call
		await new Promise(resolve => setTimeout(resolve, 1000));

		return ctx.db.item.create({
			data: {
				title: input.title,
				category: 'OTHER',
				price: 0,
				description: 'this is a description.',
				image: 'https://via.placeholder.com/150',
				location: 'Charlotte, NC',
				campus: 'UNCC',
				createdBy: { connect: { id: ctx.session.user.id } },
			},
		});
	}),

	getLatest: protectedProcedure.query(({ ctx }) => {
		return ctx.db.item.findFirst({
			orderBy: { createdAt: 'desc' },
			where: { createdBy: { id: ctx.session.user.id } },
		});
	}),

	getSecretMessage: protectedProcedure.query(() => {
		return 'you can now see this secret message!';
	}),
});
