import { Request, Response } from 'express';

export function getIp(req: Request): string | undefined {
  return req.ip || (req.connection && req.connection.remoteAddress) || undefined;
}

export function getUrl(req: Request): string {
  return req.originalUrl || req.url;
}

export function getHttpVersion(req: Request): string {
  return req.httpVersionMajor + '.' + req.httpVersionMinor;
}

export function getResponseHeader(res: Response, field: string) {
  if (!res.headersSent) {
    return undefined;
  }

  const header = res.getHeader(field);

  return Array.isArray(header) ? header.join(', ') : header;
}

export function getReferrer(req: Request) {
  return req.header('referer') || req.header('referrer');
}

export function getUserAgent(req: Request) {
  return req.header('user-agent');
}

export function getAuthorization(req: Request) {
  return req.header('Authorization') || req.header('X-Authorization');
}

export function getAction(req: Request) {
  return (
    getUrl(req)
      .split('/')
      .filter(ps => ps !== '')[0] || 'root'
  );
}

export default {
  getIp,
  getUrl,
  getHttpVersion,
  getResponseHeader,
  getReferrer,
  getUserAgent,
  getAuthorization,
  getAction,
};
