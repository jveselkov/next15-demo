'use client';

import { useActionState } from 'react';

import { registerAction } from '@/actions';

export const RegisterForm = () => {
  const [formState, formAction, isPending] = useActionState(registerAction, {});

  return (
    <form action={formAction}>
      <div className="flex flex-column">
        <div className="input">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" required defaultValue={formState.username} />
        </div>

        <div className="input">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" required defaultValue={formState.password} />
        </div>

        <div className="input">
          <label htmlFor="password">Confirm password</label>
          <input type="password" name="confirm_password" required defaultValue={formState.confirmPassword} />
        </div>

        <button type="submit" disabled={isPending}>
          {isPending ? 'Register...' : 'Register'}
        </button>

        {!isPending && formState?.message && <p className="error">Message: {formState.message}</p>}
      </div>
    </form>
  );
};
