'use server';
export interface CreateTodoActionState {
  title?: string;
  description?: string;
  message?: string;
}

export async function createTodoAction(_prevState: CreateTodoActionState, queryData: FormData) {
  const title = queryData.get('title') as string;
  const description = queryData.get('description') as string;

  const request = { title, description };

  console.log(title, description);

  if (!title || !description) {
    return {
      ...request,
      message: 'please enter title and description',
    };
  }

  return {
    ...request,
  } as CreateTodoActionState;
}
