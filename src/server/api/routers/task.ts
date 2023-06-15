import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({
  getAll: privateProcedure.query(({ ctx }) => {
    return ctx.prisma.task.findMany({ where: { createdBy: ctx.userId } });
  }),
  create: privateProcedure
    .input(
      z.object({
        title: z.string().min(1).max(255),
        description: z.string().min(1).max(255),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const creatorId = ctx.userId;

      const task = await ctx.prisma.task.create({
        data: {
          title: input.title,
          description: input.description,
          createdBy: creatorId,
        },
      });
      return task;
    }),
  updateDone: privateProcedure
    .input(z.object({ done: z.boolean(), id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.prisma.task.update({
        where: { id: input.id },
        data: { done: input.done },
      });
      return task;
    }),
  delete: privateProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.task.delete({
        where: { id: input.id },
      });
    }),
});
