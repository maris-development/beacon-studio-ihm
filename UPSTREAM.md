# Upstream workflow

Beacon Studio IHM (B) is a copy of Beacon Studio (A). It is not a GitHub fork.
B uses the core of A, the brand `ihm`, and features on top of the core.

| Name | Repository                                             | Role in B                |
| ---- | ------------------------------------------------------ | ------------------------ |
| A    | https://github.com/maris-development/beacon-studio     | Core. Source of changes. |
| B    | https://github.com/maris-development/beacon-studio-ihm | This repository.         |

All commands are for Git Bash.

## 1. Remotes

| Remote     | Points to | Fetch | Push        |
| ---------- | --------- | ----- | ----------- |
| `origin`   | B         | yes   | yes         |
| `upstream` | A         | yes   | no, blocked |

The push URL of `upstream` is not a valid repository. So `git push upstream` fails.
This prevents an accidental push to A. To push to A, type the full URL of A (see section 4).

### Set up a new clone

```
git clone https://github.com/maris-development/beacon-studio-ihm.git
cd beacon-studio-ihm
git remote add upstream https://github.com/maris-development/beacon-studio.git
git remote set-url --push upstream DISABLED-use-full-URL-of-A
git fetch upstream
git remote -v
```

Expected output:

```
origin    https://github.com/maris-development/beacon-studio-ihm.git (fetch)
origin    https://github.com/maris-development/beacon-studio-ihm.git (push)
upstream  https://github.com/maris-development/beacon-studio.git (fetch)
upstream  DISABLED-use-full-URL-of-A (push)
```

## 2. See the difference between A and B

```
git fetch upstream
git rev-list --count origin/main..upstream/main   # commits in A, not yet in B
git log --oneline upstream/main..origin/main       # commits in B, not in A
```

## 3. Pull core changes from A into B

Do this at least once a week. A GitHub Action opens an issue when B is behind A.

```
git fetch upstream
git switch -c sync/upstream-YYYY-MM-DD origin/main
git merge upstream/main
```

Replace `YYYY-MM-DD` with the date of today.

If the merge has conflicts:

```
git status                  # shows the files with conflicts
# edit each file, keep the correct lines, remove the conflict markers
git add <file>
git commit                  # completes the merge
```

Test, then push the sync branch to B:

```
npm ci
STUDIO_BRAND=ihm npm run build
npm run check
npm run lint
npm test
git push -u origin sync/upstream-YYYY-MM-DD
```

Open a pull request from `sync/upstream-YYYY-MM-DD` into `main` on the B page on GitHub.

Merge this pull request with **Create a merge commit**. Do not use squash or rebase.
A squash removes the link to the commits of A. Then the next sync shows the same changes again.

## 4. Build a core feature and send it to A

Send only core features to A. Never send brand commits or B-only files to A.

B-only paths:

- `src/brands/ihm/`
- `UPSTREAM.md`
- `.github/workflows/upstream-behind.yml`
- `.gitignore` (B adds a line)

### 4.1 Start the feature branch from A

A branch from `origin/main` contains all B commits. A push of that branch to A sends the brand and the B-only files too.
So start each core feature from `upstream/main`. Then the branch never contains B-only files.

Sync B first (section 3). Then the pull request into B shows only the feature commits.

```
git fetch upstream
git switch -c feature/<name> upstream/main
# build the feature, then commit
```

Test the branch with the default brand:

```
npm ci
npm run build
npm run check
npm run lint
npm test
```

Use the same branch for A and for B:

```
git push https://github.com/maris-development/beacon-studio.git feature/<name>
git push -u origin feature/<name>
```

- Open a pull request from `feature/<name>` into `main` on the A page on GitHub.
- Open a pull request from `feature/<name>` into `main` on the B page on GitHub.

A push to A needs write access to A. Without write access, push to a personal fork of A.
Then open the pull request from that fork.

A brand change uses a different branch, from `origin/main`. It goes to B only:

```
upstream/main ──┬── feature/<name>    core feature   ──► pull request to A and to B
                │
origin/main ────┴── brand/<name>      brand change   ──► pull request to B only
```

### 4.2 A feature that the brand turns on

Use two branches:

1. **Core** (`feature/<name>`, from `upstream/main`): the feature in shared code, behind a `BrandConfig` field or a `BrandFeature` id. The default is off. This branch goes to A and to B.
2. **Brand** (`brand/<name>`, from `origin/main`): one change in `src/brands/ihm/brand.ts` that turns the feature on. This branch goes to B only.

Never test the brand name in code. See `AGENTS.md`, section "Brands".

### 4.3 Check a branch before a push to A

This command lists the B-only paths that the branch changes. The output must be empty:

```
git fetch upstream
git diff --name-only upstream/main...HEAD | grep -E '^(src/brands/ihm/|UPSTREAM\.md$|\.github/workflows/upstream-behind\.yml$|\.gitignore$)'
```

If the command lists a file, do not push to A. Make a new branch from `upstream/main` and use section 4.4.

### 4.4 Fallback: a feature already built on B

Use this only when the feature commits are already on a branch from `origin/main`.

Find the feature commits:

```
git fetch upstream
git log --oneline upstream/main..origin/main
```

Make a branch from A and copy only the feature commits:

```
git switch -c feature/<name> upstream/main
git cherry-pick <sha1> <sha2>
```

A commit that changes core files and brand files at the same time cannot be cherry-picked safely. Split it first.
Then test (section 4.1), check (section 4.3), and push the branch to A.

### 4.5 After A merges the pull request

The next sync (section 3) brings the change back into B.
Git usually merges an identical change on both sides with no conflict.
A conflict can occur if B changed the same lines after the feature branch.

## 5. Rules

- Start a core feature branch from `upstream/main`. Start a brand branch from `origin/main`.
- Keep feature commits and brand commits separate. One commit never changes both.
- `main` of B is protected. Every change goes to `main` through a pull request.
- Keep B-only files in their own commits: `UPSTREAM.md`, `.github/workflows/upstream-behind.yml`, `.gitignore` changes.
- Sync from A at least once a week.
- Never put B brand files in core folders. All brand files go in `src/brands/ihm/`.
- A feature for the `ihm` brand goes in the shared code, behind a `BrandConfig` field. See `AGENTS.md`, section "Brands".
- Make core changes in A first when possible. Then sync them into B.
