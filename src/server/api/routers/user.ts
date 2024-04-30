import { z } from 'zod';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '~/server/api/trpc';

export const userRouter = createTRPCRouter({
	deleteUser: protectedProcedure.mutation(async ({ ctx }) => {
		return ctx.db.user.delete({ where: { id: ctx.session.user.id } });
	}),
});
