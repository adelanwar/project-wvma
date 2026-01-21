# Dependency Audit Guide

## Overview
This guide provides comprehensive procedures for auditing project dependencies across different ecosystems to identify outdated packages, security vulnerabilities, and unnecessary bloat.

## Table of Contents
- [Node.js / npm / yarn](#nodejs--npm--yarn)
- [Python / pip / poetry](#python--pip--poetry)
- [Rust / Cargo](#rust--cargo)
- [Go](#go)
- [PHP / Composer](#php--composer)
- [General Best Practices](#general-best-practices)

---

## Node.js / npm / yarn

### Check for Outdated Packages
```bash
# npm
npm outdated

# yarn
yarn outdated

# Show latest versions
npm outdated --long
```

### Security Vulnerability Scan
```bash
# npm audit (built-in)
npm audit
npm audit --json  # JSON output for parsing

# Automatically fix vulnerabilities
npm audit fix
npm audit fix --force  # May introduce breaking changes

# yarn
yarn audit
yarn audit --json

# Using snyk (recommended)
npm install -g snyk
snyk test
snyk monitor  # Continuous monitoring
```

### Analyze Bundle Size and Bloat
```bash
# Install analysis tools
npm install -g npm-check
npm install -g depcheck
npm install -g bundle-phobia-cli

# Check for unused dependencies
depcheck

# Interactive update tool
npm-check -u

# Check package size impact
npx bundle-phobia <package-name>

# Analyze what's in node_modules
npx npkill  # Interactive cleanup tool
du -sh node_modules/  # Total size
```

### Best Practices
- Keep `package.json` and `package-lock.json` in version control
- Use exact versions for critical dependencies (no `^` or `~`)
- Regularly update dependencies (weekly/monthly)
- Review changelogs before major version updates
- Use `.npmrc` to configure registry and security settings

---

## Python / pip / poetry

### Check for Outdated Packages
```bash
# pip
pip list --outdated

# pip-review (more features)
pip install pip-review
pip-review

# poetry
poetry show --outdated
```

### Security Vulnerability Scan
```bash
# safety (recommended)
pip install safety
safety check
safety check --json
safety check --file requirements.txt

# pip-audit (official)
pip install pip-audit
pip-audit

# Snyk for Python
snyk test --file=requirements.txt
```

### Analyze Bloat and Unused Dependencies
```bash
# Check installed package sizes
pip list --format=freeze | xargs pip show | grep -E 'Name|Size'

# Find unused dependencies
pip install pipdeptree
pipdeptree --warn silence

# Poetry dependency tree
poetry show --tree

# Check for conflicting dependencies
pip check
```

### Best Practices
- Pin exact versions in `requirements.txt` for production
- Use `requirements-dev.txt` for development dependencies
- Consider using Poetry or Pipenv for better dependency management
- Use virtual environments (venv/virtualenv)
- Regularly regenerate lock files

---

## Rust / Cargo

### Check for Outdated Packages
```bash
# Install cargo-outdated
cargo install cargo-outdated

# Check for outdated dependencies
cargo outdated

# Show all versions
cargo outdated -R
```

### Security Vulnerability Scan
```bash
# Install cargo-audit
cargo install cargo-audit

# Scan for vulnerabilities
cargo audit

# Automatically update vulnerable dependencies
cargo audit fix
```

### Analyze Bloat
```bash
# Install cargo-tree
cargo install cargo-tree

# Show dependency tree
cargo tree

# Show duplicate dependencies
cargo tree --duplicates

# Analyze build times
cargo install cargo-bloat
cargo bloat --release

# Check binary size contributors
cargo bloat --release --crates
```

### Best Practices
- Use `Cargo.lock` in version control for applications
- Specify compatible version ranges in `Cargo.toml`
- Use `cargo update` carefully
- Review feature flags to minimize dependencies

---

## Go

### Check for Outdated Packages
```bash
# List all dependencies
go list -m all

# Check for updates
go list -u -m all

# Using go-mod-outdated
go install github.com/psampaz/go-mod-outdated@latest
go list -u -m -json all | go-mod-outdated
```

### Security Vulnerability Scan
```bash
# govulncheck (official)
go install golang.org/x/vuln/cmd/govulncheck@latest
govulncheck ./...

# nancy (Sonatype)
go list -json -m all | nancy sleuth
```

### Analyze Bloat
```bash
# Show dependency graph
go mod graph

# Why is this dependency included?
go mod why <package>

# Clean up unused dependencies
go mod tidy

# Verify dependencies
go mod verify
```

### Best Practices
- Run `go mod tidy` regularly
- Use `go.sum` for integrity verification
- Minimize indirect dependencies
- Use vendoring for critical projects (`go mod vendor`)

---

## PHP / Composer

### Check for Outdated Packages
```bash
# Show outdated packages
composer outdated

# Show only direct dependencies
composer outdated --direct

# Show security-only updates
composer outdated --minor-only
```

### Security Vulnerability Scan
```bash
# Using Local PHP Security Checker
composer require --dev enlightn/security-checker
php artisan security-check:now

# Or use the standalone checker
composer global require enlightn/security-checker
security-checker security:check composer.lock

# Roave Security Advisories (automatic)
composer require --dev roave/security-advisories:dev-latest
```

### Analyze Bloat
```bash
# Show dependency tree
composer show --tree

# Show platform dependencies
composer show --platform

# Find unused packages
composer unused

# Check for duplicate dependencies
composer validate
```

### Best Practices
- Commit `composer.lock` to version control
- Use `composer.json` for version constraints
- Separate dev and production dependencies
- Run `composer update` with caution

---

## General Best Practices

### 1. **Dependency Review Process**
- Review dependencies before adding them
- Check maintenance status (last commit, issues, downloads)
- Evaluate alternatives
- Read the source code for critical dependencies
- Check license compatibility

### 2. **Version Management**
- Use semantic versioning understanding: `MAJOR.MINOR.PATCH`
- Lock patch versions for stability: `1.2.x`
- Review breaking changes before major updates
- Test updates in staging before production

### 3. **Security Practices**
- Enable automated security alerts (Dependabot, Snyk)
- Subscribe to security mailing lists
- Have an update schedule (weekly/monthly)
- Don't ignore security warnings
- Use private registries for internal packages

### 4. **Bloat Prevention**
- Regularly audit dependencies
- Remove unused dependencies immediately
- Avoid dependencies for trivial functionality
- Consider bundle size impact for frontend
- Use tree-shaking and dead code elimination

### 5. **Automation**
- Set up CI/CD dependency checks
- Automate security scans
- Use bots for dependency updates (Dependabot, Renovate)
- Monitor dependency freshness
- Track bundle size over time

### 6. **Documentation**
- Document why each dependency is needed
- Keep a changelog of dependency updates
- Note known issues with specific versions
- Document any patches or workarounds

---

## Recommended Tools

### Multi-Language
- **Snyk**: Comprehensive security scanning
- **Dependabot**: Automated dependency updates (GitHub)
- **Renovate**: Advanced dependency update automation
- **FOSSA**: License and security compliance
- **WhiteSource**: Enterprise dependency management

### Monitoring Services
- **Socket.dev**: Real-time dependency monitoring
- **deps.dev**: Google's dependency analysis
- **Libraries.io**: Dependency tracking

### CI/CD Integration
- GitHub Security Advisories
- GitLab Dependency Scanning
- CircleCI Orbs for security scanning

---

## Audit Checklist

Use this checklist when performing a dependency audit:

- [ ] Run outdated package check
- [ ] Run security vulnerability scan
- [ ] Review security report and prioritize fixes
- [ ] Check for unused dependencies
- [ ] Analyze dependency tree for duplicates
- [ ] Review licenses for compliance
- [ ] Check bundle/binary size
- [ ] Test updates in development environment
- [ ] Update documentation
- [ ] Commit lock files
- [ ] Run full test suite
- [ ] Deploy to staging
- [ ] Monitor for issues

---

## Emergency Security Update Process

1. **Identify**: Receive security advisory
2. **Assess**: Determine impact on your project
3. **Test**: Update in isolated environment
4. **Validate**: Run full test suite
5. **Deploy**: Fast-track to production if critical
6. **Monitor**: Watch for related issues
7. **Document**: Record the incident and resolution

---

## Additional Resources

- [OWASP Dependency Check](https://owasp.org/www-project-dependency-check/)
- [npm Security Best Practices](https://docs.npmjs.com/security-best-practices)
- [Cargo Security Advisory Database](https://rustsec.org/)
- [Go Vulnerability Database](https://vuln.go.dev/)
- [Python Package Index Security](https://pypi.org/security/)

---

**Last Updated**: 2026-01-21
