import { serialize, CookieSerializeOptions } from 'cookie'
import { NextApiResponse, NextApiHandler } from 'next'

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge)
    options.maxAge /= 1000
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options))
}

const handler: NextApiHandler = (req, res) => {
  if (process.env.AUTH_KEY && process.env.ALLOW_FROM && req.headers['x-forwarded-for']?.includes(process.env.ALLOW_FROM)) {
    setCookie(res, 'x-custom-authorized', process.env.AUTH_KEY, { path: '/' })
    res.end(res.getHeader('Set-Cookie'))
    return
  }
  res.status(401).json({ message: 'Unauthorized' })
}

export default handler