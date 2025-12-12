# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Security Features

### Data Protection
- ✅ All data stored in encrypted Atlassian Forge Storage
- ✅ API keys encrypted and masked (only last 4 characters visible)
- ✅ No plain text storage of sensitive credentials
- ✅ HTTPS-only communication for all external APIs

### Access Control
- ✅ Admin-only access to AI settings and configuration
- ✅ Project-level permission checks via Jira APIs
- ✅ User authentication through Atlassian
- ✅ Forge permission scopes limit data access

### Code Security
- ✅ No SQL injection risks (using Forge Storage API)
- ✅ No XSS vulnerabilities (React escapes output by default)
- ✅ Input validation on all user inputs
- ✅ Error handling prevents information disclosure

### API Security
- ✅ Rate limiting via debouncing (300ms default)
- ✅ API calls through Forge proxy (no direct client exposure)
- ✅ External fetch limited to approved domains (manifest.yml)
- ✅ Authentication tokens never exposed to client

### Dependencies
- ✅ Production: 0 known vulnerabilities
- ⚠️ Dev dependencies: 2 moderate (build tools only, not in production)
- ✅ Regular dependency updates
- ✅ Uses npm audit for vulnerability scanning

## Reporting a Vulnerability

### How to Report

If you discover a security vulnerability, please report it responsibly:

1. **DO NOT** create a public GitHub issue
2. **Email**: security@yourcompany.com
3. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: 
  - Critical: 7 days
  - High: 14 days
  - Medium: 30 days
  - Low: 60 days

### What to Expect

1. **Acknowledgment**: We'll confirm receipt of your report
2. **Investigation**: We'll investigate and validate the issue
3. **Fix Development**: We'll develop and test a fix
4. **Disclosure**: We'll coordinate disclosure timing with you
5. **Credit**: We'll credit you in the fix announcement (if desired)

## Security Best Practices for Users

### For Administrators

1. **API Keys**:
   - Use environment-specific API keys (dev/staging/prod)
   - Rotate API keys regularly
   - Never share API keys in tickets or documentation
   - Use OpenRouter API keys with spending limits

2. **Access Control**:
   - Grant admin access only to trusted users
   - Review project permissions regularly
   - Use Jira's built-in audit logs

3. **Configuration**:
   - Test AI configuration in development first
   - Review generated test cases before saving
   - Use "Test Connection" before saving settings

### For Developers

1. **Local Development**:
   - Never commit API keys to Git
   - Use `.env` files (add to `.gitignore`)
   - Test with non-production data

2. **Deployment**:
   - Review manifest.yml permissions
   - Validate external fetch domains
   - Run `npm audit` before deploying

3. **Code Changes**:
   - Follow security checklist before merging
   - Test error handling paths
   - Validate all user inputs

## Security Checklist

Before deploying to production:

### Application Security
- [ ] All dependencies updated (`npm audit` shows 0 vulnerabilities)
- [ ] API keys stored encrypted (never in plain text)
- [ ] Input validation on all user inputs
- [ ] Error messages don't leak sensitive information
- [ ] HTTPS enforced for all external calls

### Forge Configuration
- [ ] `manifest.yml` permissions are minimal (principle of least privilege)
- [ ] External fetch domains limited to required services
- [ ] App scopes reviewed and justified
- [ ] Storage keys follow best practices

### Code Review
- [ ] No hardcoded credentials
- [ ] No console.log of sensitive data
- [ ] Error boundaries catch exceptions
- [ ] SQL/NoSQL injection prevented (using Forge Storage API)
- [ ] XSS prevention (React escaping)

### Testing
- [ ] Security tests passed
- [ ] Penetration testing completed (if applicable)
- [ ] Error handling tested
- [ ] Access control tested

## Known Security Considerations

### OpenRouter API
If you configure OpenRouter:
- API keys are stored encrypted in Forge Storage
- Keys are transmitted via HTTPS to OpenRouter
- You're responsible for managing OpenRouter API limits
- Consider using OpenRouter's spending limits feature

### Jira AI
If you enable Jira AI:
- Prompts are sent to Atlassian Intelligence
- Subject to Atlassian's AI terms and privacy policy
- Data processing happens within Atlassian infrastructure

### Data Storage
- All data stored in Atlassian Forge Storage (encrypted at rest)
- Storage is scoped to your Atlassian instance
- Data is NOT shared between instances
- Data is deleted when app is uninstalled

## Compliance

This app complies with:
- ✅ Atlassian Marketplace Security Requirements
- ✅ Forge Security Guidelines
- ✅ GDPR principles (data minimization, purpose limitation)
- ✅ OWASP Top 10 security practices

## Security Updates

Security updates are released as needed:
- **Critical**: Immediate release
- **High**: Within 7 days
- **Medium**: Next minor version
- **Low**: Next major version

## Contact

For security concerns:
- **Email**: security@yourcompany.com
- **PGP Key**: Available on request
- **Bug Bounty**: Not currently offered

---

**Last Updated**: December 9, 2025  
**Security Contact**: security@yourcompany.com
