# POC-CICD-Pipeline

Project for POC Pipeline — proving concepts around repository governance and CI/CD practices.

---

## POC Concepts

### 1. Branch Protection

The `main` branch should be protected with the following rules (configured in **Settings → Branches → Branch protection rules**):

| Rule | Value |
|------|-------|
| Require a pull request before merging | ✅ Enabled |
| Require approvals | 1 reviewer |
| Require status checks to pass | `Validate Commit Messages`, `Validate PR Title` |
| Require branches to be up to date | ✅ Enabled |
| Do not allow bypassing the above settings | ✅ Enabled |

This ensures no one can push directly to `main` and all changes must go through a reviewed, validated PR.

---

### 2. Commit Message Format (Conventional Commits)

All commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification, enforced by the **Commit Lint** GitHub Actions workflow (`.github/workflows/commitlint.yml`) using [`commitlint`](https://commitlint.js.org/).

**Format:**

```
<type>(<optional scope>): <subject>

[optional body]

[optional footer(s)]
```

**Allowed types:**

| Type | Description |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes |
| `style` | Code style changes (formatting, etc.) |
| `refactor` | Code refactoring |
| `perf` | Performance improvements |
| `test` | Adding or updating tests |
| `build` | Build system or dependency changes |
| `ci` | CI/CD configuration changes |
| `chore` | Maintenance tasks |
| `revert` | Reverting a previous commit |

**Examples:**
```
feat: add user authentication
fix(api): handle null response from external service
docs: update README with setup instructions
ci: add commitlint workflow
```

---

### 3. PR Title Format (Conventional Commits)

Pull request titles must also follow the [Conventional Commits](https://www.conventionalcommits.org/) format, enforced by the **PR Title Lint** GitHub Actions workflow (`.github/workflows/pr-title-lint.yml`) using [`action-semantic-pull-request`](https://github.com/amannn/action-semantic-pull-request).

**Format:**
```
<type>(<optional scope>): <subject starting with lowercase>
```

**Examples:**
```
feat: add login page
fix(auth): resolve token expiry issue
docs: update API documentation
```

The workflow runs on every PR open, edit, sync, and reopen event targeting `main`.

---

## Workflow Files

| File | Purpose |
|------|---------|
| `.github/workflows/commitlint.yml` | Validates commit messages on push and in PRs |
| `.github/workflows/pr-title-lint.yml` | Validates PR title format on PRs targeting `main` |
| `commitlint.config.js` | commitlint configuration using `@commitlint/config-conventional` |
