import { NextApiRequest, NextApiResponse } from "next";
import db from "@/db";
import { todoSchema } from "../../../models/todo";
import { todoTable } from "@/schema";
import { eq } from "drizzle-orm";

export const GET = async () => {
  try {
    const todos = await db.select().from(todoTable);
    return new Response(JSON.stringify(todos), { status: 200 });
  } catch (err) {
    return new Response("failed to fetch todos", { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    console.log(body);
    const newTodo = await db.insert(todoTable).values(body);
    return new Response(JSON.stringify(newTodo), { status: 201 });
  } catch (error: any) {
    console.log(error);
    return new Response(`Invalid data error ${error.message}`, { status: 400 });
  }
};

export const PUT = async (req: Request) => {
  try {
    const body = await req.json();
    console.log(body);
    const updatedTodo = await db
      .update(todoTable)
      .set({ task: body.newTask })
      .where(eq(todoTable.id, body.id));
    return new Response(JSON.stringify(updatedTodo), { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new Response("Invalid data", { status: 400 });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const body = await req.json();
    const { id } = body;
    if (!id) {
      throw new Error("ID is required");
    }
    await db.delete(todoTable).where(eq(todoTable.id, id));
    return new Response(null, { status: 204 });
  } catch (error: any) {
    console.log(error);
    return new Response(error.message, { status: 400 });
  }
};
