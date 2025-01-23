'use server';

export interface RegisterActionState {
  name?: string;
  password?: string;
  confirmPassword?: string;
  success?: boolean;
  message?: string;
}
export async function loginAction(_prevState: RegisterActionState, queryData: FormData): Promise<RegisterActionState> {
  const name = queryData.get('name') as string;
  const password = queryData.get('password') as string;
  const confirmPassword = queryData.get('confirm_password') as string;

  if (!name || !password || !confirmPassword) {
    return {
      name,
      password,
      confirmPassword,
      success: false,
      message: 'please type name, password and confirm password',
    };
  }

  if (password !== confirmPassword) {
    return {
      name,
      password,
      confirmPassword,
      success: false,
      message: 'password and confirm password are not equal',
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    name,
    password,
    confirmPassword,
    success: true,
  };
}
