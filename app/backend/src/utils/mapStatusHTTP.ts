/* eslint-disable @typescript-eslint/naming-convention */
const errorMap: Record<string, number> = {
  INVALIDDATA: 422,
  UNAUTHORIZED: 401,
  NOTFOUND: 404,
  CONFLICT: 409,
};

export default (status: string): number => (errorMap[status] ? errorMap[status] : 500);
