# Support Guide

## Getting Help

### Documentation
- 📖 [User Guide](docs/USER_GUIDE.md) - Complete user manual
- 🚀 [Quick Start](docs/QUICKSTART.md) - Get started in 5 minutes
- 🎨 [Design System](docs/DESIGN_SYSTEM.md) - UI/UX guidelines
- 📋 [Features](docs/FEATURE_SPECIFICATIONS.md) - Detailed feature documentation
- 🚢 [Deployment](docs/DEPLOYMENT.md) - Installation and deployment guide

### Common Issues

#### Installation Problems

**Issue**: Cannot install Forge CLI
```bash
# Solution: Install with correct permissions
npm install -g @forge/cli

# If permission error on macOS/Linux
sudo npm install -g @forge/cli
```

**Issue**: Build fails
```bash
# Solution: Clear cache and rebuild
rm -rf node_modules package-lock.json
rm -rf static/*/node_modules static/*/package-lock.json
npm install
npm run build
```

#### App Not Loading

**Issue**: App doesn't appear in Jira
1. Check deployment: `forge list`
2. Verify installation: `forge install --upgrade`
3. Check permissions in manifest.yml
4. Check Forge logs: `forge logs --follow`

**Issue**: Blank screen or errors
1. Open browser console (F12)
2. Check for JavaScript errors
3. Verify all build artifacts exist in `static/*/build`
4. Try clearing browser cache

#### AI Features Not Working

**Issue**: AI generation fails
1. Check AI configuration in Settings
2. Verify API key if using OpenRouter
3. Test connection in AI Settings
4. Check provider selection (Auto/Jira/OpenRouter)
5. Review Forge logs for API errors

**Issue**: "Jira AI not available"
- Jira AI requires Atlassian Intelligence subscription
- Switch to OpenRouter in settings
- Or use template-based generation

#### Performance Issues

**Issue**: App loads slowly
1. Check network connection
2. Clear browser cache
3. Reduce number of test cases per page (use filters)
4. Check Forge logs for errors

**Issue**: Search is slow
- Searches are debounced (300ms)
- Use specific filters to narrow results
- Try searching by exact key (e.g., "TC-001")

### Feature Requests

Have an idea for improvement?

1. Check existing [GitHub Issues](https://github.com/yourcompany/cobaind-jira/issues)
2. Search [Feature Specifications](docs/FEATURE_SPECIFICATIONS.md)
3. Submit feature request with:
   - Clear description
   - Use case
   - Expected behavior
   - Why it's valuable

### Bug Reports

Found a bug?

1. Check [Known Issues](CHANGELOG.md#known-issues)
2. Verify in latest version
3. Try to reproduce
4. Submit bug report with:
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser and version
   - Screenshots
   - Console errors (F12)

### Security Issues

**DO NOT** create public issues for security vulnerabilities!

Email: security@yourcompany.com

Include:
- Description of vulnerability
- Steps to reproduce
- Potential impact
- Your contact information

We'll respond within 48 hours.

## Self-Service Resources

### Video Tutorials
*(Coming soon)*
- Getting Started
- Creating Test Cases
- Running Tests
- Using AI Features

### FAQ

**Q: How much does it cost?**  
A: Cobaind is [free/paid - update as needed]. Check Atlassian Marketplace for pricing.

**Q: What Jira versions are supported?**  
A: Jira Cloud only (Forge apps don't support Server/Data Center).

**Q: Can I export my test data?**  
A: Yes! Use the Export button to download CSV files.

**Q: Is my data secure?**  
A: Yes. All data is encrypted in Atlassian Forge Storage. See [Privacy Policy](PRIVACY.md).

**Q: Can I use my own AI models?**  
A: Yes! Configure OpenRouter and use custom models.

**Q: How do I delete all test data?**  
A: Uninstall the app from Jira. This deletes all app data.

**Q: Can I customize fields?**  
A: Currently supports standard fields. Custom fields coming in v1.1.0.

**Q: Does it integrate with automated tests?**  
A: API integration planned for v1.1.0. See [Roadmap](CHANGELOG.md#future-roadmap).

## Contact Support

### Email Support
**Email**: support@yourcompany.com  
**Response Time**: Within 24 hours (business days)

### GitHub Issues
**URL**: https://github.com/yourcompany/cobaind-jira/issues  
**Best For**: Bug reports, feature requests

### Community
*(If you have a community forum/Slack)*
- **Forum**: [Link to forum]
- **Slack**: [Link to Slack]
- **Discord**: [Link to Discord]

## Premium Support
*(If offering paid support)*

For priority support:
- 24/7 availability
- SLA guarantees
- Phone support
- Dedicated account manager

Contact: premium@yourcompany.com

## Training & Onboarding

Need help getting your team onboarded?

We offer:
- Team training sessions
- Custom workshops
- Best practices consultation
- Implementation support

Contact: training@yourcompany.com

## Troubleshooting Tools

### Check Deployment Status
```bash
forge list
```

### View Logs
```bash
# Tail logs in real-time
forge logs --follow

# Filter by level
forge logs --level error

# Recent logs
forge logs --limit 100
```

### Verify Build
```bash
# Check all builds exist
ls static/test-management/build/index.html
ls static/test-panel/build/index.html
ls static/test-glance/build/index.html
```

### Test in Development
```bash
# Run local tunnel
forge tunnel

# Deploy to development
forge deploy
```

### Environment Variables
```bash
# List environments
forge environments list

# Deploy to specific environment
forge deploy -e production
```

## System Requirements

### Minimum Requirements
- **Jira Cloud**: Latest version
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Internet**: Broadband connection
- **Permissions**: Project administrator (for AI settings)

### Recommended
- **Browser**: Latest Chrome or Edge
- **Screen**: 1920x1080 or higher
- **Memory**: 8GB RAM
- **Network**: Stable connection (for AI features)

## Known Limitations

### Current Version (1.0.0)
- Manual test execution only (no automation integration yet)
- CSV export only (PDF/Excel coming soon)
- Single project view (cross-project views in v1.2.0)
- No real-time collaboration (planned for v2.0.0)

See [Roadmap](CHANGELOG.md#future-roadmap) for upcoming features.

## Feedback

We value your feedback!

- **Quick Feedback**: Rate features in the app
- **Detailed Feedback**: Email feedback@yourcompany.com
- **Feature Voting**: Visit our [roadmap board]
- **Beta Testing**: Join our beta program

## Additional Resources

- 📚 [Complete Documentation](docs/)
- 🔒 [Security Policy](SECURITY.md)
- 🔐 [Privacy Policy](PRIVACY.md)
- 📝 [Changelog](CHANGELOG.md)
- 🤝 [Contributing](CONTRIBUTING.md)

---

**Last Updated**: December 9, 2025  
**Support Hours**: Monday-Friday, 9 AM - 5 PM UTC  
**Emergency**: security@yourcompany.com (security issues only)
