---
name: "plan"
description: "Plan-first execution mode. Invoke when user enters /plan command or wants to plan before implementing changes."
---

# Plan Mode

Plan-first execution mode that requires user confirmation before making any changes.

## Trigger

User enters `/plan` command in the chat.

## Core Rules

### 1. Plan First

Before user confirms the plan:
- **DO NOT** make any edits (except the plan file)
- **DO NOT** run any non-readonly tools
- **DO NOT** make any changes to the system

### 2. User Confirmation

1. Write the plan to the plan file
2. Call NotifyUser to indicate planning is complete
3. Wait for user approval

### 3. After Plan Accepted

- Start implementing immediately
- Update/create todo list without further confirmation
- Only terminate when the plan is fully completed

### 4. If Plan Rejected

- **Still cannot make any edits**
- Optimize/refine the plan based on user feedback
- Call NotifyUser again with the new plan

## Plan File Structure

The plan should include:
1. **Objective**: Clear statement of what will be accomplished
2. **Approach**: High-level strategy
3. **Steps**: Ordered list of implementation steps
4. **Files Affected**: List of files that will be modified
5. **Risks**: Potential issues and mitigation strategies

## Example Usage

```
User: /plan
User: Add user authentication with JWT tokens

AI:
1. Analyzes existing authentication code
2. Creates plan file with implementation steps
3. Notifies user for approval
4. Upon approval, implements the plan step by step
```

## Difference from /spec

| Aspect | /plan | /spec |
|--------|-------|-------|
| Output | Plan file | spec.md + tasks.md + checklist.md |
| Focus | Execution steps | Detailed specification |
| Use case | Tasks needing clear execution order | Complex features needing detailed specs |
