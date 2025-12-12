# Contributing to Cobaind Test Management

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Code of Conduct

### Our Standards
- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Prioritize project goals

## How to Contribute

### Reporting Bugs

**Before submitting:**
1. Check existing issues
2. Use the latest version
3. Verify it's reproducible

**Bug Report Should Include:**
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Environment details (Forge version, Node version, browser)
- Screenshots if applicable

### Suggesting Features

**Feature Request Should Include:**
- Clear use case
- Expected behavior
- Why it's valuable
- Mockups/examples if applicable

### Pull Requests

**Before Starting:**
1. Check existing PRs
2. Discuss major changes in an issue first
3. Follow coding standards

**PR Guidelines:**
- One feature/fix per PR
- Include tests if applicable
- Update documentation
- Follow commit message conventions
- Keep changes focused and atomic

## Development Setup

```bash
# Clone repository
git clone https://github.com/yourcompany/cobaind-jira.git
cd cobaind-jira

# Install dependencies
npm install

# Build UI components
npm run build

# Deploy to development
forge deploy
```

## Coding Standards

### JavaScript/React
- Use ES6+ features
- Follow React best practices
- Use functional components with hooks
- Avoid inline styles (use DESIGN_TOKENS)
- Add PropTypes or TypeScript types

### Code Style
- 2 spaces indentation
- Use semicolons
- Use single quotes for strings
- Max line length: 120 characters
- Use meaningful variable names

### Comments
- Document complex logic
- Use JSDoc for functions
- Explain "why" not "what"

### File Structure
```
src/
  index.js           # Main resolver
  services/          # Business logic
  utils/             # Helper functions
static/
  test-management/   # Main UI
    src/
      components/    # React components
      utils/         # UI utilities
```

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, semicolons, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding missing tests
- `chore`: Changes to build process or auxiliary tools

**Examples:**
```
feat(ai): add support for custom AI models
fix(test-case): resolve duplicate key issue in test steps
docs(readme): update installation instructions
```

## Testing

### Before Submitting PR
```bash
# Build all components
npm run build

# Run linter (if configured)
npm run lint

# Test in development
forge tunnel

# Test in production-like environment
forge deploy -e staging
```

### Manual Testing Checklist
- [ ] Test case CRUD operations
- [ ] Test suite management
- [ ] Test run execution
- [ ] AI generation features
- [ ] Search and filtering
- [ ] Bulk operations
- [ ] Error handling
- [ ] Different screen sizes

## Documentation

Update documentation for:
- New features
- Breaking changes
- Configuration changes
- API changes

**Documentation Files:**
- `README.md` - Overview and quick start
- `docs/USER_GUIDE.md` - User documentation
- `docs/FEATURE_SPECIFICATIONS.md` - Feature details
- `CHANGELOG.md` - Version history

## Review Process

1. **Automated Checks**: Linting, build verification
2. **Code Review**: At least one maintainer approval
3. **Testing**: Manual testing by reviewer
4. **Merge**: Squash and merge to main

## Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create release branch
4. Test thoroughly
5. Merge to main
6. Tag release
7. Deploy to production
8. Create GitHub release

## Getting Help

- **Documentation**: Check `docs/` folder
- **Issues**: Search existing issues
- **Discussions**: Use GitHub Discussions
- **Contact**: support@yourcompany.com

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Cobaind Test Management! 🎉
