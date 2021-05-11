This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Motivation

When previewing in Vercel, allow access only by specific IPs.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

In the preview mode, please set environment variables.
```
ALLOW_FROM: your internal IP address
AUTH_KEY: random string
```

## Previewing

Access /api/auth/ from the IP address specified by `ALLOW_FROM` in advance. A cookie will be given for authentication.  
After that, you will be able to access the site as usual.

By the rewrites rule, access without an authentication cookie will be denied.
