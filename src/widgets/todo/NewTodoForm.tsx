'use client';

import { useActionState } from 'react';

import { createTodoAction } from '@/actions';

export const NewTodoForm = () => {
  const [formState, formAction, isPending] = useActionState(createTodoAction, {});

  return (
    <form action={formAction}>
      <div className="flex flex-column">
        <div className="input">
          <label htmlFor="title">Name</label>
          <input type="text" name="title" required defaultValue={formState.title} />
        </div>

        <div className="input">
          <label htmlFor="password">Password</label>
          <textarea name="description" required defaultValue={formState.description} />
        </div>

        <button type="submit" disabled={isPending}>
          {isPending ? 'Creating...' : 'Create'}
        </button>

        {!isPending && formState?.message && <p className="error">Message: {formState.message}</p>}
      </div>
    </form>
  );
};
