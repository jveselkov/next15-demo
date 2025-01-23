'use server';

export interface LoginActionState {
  name?: string;
  password?: string;
  success?: boolean;
  message?: string;
}
export async function loginAction(_prevState: LoginActionState, queryData: FormData): Promise<LoginActionState> {
  const name = queryData.get('name') as string;
  const password = queryData.get('password') as string;

  if (!name || !password) {
    return {
      name,
      password,
      success: false,
      message: 'please type name and password',
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    name,
    password,
    success: true,
    message: 'logged in',
  };
}
