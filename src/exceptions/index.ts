import HttpException from './http.exception';

export function badRequest(message?: string) {
  return new HttpException(400, message || 'BadRequest');
}

export function unauthorized(message?: string) {
  return new HttpException(401, message || 'Unauthorized');
}

export function jwtExpiredSignature(message?: string) {
  return new HttpException(403, message || 'ExpiredSignature');
}

export function notFound(message?: string) {
  return new HttpException(404, message || 'NotFound');
}

export function refreshExpiredSignature(message?: string) {
  return new HttpException(419, message || 'ExpiredSignature');
}

export function notDestroyed(message?: string) {
  return new HttpException(424, message || 'NotDestroyed');
}
