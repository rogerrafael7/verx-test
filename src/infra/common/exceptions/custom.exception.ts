export enum CustomExceptionCode {
  INVALID_PARAM = 'INVALID_PARAM',
  NOT_FOUND = 'INVALID_PARAM',
}

export class CustomException extends Error {
  constructor(readonly message: string, readonly code?: CustomExceptionCode) {
    super(message);
  }
}
