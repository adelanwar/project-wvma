# Dependency Audit Framework

A comprehensive framework for auditing project dependencies across multiple programming languages and package managers. This framework helps identify outdated packages, security vulnerabilities, and unnecessary bloat in your projects.

## 📋 Overview

This repository contains tools and documentation for automated dependency auditing:

- **Multi-language support**: Node.js, Python, Rust, Go, PHP
- **Security scanning**: Automated vulnerability detection
- **Outdated package detection**: Track available updates
- **Bloat analysis**: Identify unused and duplicate dependencies
- **CI/CD integration**: GitHub Actions workflows
- **Automated updates**: Dependabot configuration

## 🚀 Quick Start

### Prerequisites

Install the necessary tools for your ecosystem:

**Node.js:**
```bash
npm install -g depcheck npm-check snyk
```

**Python:**
```bash
pip install safety pip-audit pipdeptree
```

**Rust:**
```bash
cargo install cargo-audit cargo-outdated
```

**Go:**
```bash
go install golang.org/x/vuln/cmd/govulncheck@latest
```

**PHP:**
```bash
composer global require enlightn/security-checker
```

### Run Manual Audit

```bash
# Make the script executable
chmod +x scripts/audit-dependencies.sh

# Run the audit
./scripts/audit-dependencies.sh
```

This will:
1. Auto-detect your project type(s)
2. Run appropriate audits
3. Generate a detailed markdown report

## 📁 Files Included

### Documentation
- **`DEPENDENCY_AUDIT.md`** - Comprehensive guide for dependency auditing across all ecosystems

### Scripts
- **`scripts/audit-dependencies.sh`** - Automated audit script that detects project type and runs appropriate checks

### CI/CD
- **`.github/workflows/dependency-audit.yml`** - GitHub Actions workflow for automated audits
- **`.dependabot.yml`** - Dependabot configuration for automated dependency updates

## 🔍 What Gets Audited

### Security Vulnerabilities
- Known CVEs in dependencies
- Outdated packages with security fixes
- Malicious packages
- License compliance issues

### Outdated Packages
- Available updates (major, minor, patch)
- Breaking changes in new versions
- Deprecation warnings
- End-of-life packages

### Bloat & Optimization
- Unused dependencies
- Duplicate dependencies
- Bundle/binary size analysis
- Dependency tree complexity
- Optional dependencies

## 🤖 Automated Workflows

### GitHub Actions

The included workflow runs automatically:
- **On push** to main/master/develop branches
- **On pull requests** to main/master/develop
- **Weekly** every Monday at 9 AM UTC
- **Manually** via workflow dispatch

### Dependabot

Configured to:
- Check for updates weekly
- Group minor/patch updates to reduce PR noise
- Auto-label PRs by ecosystem
- Create security updates immediately

### Setup Instructions

1. **Enable Dependabot:**
   - Already configured via `.dependabot.yml`
   - No additional setup needed

2. **Configure Snyk (Optional but Recommended):**
   ```bash
   # Sign up at https://snyk.io
   # Get your token
   # Add to GitHub Secrets as SNYK_TOKEN
   ```

3. **Update reviewer teams:**
   - Edit `.dependabot.yml`
   - Replace `your-team/reviewers` with your team name

## 📊 Reading Audit Reports

The audit script generates a timestamped markdown report with sections for each ecosystem:

```
dependency-audit-report-20260121-093045.md
├── Node.js Dependencies
│   ├── Outdated Packages
│   ├── Security Vulnerabilities
│   ├── Unused Dependencies
│   └── Bundle Size
├── Python Dependencies
│   ├── Outdated Packages
│   ├── Security Vulnerabilities
│   └── Dependency Conflicts
└── [Other ecosystems...]
```

### Severity Levels

**Critical/High** → Fix immediately
- Known exploits
- Active vulnerabilities
- Major security issues

**Medium** → Fix soon (within a week)
- Potential security issues
- Important updates
- Deprecated packages

**Low** → Address in next sprint
- Minor updates
- Code quality improvements
- Non-critical warnings

## 🛠️ Manual Audit Commands

### Node.js
```bash
# Check outdated
npm outdated

# Security audit
npm audit
npm audit fix

# Unused dependencies
npx depcheck

# Advanced scanning
npx snyk test
```

### Python
```bash
# Check outdated
pip list --outdated

# Security scanning
safety check
pip-audit

# Dependency tree
pipdeptree
```

### Rust
```bash
# Check outdated
cargo outdated

# Security audit
cargo audit

# Duplicates
cargo tree --duplicates
```

### Go
```bash
# Check outdated
go list -u -m all

# Security scan
govulncheck ./...

# Verify integrity
go mod verify
```

### PHP
```bash
# Check outdated
composer outdated

# Security check
security-checker security:check composer.lock

# Validate
composer validate
```

## 🔐 Security Best Practices

1. **Never ignore security warnings** - Always investigate and fix
2. **Review updates before applying** - Check changelogs and breaking changes
3. **Test in staging first** - Don't update directly in production
4. **Pin versions for stability** - Use exact versions in production
5. **Monitor continuously** - Don't just audit once
6. **Keep lock files in version control** - Ensures reproducible builds
7. **Use private registries** - For internal packages
8. **Enable 2FA** - On package registry accounts

## 📈 Metrics to Track

- **Mean Time to Update (MTTU)**: How quickly you update after release
- **Mean Time to Remediate (MTTR)**: How quickly you fix vulnerabilities
- **Dependency Freshness**: Percentage of up-to-date dependencies
- **Vulnerability Exposure**: Number and severity of open vulnerabilities
- **Bundle Size**: Track over time to prevent bloat
- **Dependency Count**: Minimize for better security

## 🎯 Recommended Update Schedule

- **Security patches**: Immediately
- **Patch updates**: Weekly
- **Minor updates**: Bi-weekly or monthly
- **Major updates**: Quarterly (with testing)
- **Full audit**: Monthly
- **Cleanup unused**: Quarterly

## 🤝 Contributing

When adding dependencies to this project:

1. Run audit before and after adding dependency
2. Document why the dependency is needed
3. Check for alternatives with better security/size
4. Ensure it's actively maintained
5. Verify license compatibility
6. Update this README if adding new tools

## 📚 Additional Resources

- [OWASP Dependency Check](https://owasp.org/www-project-dependency-check/)
- [Snyk Documentation](https://docs.snyk.io/)
- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)
- [GitHub Security Advisories](https://github.com/advisories)
- [npm Security Best Practices](https://docs.npmjs.com/security-best-practices)
- [RustSec Advisory Database](https://rustsec.org/)
- [Go Vulnerability Database](https://vuln.go.dev/)

## 📝 License

This framework is provided as-is for use in your projects. Modify as needed for your organization's requirements.

## 🆘 Support

For issues or questions:
1. Check `DEPENDENCY_AUDIT.md` for detailed guidance
2. Review your ecosystem's official security documentation
3. Consult your security team for policy questions

---

**Last Updated**: 2026-01-21
**Maintained By**: Your Team Name
