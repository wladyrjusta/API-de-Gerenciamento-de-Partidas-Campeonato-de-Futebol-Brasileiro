/* eslint-disable @typescript-eslint/naming-convention */
const errorMap: Record<string, number> = {
  INVALID_DATA: 422,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
};

export default (status: string): number => (errorMap[status] ? errorMap[status] : 500);
