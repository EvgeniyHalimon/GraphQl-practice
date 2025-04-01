import jwt from 'jsonwebtoken';
export const APP_SECRET = 'GraphQL-is-aw3some';

export function getTokenPayload(token) {
  return jwt.verify(token, APP_SECRET);
}

export function getUserId(req) {
  const token = req?.headers?.authorization?.replace('Bearer ', '');
  if (!token) throw new Error('Not authenticated');
  return jwt.verify(token, process.env.APP_SECRET).userId;
}
