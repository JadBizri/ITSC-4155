import { z } from 'zod';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '~/server/api/trpc';

export const userRouter = createTRPCRouter({
	deleteUser: protectedProcedure.mutation(async ({ ctx }) => {
		return ctx.db.user.delete({ where: { id: ctx.session.user.id } });
	}),

	verifyUser: protectedProcedure
		.input(z.object({ phone: z.string().min(10).max(10), phoneVerified: z.date() }))
		.mutation(async ({ ctx, input }) => {
			return ctx.db.user.update({
				where: { id: ctx.session.user.id },
				data: { phone: input.phone, phoneVerified: input.phoneVerified },
			});
		}),
});
