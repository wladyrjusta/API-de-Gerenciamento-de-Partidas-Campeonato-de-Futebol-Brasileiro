const errorMap: Record<string, number> = {
  invalidData: 400,
  invalidPostData: 422,
  unauthorized: 401,
  notFound: 404,
  conflict: 409,
};

export default (status: string): number => (errorMap[status] ? errorMap[status] : 500);
