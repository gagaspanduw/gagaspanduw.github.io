# Privacy Policy - Cobaind Test Management

**Effective Date**: December 9, 2025  
**Last Updated**: December 9, 2025

## Overview

Cobaind Test Management ("the App") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you use our Atlassian Forge application.

## Information We Collect

### 1. Data Stored in Forge Storage
The App stores the following data using Atlassian Forge's secure storage:

- **Test Cases**: Test case details, steps, preconditions, expected results
- **Test Suites**: Suite names, descriptions, test case associations
- **Test Runs**: Test execution records, results, notes, attachments
- **Test Folders**: Folder structures and organization data
- **AI Configuration**: Provider preferences, API configurations (encrypted)
- **Project Settings**: Project-specific configuration preferences

### 2. Jira Data Access
The App accesses the following Jira data through Atlassian APIs:

- **Projects**: Project information for test case organization
- **Issues**: Issue details for test case linking and AI generation
- **Users**: User information for test execution tracking
- **Custom Fields**: Test status and priority custom fields

### 3. AI Service Data
When using AI features:

- **Jira AI**: Prompts are sent to Atlassian's AI service (subject to Atlassian's Privacy Policy)
- **OpenRouter** (Optional): If configured, prompts are sent to OpenRouter API
  - API keys are stored encrypted in Forge Storage
  - Only masked keys (last 4 characters) are displayed to users
  - You control which AI provider to use

## How We Use Your Data

### Data Usage
- **Test Management**: Store and retrieve test cases, suites, and execution results
- **AI Generation**: Generate test cases based on Jira issue context (when requested)
- **Analytics**: Display test metrics and coverage statistics
- **Jira Integration**: Link tests to issues, create defect reports

### Data Processing
- All data is processed within Atlassian's Forge infrastructure
- No data is sent to external servers except:
  - OpenRouter API (only if you configure and enable it)
  - Jira AI (only if you enable Jira AI features)

## Data Storage & Security

### Storage Location
- All data is stored in **Atlassian Forge Storage** (encrypted at rest)
- Storage is scoped to your Atlassian Cloud instance
- Data is not shared between different Atlassian instances

### Security Measures
- ✅ **Encrypted Storage**: All sensitive data encrypted using Forge Storage
- ✅ **API Key Masking**: API keys displayed with only last 4 characters visible
- ✅ **Admin-Only Settings**: AI configuration restricted to project administrators
- ✅ **Secure APIs**: All API calls use HTTPS encryption
- ✅ **Access Control**: Forge permission scopes limit data access

### API Keys
- OpenRouter API keys (if configured) are:
  - Stored encrypted in Forge Storage
  - Never logged or exposed in plain text
  - Only accessible by administrators
  - Masked in UI (shows only last 4 characters)

## Data Retention

### Retention Period
- **Test Data**: Retained until manually deleted by users
- **Execution History**: Retained until test run is deleted
- **Configuration**: Retained until app is uninstalled

### Data Deletion
Users can delete data:
- **Test Cases**: Delete individual test cases or bulk delete
- **Test Suites**: Delete entire suites
- **Test Runs**: Delete test execution records
- **Folders**: Delete folders (moves contents to root)
- **App Uninstall**: All app data is deleted when app is uninstalled

## Third-Party Services

### Atlassian Services
- **Jira Cloud**: Used for core functionality (subject to [Atlassian Privacy Policy](https://www.atlassian.com/legal/privacy-policy))
- **Forge Platform**: Hosting and storage infrastructure
- **Jira AI** (Optional): If enabled, prompts sent to Atlassian Intelligence

### OpenRouter (Optional)
- Only used if you explicitly configure it
- API keys stored encrypted
- Subject to [OpenRouter's Terms](https://openrouter.ai/terms)
- You control what data is sent via AI prompts

## User Rights

You have the right to:
- ✅ **Access**: View all your test data within the app
- ✅ **Export**: Export test cases to CSV format
- ✅ **Delete**: Delete any test data at any time
- ✅ **Control**: Enable/disable AI features
- ✅ **Configure**: Choose AI provider (Jira AI, OpenRouter, or none)

## Compliance

### GDPR Compliance
- Data minimization: We collect only necessary data
- Purpose limitation: Data used only for test management
- Right to deletion: Users can delete data anytime
- Data portability: Export functionality provided

### Data Processing Agreement
This app operates under Atlassian's Data Processing Agreement as a Forge application.

## Children's Privacy

This App is not directed to individuals under 18. We do not knowingly collect personal information from children.

## Changes to Privacy Policy

We may update this Privacy Policy. Changes will be posted here with an updated "Last Updated" date. Continued use of the App after changes constitutes acceptance.

## Contact & Support

For privacy concerns or questions:

- **Support**: [Create an issue on GitHub](https://github.com/yourcompany/cobaind-jira/issues)
- **Email**: support@yourcompany.com
- **Documentation**: [View Privacy Documentation](docs/README.md)

## Atlassian Marketplace Compliance

This app complies with:
- [Atlassian Marketplace Guidelines](https://developer.atlassian.com/platform/marketplace/guidelines/)
- [Forge Security Requirements](https://developer.atlassian.com/platform/forge/security/)
- [Atlassian Privacy Policy](https://www.atlassian.com/legal/privacy-policy)

---

**Data Controller**: Your Organization  
**Forge App ID**: `ari:cloud:ecosystem::app/31556e19-8903-4e45-9870-99df1cf0da88`

Last reviewed: December 9, 2025
