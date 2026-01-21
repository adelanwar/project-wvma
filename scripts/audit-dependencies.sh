#!/bin/bash

###############################################################################
# Dependency Audit Script
# Automatically detects project type and runs appropriate dependency audits
###############################################################################

set -e

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Output formatting
print_header() {
    echo -e "\n${BLUE}════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}════════════════════════════════════════════════════════${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

# Check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Initialize report
REPORT_FILE="dependency-audit-report-$(date +%Y%m%d-%H%M%S).md"
echo "# Dependency Audit Report" > "$REPORT_FILE"
echo "**Generated**: $(date)" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

###############################################################################
# Node.js / npm / yarn
###############################################################################
audit_nodejs() {
    print_header "Node.js Dependency Audit"

    if [ ! -f "package.json" ]; then
        print_info "No package.json found, skipping Node.js audit"
        return
    fi

    echo "## Node.js Dependencies" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"

    # Check for outdated packages
    print_info "Checking for outdated packages..."
    if command_exists npm; then
        echo "### Outdated Packages" >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        npm outdated >> "$REPORT_FILE" 2>&1 || true
        echo '```' >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
    fi

    # Security audit
    print_info "Running security audit..."
    if command_exists npm; then
        echo "### Security Vulnerabilities (npm audit)" >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        npm audit >> "$REPORT_FILE" 2>&1 || print_warning "npm audit found issues"
        echo '```' >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
    fi

    # Check with snyk if available
    if command_exists snyk; then
        print_info "Running Snyk security scan..."
        echo "### Security Vulnerabilities (Snyk)" >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        snyk test --json >> "$REPORT_FILE" 2>&1 || print_warning "Snyk found vulnerabilities"
        echo '```' >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
    fi

    # Check for unused dependencies
    if command_exists depcheck; then
        print_info "Checking for unused dependencies..."
        echo "### Unused Dependencies" >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        depcheck >> "$REPORT_FILE" 2>&1 || true
        echo '```' >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
    else
        print_warning "depcheck not installed. Install with: npm install -g depcheck"
    fi

    # Bundle size analysis
    print_info "Analyzing node_modules size..."
    if [ -d "node_modules" ]; then
        MODULES_SIZE=$(du -sh node_modules/ 2>/dev/null | cut -f1)
        echo "### Bundle Size" >> "$REPORT_FILE"
        echo "- **node_modules size**: $MODULES_SIZE" >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
        print_info "node_modules size: $MODULES_SIZE"
    fi

    print_success "Node.js audit complete"
}

###############################################################################
# Python / pip
###############################################################################
audit_python() {
    print_header "Python Dependency Audit"

    if [ ! -f "requirements.txt" ] && [ ! -f "Pipfile" ] && [ ! -f "pyproject.toml" ]; then
        print_info "No Python dependency files found, skipping Python audit"
        return
    fi

    echo "## Python Dependencies" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"

    # Check for outdated packages
    print_info "Checking for outdated packages..."
    if command_exists pip; then
        echo "### Outdated Packages" >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        pip list --outdated >> "$REPORT_FILE" 2>&1 || true
        echo '```' >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
    fi

    # Security audit with safety
    if command_exists safety; then
        print_info "Running safety security scan..."
        echo "### Security Vulnerabilities (Safety)" >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        safety check >> "$REPORT_FILE" 2>&1 || print_warning "Safety found vulnerabilities"
        echo '```' >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
    else
        print_warning "safety not installed. Install with: pip install safety"
    fi

    # Security audit with pip-audit
    if command_exists pip-audit; then
        print_info "Running pip-audit security scan..."
        echo "### Security Vulnerabilities (pip-audit)" >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        pip-audit >> "$REPORT_FILE" 2>&1 || print_warning "pip-audit found vulnerabilities"
        echo '```' >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
    else
        print_warning "pip-audit not installed. Install with: pip install pip-audit"
    fi

    # Check for dependency conflicts
    if command_exists pip; then
        print_info "Checking for dependency conflicts..."
        echo "### Dependency Conflicts" >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        pip check >> "$REPORT_FILE" 2>&1 || print_warning "Dependency conflicts found"
        echo '```' >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
    fi

    print_success "Python audit complete"
}

###############################################################################
# Rust / Cargo
###############################################################################
audit_rust() {
    print_header "Rust Dependency Audit"

    if [ ! -f "Cargo.toml" ]; then
        print_info "No Cargo.toml found, skipping Rust audit"
        return
    fi

    echo "## Rust Dependencies" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"

    # Check for outdated packages
    if command_exists cargo-outdated; then
        print_info "Checking for outdated packages..."
        echo "### Outdated Packages" >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        cargo outdated >> "$REPORT_FILE" 2>&1 || true
        echo '```' >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
    else
        print_warning "cargo-outdated not installed. Install with: cargo install cargo-outdated"
    fi

    # Security audit
    if command_exists cargo-audit; then
        print_info "Running cargo audit..."
        echo "### Security Vulnerabilities" >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        cargo audit >> "$REPORT_FILE" 2>&1 || print_warning "cargo audit found vulnerabilities"
        echo '```' >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
    else
        print_warning "cargo-audit not installed. Install with: cargo install cargo-audit"
    fi

    # Check for duplicate dependencies
    if command_exists cargo; then
        print_info "Checking for duplicate dependencies..."
        echo "### Duplicate Dependencies" >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        cargo tree --duplicates >> "$REPORT_FILE" 2>&1 || true
        echo '```' >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
    fi

    print_success "Rust audit complete"
}

###############################################################################
# Go
###############################################################################
audit_go() {
    print_header "Go Dependency Audit"

    if [ ! -f "go.mod" ]; then
        print_info "No go.mod found, skipping Go audit"
        return
    fi

    echo "## Go Dependencies" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"

    # Check for outdated packages
    print_info "Checking for outdated packages..."
    if command_exists go; then
        echo "### Outdated Packages" >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        go list -u -m all >> "$REPORT_FILE" 2>&1 || true
        echo '```' >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
    fi

    # Security audit with govulncheck
    if command_exists govulncheck; then
        print_info "Running govulncheck..."
        echo "### Security Vulnerabilities" >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        govulncheck ./... >> "$REPORT_FILE" 2>&1 || print_warning "govulncheck found vulnerabilities"
        echo '```' >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
    else
        print_warning "govulncheck not installed. Install with: go install golang.org/x/vuln/cmd/govulncheck@latest"
    fi

    # Verify dependencies
    print_info "Verifying dependencies..."
    if command_exists go; then
        echo "### Dependency Verification" >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        go mod verify >> "$REPORT_FILE" 2>&1 || print_warning "Dependency verification failed"
        echo '```' >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
    fi

    print_success "Go audit complete"
}

###############################################################################
# PHP / Composer
###############################################################################
audit_php() {
    print_header "PHP Dependency Audit"

    if [ ! -f "composer.json" ]; then
        print_info "No composer.json found, skipping PHP audit"
        return
    fi

    echo "## PHP Dependencies" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"

    # Check for outdated packages
    if command_exists composer; then
        print_info "Checking for outdated packages..."
        echo "### Outdated Packages" >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        composer outdated --direct >> "$REPORT_FILE" 2>&1 || true
        echo '```' >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
    fi

    # Security audit
    if command_exists security-checker; then
        print_info "Running security check..."
        echo "### Security Vulnerabilities" >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        security-checker security:check composer.lock >> "$REPORT_FILE" 2>&1 || print_warning "Security issues found"
        echo '```' >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
    fi

    # Validate composer.json
    if command_exists composer; then
        print_info "Validating composer.json..."
        echo "### Validation" >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        composer validate >> "$REPORT_FILE" 2>&1 || print_warning "Validation warnings found"
        echo '```' >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
    fi

    print_success "PHP audit complete"
}

###############################################################################
# Main execution
###############################################################################
main() {
    print_header "Starting Dependency Audit"

    echo "This script will audit your project dependencies for:"
    echo "  • Outdated packages"
    echo "  • Security vulnerabilities"
    echo "  • Unused dependencies"
    echo "  • Bloat and optimization opportunities"
    echo ""

    # Run audits for detected project types
    audit_nodejs
    audit_python
    audit_rust
    audit_go
    audit_php

    # Finalize report
    echo "" >> "$REPORT_FILE"
    echo "---" >> "$REPORT_FILE"
    echo "**Audit completed**: $(date)" >> "$REPORT_FILE"

    print_header "Audit Complete"
    print_success "Report saved to: $REPORT_FILE"

    # Display summary
    echo ""
    print_info "Summary of findings:"
    echo "  • Check the report file for detailed results"
    echo "  • Address security vulnerabilities immediately"
    echo "  • Review outdated packages for necessary updates"
    echo "  • Remove unused dependencies to reduce bloat"
    echo ""
}

# Run main function
main
