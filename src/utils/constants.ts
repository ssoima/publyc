

export const HOSTNAME = `${process.env.NODE_ENV === 'production' ? 'https' : 'http'}://${process.env.VERCEL_URL || 'localhost:3000'}`
