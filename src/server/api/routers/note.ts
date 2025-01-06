import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const noteRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { title, content } = input;
      const note = await ctx.db.note.create({
        data: {
          title,
          content,
          userId: Number(ctx.session.user.id),
        },
      });
      return note;
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const notes = await ctx.db.note.findMany({
      where: { userId: Number(ctx.session.user.id) },
      orderBy: { createdAt: "desc" },
    });
    return notes;
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const note = await ctx.db.note.findUnique({
        where: { id: input.id },
      });
      if (!note || note.userId !== Number(ctx.session.user.id)) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Note not found",
        });
      }
      return note;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        content: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id, title, content } = input;
      const note = await ctx.db.note.findUnique({ where: { id } });
      if (!note || note.userId !== Number(ctx.session.user.id)) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Note not found",
        });
      }
      const updatedNote = await ctx.db.note.update({
        where: { id },
        data: { title, content },
      });
      return updatedNote;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const note = await ctx.db.note.findUnique({ where: { id: input.id } });
      if (!note || note.userId !== Number(ctx.session.user.id)) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Note not found",
        });
      }
      await ctx.db.note.delete({ where: { id: input.id } });
      return { success: true };
    }),
});
