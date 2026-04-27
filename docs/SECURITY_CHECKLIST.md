# Security Checklist

## Implemented

- No API keys or secrets in frontend.
- Query params are validated with Zod in API routes.
- Security headers configured in `next.config.ts`.
- CSP, frame protection, content type protection and referrer policy are set.
- No `eval` or arbitrary script execution is used in app code.
- Analytics is abstracted and has no third-party key.
- Forms are not public in phase 1, avoiding unvalidated submission surfaces.

## Required Before Production

- Review `npm audit` and upgrade transitive vulnerable packages where possible.
- Replace `'unsafe-inline'` and `'unsafe-eval'` CSP allowances with nonce/hash policy if production WebGL stack allows it.
- Add rate limiting and honeypot/captcha before public forms.
- Sanitize CMS/MDX content before enabling external editorial input.
- Validate licensed 3D asset sources and maintain license records.
