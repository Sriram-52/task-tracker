/**
 * Generated by orval v6.20.0 🍺
 * Do not edit manually.
 * Task Tracker Api
 * OpenAPI spec version: 1.0
 */
import { useMutation } from "@tanstack/react-query";
import type {
  MutationFunction,
  UseMutationOptions,
} from "@tanstack/react-query";
import type {
  ForgotPasswordDto,
  LoginDto,
  LoginWithTokenDto,
  RegisterDto,
  SessionDto,
  UserDto,
} from "./models";
import { instance } from "../instances/index";
import type { ErrorType } from "../instances/index";

export const authControllerLogin = (loginDto: LoginDto) => {
  return instance<SessionDto>({
    url: `/api/auth/login`,
    method: "post",
    headers: { "Content-Type": "application/json" },
    data: loginDto,
  });
};

export const getAuthControllerLoginMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerLogin>>,
    TError,
    { data: LoginDto },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof authControllerLogin>>,
  TError,
  { data: LoginDto },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authControllerLogin>>,
    { data: LoginDto }
  > = (props) => {
    const { data } = props ?? {};

    return authControllerLogin(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type AuthControllerLoginMutationResult = NonNullable<
  Awaited<ReturnType<typeof authControllerLogin>>
>;
export type AuthControllerLoginMutationBody = LoginDto;
export type AuthControllerLoginMutationError = ErrorType<unknown>;

export const useAuthControllerLogin = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerLogin>>,
    TError,
    { data: LoginDto },
    TContext
  >;
}) => {
  const mutationOptions = getAuthControllerLoginMutationOptions(options);

  return useMutation(mutationOptions);
};
export const authControllerLoginWithToken = (
  loginWithTokenDto: LoginWithTokenDto,
) => {
  return instance<SessionDto>({
    url: `/api/auth/login-with-token`,
    method: "post",
    headers: { "Content-Type": "application/json" },
    data: loginWithTokenDto,
  });
};

export const getAuthControllerLoginWithTokenMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerLoginWithToken>>,
    TError,
    { data: LoginWithTokenDto },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof authControllerLoginWithToken>>,
  TError,
  { data: LoginWithTokenDto },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authControllerLoginWithToken>>,
    { data: LoginWithTokenDto }
  > = (props) => {
    const { data } = props ?? {};

    return authControllerLoginWithToken(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type AuthControllerLoginWithTokenMutationResult = NonNullable<
  Awaited<ReturnType<typeof authControllerLoginWithToken>>
>;
export type AuthControllerLoginWithTokenMutationBody = LoginWithTokenDto;
export type AuthControllerLoginWithTokenMutationError = ErrorType<unknown>;

export const useAuthControllerLoginWithToken = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerLoginWithToken>>,
    TError,
    { data: LoginWithTokenDto },
    TContext
  >;
}) => {
  const mutationOptions =
    getAuthControllerLoginWithTokenMutationOptions(options);

  return useMutation(mutationOptions);
};
export const authControllerRegister = (registerDto: RegisterDto) => {
  return instance<UserDto>({
    url: `/api/auth/register`,
    method: "post",
    headers: { "Content-Type": "application/json" },
    data: registerDto,
  });
};

export const getAuthControllerRegisterMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerRegister>>,
    TError,
    { data: RegisterDto },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof authControllerRegister>>,
  TError,
  { data: RegisterDto },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authControllerRegister>>,
    { data: RegisterDto }
  > = (props) => {
    const { data } = props ?? {};

    return authControllerRegister(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type AuthControllerRegisterMutationResult = NonNullable<
  Awaited<ReturnType<typeof authControllerRegister>>
>;
export type AuthControllerRegisterMutationBody = RegisterDto;
export type AuthControllerRegisterMutationError = ErrorType<unknown>;

export const useAuthControllerRegister = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerRegister>>,
    TError,
    { data: RegisterDto },
    TContext
  >;
}) => {
  const mutationOptions = getAuthControllerRegisterMutationOptions(options);

  return useMutation(mutationOptions);
};
export const authControllerForgotPassword = (
  forgotPasswordDto: ForgotPasswordDto,
) => {
  return instance<void>({
    url: `/api/auth/forgot-password`,
    method: "put",
    headers: { "Content-Type": "application/json" },
    data: forgotPasswordDto,
  });
};

export const getAuthControllerForgotPasswordMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerForgotPassword>>,
    TError,
    { data: ForgotPasswordDto },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof authControllerForgotPassword>>,
  TError,
  { data: ForgotPasswordDto },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authControllerForgotPassword>>,
    { data: ForgotPasswordDto }
  > = (props) => {
    const { data } = props ?? {};

    return authControllerForgotPassword(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type AuthControllerForgotPasswordMutationResult = NonNullable<
  Awaited<ReturnType<typeof authControllerForgotPassword>>
>;
export type AuthControllerForgotPasswordMutationBody = ForgotPasswordDto;
export type AuthControllerForgotPasswordMutationError = ErrorType<unknown>;

export const useAuthControllerForgotPassword = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerForgotPassword>>,
    TError,
    { data: ForgotPasswordDto },
    TContext
  >;
}) => {
  const mutationOptions =
    getAuthControllerForgotPasswordMutationOptions(options);

  return useMutation(mutationOptions);
};