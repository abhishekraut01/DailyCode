import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { prisma } from '@repo/db/prisma';

export async function createSession(userId: string, ip?: string, ua?: string): Promise<{
  accessToken: string;
  refreshToken: string;
}> {
  try {
    // 1. Generate access token (JWT)
    const accessToken = jwt.sign(
      { sub: userId },
      process.env.JWT_ACCESS_SECRET!,
      //todo : add ACCESS_TOKEN_EXPIRY from .env
      { expiresIn: '360m' }
    );

    // 2. Generate RANDOM refresh token (not a JWT)
    const refreshTokenId = randomBytes(48).toString('hex');

    // 3. Calculate expiry
    const refreshExpiresAt = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
    );

    // 4. Store random token in DB
    await prisma.session.create({
      data: {
        userId,
        refreshToken: refreshTokenId, // Random string
        ip,
        userAgent: ua,
        expiresAt: refreshExpiresAt,
      },
    });

    // 5. Create JWT that references the random token
    const refreshJWT = jwt.sign(
      { sub: userId, tokenId: refreshTokenId },
      process.env.JWT_REFRESH_SECRET!,
      {
        expiresIn: '30d',
      }
    );

    // 6. Return JWT to client
    return {
      accessToken,
      refreshToken: refreshJWT, // Client gets JWT, DB has random string
    };
  } catch (error) {
    console.error('Session creation failed:', error);
    throw new Error('Failed to create session');
  }
}