'use client';

import { useActionState } from 'react';

import { loginAction } from './loginAction';

export const LoginForm = () => {
  const [formState, formAction, isPending] = useActionState(loginAction, {});

  return (
    <form action={formAction}>
      <div className="flex flex-column">
        <div className="input">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" required defaultValue={formState.name} />
        </div>

        <div className="input">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" required defaultValue={formState.password} />
        </div>

        <button type="submit" disabled={isPending}>
          {isPending ? 'Login...' : 'Login'}
        </button>

        {!isPending && !formState?.success && formState?.message && (
          <p className="error">Message: {formState.message}</p>
        )}
      </div>
    </form>
  );
};
