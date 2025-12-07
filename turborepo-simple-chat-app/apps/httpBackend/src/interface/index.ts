export interface Ioptions {
  secure: boolean;
  httpOnly: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export const options: Ioptions = {
  secure: true,
  httpOnly: true,
  sameSite: 'none',
};

export interface RefreshTokenPayload {
  sub: string;      
  tokenId: string;  
  iat?: number;
  exp?: number;
}