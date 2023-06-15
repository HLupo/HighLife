import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
  getAll: privateProcedure.query(({ ctx }) => {
    return ctx.prisma.todo.findMany({ where: { createdBy: ctx.userId } });
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

      const todo = await ctx.prisma.todo.create({
        data: {
          title: input.title,
          description: input.description,
          createdBy: creatorId,
        },
      });
      return todo;
    }),
  updateDone: privateProcedure
    .input(z.object({ done: z.boolean(), id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const todo = await ctx.prisma.todo.update({
        where: { id: input.id },
        data: { done: input.done },
      });
      return todo;
    }),
  delete: privateProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.todo.delete({
        where: { id: input.id },
      });
    }),
});
