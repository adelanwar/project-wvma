# Security-Focused Dependency Configuration Templates

This document provides security-hardened configuration templates for various package managers and ecosystems.

## Table of Contents
- [Node.js (.npmrc)](#nodejs-npmrc)
- [Python (pip.conf)](#python-pipconf)
- [Rust (Cargo.toml)](#rust-cargotoml)
- [Go (Environment)](#go-environment)
- [PHP (composer.json)](#php-composerjson)
- [Docker (Best Practices)](#docker-best-practices)

---

## Node.js (.npmrc)

Create a `.npmrc` file in your project root:

```ini
# Security settings
audit=true
audit-level=moderate

# Prevent automatic package installation on npm install
package-lock=true
save-exact=true

# Use package-lock.json for reproducible builds
package-lock-only=false

# Integrity checking
integrity=true

# Prevent scripts from running during install (security)
# Remove this if you trust all your dependencies
ignore-scripts=false

# Use official npm registry (or your private registry)
registry=https://registry.npmjs.org/

# Require HTTPS for registry
strict-ssl=true

# Cache settings
cache-min=3600

# Update notifier
update-notifier=true

# Engine strict (enforce Node.js version)
engine-strict=true

# Prefer offline installations when possible
prefer-offline=true

# Legacy peer dependencies (set based on your needs)
legacy-peer-deps=false
```

### package.json Security Settings

```json
{
  "name": "your-project",
  "version": "1.0.0",
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  },
  "scripts": {
    "preinstall": "npx npm-force-resolutions",
    "audit": "npm audit --audit-level=moderate",
    "audit:fix": "npm audit fix",
    "outdated": "npm outdated",
    "security-check": "npx snyk test"
  },
  "devDependencies": {
    "npm-force-resolutions": "^0.0.10"
  },
  "resolutions": {
    "**/@package/vulnerable-dep": "^2.0.0"
  }
}
```

### npm Security Scripts

Add to your `package.json`:

```json
{
  "scripts": {
    "postinstall": "npm audit || true",
    "check:security": "npm audit && npm outdated",
    "check:licenses": "npx license-checker --production --onlyAllow 'MIT;Apache-2.0;BSD-2-Clause;BSD-3-Clause;ISC'",
    "check:all": "npm run check:security && npm run check:licenses"
  }
}
```

---

## Python (pip.conf)

Create `~/.config/pip/pip.conf` (Linux/Mac) or `%APPDATA%\pip\pip.ini` (Windows):

```ini
[global]
# Require HTTPS for package downloads
require-virtualenv = true
index-url = https://pypi.org/simple
trusted-host =
cert = /path/to/cert.pem

[install]
# Only install from official PyPI or your private index
no-index = false
trusted-host =
upgrade = false
upgrade-strategy = only-if-needed

[list]
format = columns

[freeze]
# Include all packages in freeze
all = false
```

### requirements.txt Best Practices

```txt
# Pin exact versions for production
Django==4.2.5
requests==2.31.0
celery==5.3.4

# Use hash checking for maximum security
# Generate with: pip-compile --generate-hashes requirements.in
Django==4.2.5 \
    --hash=sha256:abc123... \
    --hash=sha256:def456...

# Separate dev dependencies
# requirements-dev.txt
pytest==7.4.2
black==23.9.1
```

### pyproject.toml (Poetry)

```toml
[tool.poetry]
name = "your-project"
version = "0.1.0"

[tool.poetry.dependencies]
python = "^3.11"
# Use caret (^) for compatible updates, or exact (=) for frozen versions
django = "^4.2"

[tool.poetry.dev-dependencies]
pytest = "^7.4"
safety = "^2.3"

[tool.poetry.scripts]
security-check = "safety check"

[build-system]
requires = ["poetry-core>=1.0.0"]
build-backend = "poetry.core.masonry.api"
```

---

## Rust (Cargo.toml)

### Security-Focused Cargo.toml

```toml
[package]
name = "your-project"
version = "0.1.0"
edition = "2021"
rust-version = "1.70.0"  # Minimum Rust version

[dependencies]
# Use specific version ranges
serde = "1.0"  # Major version lock
tokio = { version = "1.32", features = ["full"] }

# Specify features explicitly to minimize code
reqwest = { version = "0.11", default-features = false, features = ["json", "rustls-tls"] }

[dev-dependencies]
cargo-audit = "0.18"

[profile.release]
# Security hardening
opt-level = 3
lto = true
codegen-units = 1
strip = true  # Remove symbols

[profile.dev]
# Faster development builds
opt-level = 0

[patch.crates-io]
# Patch vulnerable dependencies if needed
# vulnerable-crate = { git = "https://github.com/maintainer/fork", branch = "security-fix" }
```

### .cargo/config.toml

```toml
[source.crates-io]
replace-with = "vendored-sources"

[source.vendored-sources]
directory = "vendor"

[net]
# Require HTTPS
git-fetch-with-cli = true

[term]
verbose = false
color = "auto"

[build]
incremental = true
```

---

## Go (Environment)

### go.mod Security Settings

```go
module github.com/yourorg/yourproject

go 1.21

require (
    github.com/gin-gonic/gin v1.9.1
    github.com/lib/pq v1.10.9
)

// Replace vulnerable or unmaintained packages
replace (
    // Example: use fork with security fix
    github.com/vulnerable/package => github.com/secure/fork v1.2.3
)

// Exclude known vulnerable versions
exclude (
    github.com/some/package v1.0.0  // Known CVE
)
```

### Environment Variables

```bash
# go.env or shell profile
export GOSUMDB="sum.golang.org"  # Enable checksum verification
export GOPRIVATE="github.com/yourorg/*"  # Private modules
export GOPROXY="https://proxy.golang.org,direct"
export GONOPROXY="github.com/yourorg/*"
export GONOSUMDB="github.com/yourorg/*"

# Security: Verify modules
export GOFLAGS="-mod=readonly"  # Prevent automatic updates during build
```

### Makefile Security Checks

```makefile
.PHONY: security-check
security-check:
	@echo "Running security checks..."
	go list -json -m all | nancy sleuth
	govulncheck ./...
	go mod verify
	go list -u -m all

.PHONY: audit
audit: security-check
	@echo "Checking for outdated dependencies..."
	go list -u -m all | grep '\['
```

---

## PHP (composer.json)

### Security-Hardened composer.json

```json
{
    "name": "yourorg/yourproject",
    "type": "project",
    "license": "MIT",
    "require": {
        "php": "^8.2",
        "symfony/framework-bundle": "^6.3",
        "doctrine/orm": "^2.16"
    },
    "require-dev": {
        "phpunit/phpunit": "^10.3",
        "enlightn/security-checker": "^1.10"
    },
    "config": {
        "optimize-autoloader": true,
        "preferred-install": {
            "*": "dist"
        },
        "sort-packages": true,
        "allow-plugins": {
            "composer/package-versions-deprecated": true
        },
        "audit": {
            "abandoned": "report"
        },
        "secure-http": true,
        "platform-check": true
    },
    "scripts": {
        "post-install-cmd": [
            "@php vendor/bin/security-checker security:check"
        ],
        "post-update-cmd": [
            "@php vendor/bin/security-checker security:check"
        ],
        "security-check": "vendor/bin/security-checker security:check",
        "audit": "composer audit"
    },
    "minimum-stability": "stable",
    "prefer-stable": true
}
```

### auth.json (for private registries)

```json
{
    "http-basic": {
        "repo.yourorg.com": {
            "username": "${COMPOSER_AUTH_USER}",
            "password": "${COMPOSER_AUTH_PASS}"
        }
    },
    "github-oauth": {
        "github.com": "${GITHUB_TOKEN}"
    }
}
```

---

## Docker (Best Practices)

### Secure Dockerfile

```dockerfile
# Use specific version tags, not 'latest'
FROM node:18.17.0-alpine3.18 AS builder

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Set working directory
WORKDIR /app

# Copy dependency files first (layer caching)
COPY package*.json ./

# Install dependencies with audit
RUN npm ci --only=production && \
    npm audit fix && \
    npm cache clean --force

# Copy application code
COPY --chown=nodejs:nodejs . .

# Build application
RUN npm run build

# Production stage
FROM node:18.17.0-alpine3.18

# Install security updates
RUN apk --no-cache upgrade && \
    apk --no-cache add dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

# Copy from builder
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./

# Use non-root user
USER nodejs

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start application
CMD ["node", "dist/main.js"]

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node healthcheck.js
```

### .dockerignore

```
node_modules
npm-debug.log
.git
.gitignore
.env
.env.local
*.md
.DS_Store
coverage
.vscode
.idea
*.log
dist
build
```

### Docker Compose Security

```yaml
version: '3.8'

services:
  app:
    image: your-app:1.0.0
    build:
      context: .
      dockerfile: Dockerfile
    read_only: true
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE
    tmpfs:
      - /tmp
    environment:
      - NODE_ENV=production
    secrets:
      - db_password
    networks:
      - internal
    restart: unless-stopped

secrets:
  db_password:
    external: true

networks:
  internal:
    driver: bridge
```

---

## General Security Checklist

### Before Adding a Dependency

- [ ] Check package popularity and maintenance status
- [ ] Review recent issues and pull requests
- [ ] Check security advisories
- [ ] Verify package publisher reputation
- [ ] Review source code for suspicious behavior
- [ ] Check license compatibility
- [ ] Evaluate bundle size impact
- [ ] Look for actively maintained alternatives

### Regular Maintenance

- [ ] Weekly: Run security audits
- [ ] Weekly: Update patch versions
- [ ] Monthly: Review outdated dependencies
- [ ] Monthly: Clean unused dependencies
- [ ] Quarterly: Major version updates
- [ ] Quarterly: Full security review
- [ ] Yearly: Evaluate all dependencies

### Incident Response

1. **Detection**: Monitor security advisories
2. **Assessment**: Evaluate impact on your project
3. **Isolation**: Identify affected systems
4. **Remediation**: Update or replace dependency
5. **Testing**: Verify fix doesn't break functionality
6. **Deployment**: Roll out to production
7. **Documentation**: Record incident and resolution

---

## Tools Configuration

### Snyk Configuration (.snyk)

```yaml
# Snyk configuration
version: v1.22.0

# Ignore specific vulnerabilities (use sparingly!)
ignore:
  'SNYK-JS-LODASH-1234567':
    - '*':
        reason: 'Not exploitable in our use case'
        expires: '2024-12-31'

# Exclude paths from scanning
exclude:
  global:
    - '**/test/**'
    - '**/docs/**'

# Language-specific settings
language-settings:
  javascript:
    ignore-devDependencies: false
```

### OSSF Scorecard

```yaml
# .github/workflows/scorecard.yml
name: OSSF Scorecard
on:
  schedule:
    - cron: '0 0 * * 0'
  workflow_dispatch:

permissions: read-all

jobs:
  analysis:
    name: Scorecard analysis
    runs-on: ubuntu-latest
    permissions:
      security-events: write
      id-token: write

    steps:
      - uses: actions/checkout@v4
      - uses: ossf/scorecard-action@v2
        with:
          results_file: results.sarif
          results_format: sarif

      - uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: results.sarif
```

---

**Last Updated**: 2026-01-21
**Security is a continuous process, not a one-time task!**
