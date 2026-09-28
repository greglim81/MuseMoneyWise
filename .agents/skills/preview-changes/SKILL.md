---
name: preview-changes
description: Preview code changes inline and ask for approval before writing them to the file system. Use this skill when user requests to generate code previews.
---

# Preview Changes

When this skill is invoked, do not write or edit files yet:

1. Prepare the proposed change as inline code in the chat window (unified diff or full file content with paths).
2. Summarize what would change and why.
3. Ask for explicit approval to implement.
4. Only after the user approves, apply the change with file tools.
5. If the user requests revisions, repeat from step 1 without writing files.

Use this for source code, config, and docs edits. Read-only inspection remains allowed.
