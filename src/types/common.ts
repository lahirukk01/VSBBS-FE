export type TResponseError = {
  details: string;
  message: string;
  timestamp: string;
}

export type TErrorResponse = {
  status: number;
  data: {
    data: null;
    error: TResponseError;
  };
};
