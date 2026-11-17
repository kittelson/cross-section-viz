# AGENTS.md

## Branching

Never develop on `main`. Before you change any code for a new feature or fix:

1. Start from an up-to-date `main`: `git switch main && git pull`.
2. Create a branch: `git switch -c <type>/<short-kebab-name>` (e.g. `feat/embed-streetmix`, `fix/stepper-scroll`).
3. Make it track a remote branch with the same name: `git push -u origin <type>/<short-kebab-name>`.

If you're already on a feature branch for the same work, keep using it.

## Solving problems

Fix the root cause, not the symptom.

- Before proposing a fix, state the root cause in one sentence. If you can't, keep investigating instead of proposing.
- Don't fix things by suppressing, gating, or special-casing (flags, early returns, `try/catch` that swallows, `!important`, `@ts-expect-error`, retries, timeouts) unless the root cause is outside this repo or out of scope. When that happens, say so explicitly and name the real fix.
- When you present options, include at least one that removes the cause. Label each option **root-cause fix** or **workaround**.
- If the right fix is bigger than the task, say so and propose it. Don't quietly ship the smaller patch.
