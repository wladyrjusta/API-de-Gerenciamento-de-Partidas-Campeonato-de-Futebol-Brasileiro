export type ServiceMessage = { message: string };

type ServiceErrorResponse = 'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'CONFLICT';

type ServiceResponseError = {
  status: ServiceErrorResponse,
  data: ServiceMessage,
};

type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL',
  data: T
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
