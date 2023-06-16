import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({
  getAll: privateProcedure.query(({ ctx }) => {
    return ctx.prisma.task.findMany({ where: { createdBy: ctx.userId } });
  }),
  create: privateProcedure
    .input(
      z.object({
        endAt: z.date().optional(),
        minutesRequired: z.number().min(0).optional(),
        title: z.string().min(1).max(255),
        description: z.string().min(1).max(255).optional(),
        priority: z.number().min(0).max(3).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const creatorId = ctx.userId;

      const task = await ctx.prisma.task.create({
        data: {
          title: input.title,
          description: input.description,
          createdBy: creatorId,
          endAt: input.endAt,
          minutesRequired: input.minutesRequired,
          priority: input.priority,
        },
      });
      return task;
    }),
  updateFields: privateProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        endAt: z.date().optional(),
        minutesRequired: z.number().min(0).optional(),
        title: z.string().min(1).max(255).optional(),
        description: z.string().min(1).max(255).optional(),
        done: z.boolean().optional(),
        priority: z.number().min(0).max(3).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.prisma.task.update({
        where: { id: input.id },
        data: { ...input },
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
