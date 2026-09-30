---

name: git-commit
description: Ensure consistent and approved Git commit messages
---------------------------------------------------------------

## What I do

* Create commits based on completed tasks.
* Before creating each commit, ask the user for approval by showing the proposed commit message and waiting for confirmation.

## Rules

* Follow the Conventional Commits specification.
* Never run `git commit` until the user explicitly approves the proposed commit message.
* Before running `git commit`, show the exact commit message to the user and ask for approval.
* The commit message must contain no more than 30 words.
* Do not use lists or multiple lines in the commit message.
* Do not mention the AI, model, or yourself as a co-author.
* Use the past tense to describe what was done in the commit.
* The commit message should describe the actual changes made, not the user's original request.

## When to use this skill

* After a logical task is completed and the changes are ready to be committed to the Git history.
