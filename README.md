# POC-CICD-Pipeline

POC repository for GitHub governance and CI/CD controls.

## Workflows Overview

This project currently contains 3 GitHub Actions workflows:

| Workflow | File | Trigger | What it enforces |
|---|---|---|---|
| Commit Lint | `.github/workflows/commitlint.yml` | `pull_request` to `develop` (`opened`, `synchronize`, `reopened`) | Commit messages in the PR follow Conventional Commits |
| PR Title Lint | `.github/workflows/pr-title-lint.yml` | `pull_request` (`opened`, `edited`, `synchronize`, `reopened`) | PR title follows Conventional Commits with lowercase subject |
| Enforce Branch Flow | `.github/workflows/branch-flow.yml` | `pull_request` to `main`, `staging`, `develop` (`opened`, `synchronize`, `reopened`) | PR source/target branch flow is valid |

## Branch Flow Rules

Defined in `.github/workflows/branch-flow.yml`:

1. `main` accepts PRs only from `staging`.
2. `staging` accepts PRs only from `develop`.
3. `develop` accepts PRs from branches that are based on latest `develop`.

Behavior when invalid:

1. Workflow comments on the PR with the reason.
2. Invalid PRs targeting `main` or `staging` are auto-closed.
3. For `develop`, the workflow fails and comments, but does not auto-close.

## Commit Message Validation

Commit messages are validated by `commitlint` using `commitlint.config.js`.

### Conventional Commit format

```text
<type>(<optional scope>): <subject>

[optional body]

[optional footer(s)]
```

### Allowed types and when to use

| Type | ใช้เมื่อ | ตัวอย่าง |
|---|---|---|
| `feat` | เพิ่มฟีเจอร์ใหม่ที่มีผลกับผู้ใช้งาน | `feat: add user profile page` |
| `fix` | แก้บั๊กหรือพฤติกรรมที่ผิดพลาด | `fix(auth): handle expired token` |
| `docs` | แก้หรือเพิ่มเอกสาร เช่น README, API docs | `docs: update deployment guide` |
| `style` | ปรับรูปแบบโค้ดที่ไม่เปลี่ยน logic เช่น spacing, formatting | `style: format lint config` |
| `refactor` | ปรับโครงสร้างโค้ดโดยไม่เปลี่ยนพฤติกรรม | `refactor: split branch validation logic` |
| `test` | เพิ่มหรือแก้ชุดทดสอบ | `test: add commitlint workflow tests` |
| `chore` | งานดูแลโปรเจกต์ทั่วไปที่ไม่ใช่ feature/fix โดยตรง | `chore: update ignore rules` |
| `ci` | เปลี่ยนแปลง pipeline/workflow CI/CD | `ci: add branch-flow check` |
| `build` | เปลี่ยนระบบ build หรือ dependency ที่กระทบการ build | `build: update npm scripts for lint` |
| `perf` | ปรับปรุงประสิทธิภาพ | `perf: optimize branch lookup script` |
| `revert` | ย้อน commit ก่อนหน้า | `revert: revert "feat: add login page"` |

### Additional commitlint behavior in this repo

1. Default ignores are enabled.
2. Messages starting with `Merge`, `Revert`, `Pull request`, or containing `[skip-lint]` are ignored.
3. Subject case rule is disabled (`subject-case`).

## PR Title Validation

PR title lint uses `amannn/action-semantic-pull-request` with:

1. Same allowed types as commitlint.
2. `requireScope: false`.
3. Subject must start with lowercase (pattern: `^(?![A-Z]).+$`).

Example valid titles:

```text
feat: add login page
fix(auth): resolve token expiry issue
docs: update API documentation
```

## Notes for Branch Protection

To match these workflows, configure required status checks per target branch:

1. `main`: `Validate branch flow` and `Validate PR Title`.
2. `staging`: `Validate branch flow` and `Validate PR Title`.
3. `develop`: `Validate branch flow`, `Validate Commit Messages`, and `Validate PR Title`.
