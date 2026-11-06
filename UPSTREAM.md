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

## 4. Send a B feature to A

Send only core features to A. Never send brand commits or B-only files.

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

Test the branch with the default brand:

```
npm ci
npm run build
npm run check
npm run lint
npm test
```

Push the branch to A with the full URL of A:

```
git push https://github.com/maris-development/beacon-studio.git feature/<name>
```

Open a pull request from `feature/<name>` into `main` on the A page on GitHub.

A push to A needs write access to A. Without write access, push to a personal fork of A.
Then open the pull request from that fork.

After A merges the pull request, the next sync (section 3) brings the change back into B.
Git usually merges an identical change on both sides with no conflict.
A conflict can occur if B changed the same lines after the cherry-pick.

## 5. Rules

- Keep feature commits and brand commits separate. One commit never changes both.
- Keep B-only files in their own commits: `UPSTREAM.md`, `.github/workflows/upstream-behind.yml`, `.gitignore` changes.
- Sync from A at least once a week.
- Never put B brand files in core folders. All brand files go in `src/brands/ihm/`.
- A feature for the `ihm` brand goes in the shared code, behind a `BrandConfig` field. See `AGENTS.md`, section "Brands".
- Make core changes in A first when possible. Then sync them into B.
