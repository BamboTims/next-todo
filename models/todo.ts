import * as yup from "yup";

export interface Todo {
  id: string;
  task: string;
}

export const todoSchema = yup.object().shape({
  id: yup.string().uuid().notRequired(),
  task: yup.string().required("Task is required"),
});
