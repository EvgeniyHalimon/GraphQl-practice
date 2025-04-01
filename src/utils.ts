import jwt, { JwtPayload } from 'jsonwebtoken';

export const APP_SECRET = 'GraphQL-is-aw3some';

export const getTokenPayload = (token: string): JwtPayload => {
  const payload = jwt.verify(token, APP_SECRET);
  if (typeof payload === 'string') {
    throw new Error('Invalid token payload');
  }
  return payload as JwtPayload;
};

export const getUserId = (req: {
  headers?: { authorization?: string };
}): string => {
  const token = req?.headers?.authorization?.replace('Bearer ', '');
  if (!token) {
    throw new Error('Not authenticated');
  }

  const payload = getTokenPayload(token);

  if (!payload.userId) {
    throw new Error('Invalid token: userId missing');
  }

  return payload.userId as string;
};
