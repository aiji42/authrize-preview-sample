import { NextApiHandler } from 'next'
import { setCookie } from '../../util/setCookie'

const handler: NextApiHandler = (req, res) => {
  if (process.env.AUTH_KEY && process.env.ALLOW_FROM && req.headers['x-forwarded-for']?.includes(process.env.ALLOW_FROM)) {
    setCookie(res, 'x-custom-authorized', process.env.AUTH_KEY, { path: '/' })
    res.end(res.getHeader('Set-Cookie'))
    return
  }
  res.status(401).json({ message: 'Unauthorized' })
}

export default handler
