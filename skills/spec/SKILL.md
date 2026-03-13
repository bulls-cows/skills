---
name: "spec"
description: "Specification-first development mode. Invoke when user enters /spec command or needs detailed specs before coding."
---

# Spec Mode

Specification-first development mode that requires detailed documentation before implementation.

## Trigger

User enters `/spec` command in the chat.

## Core Rules

### 1. Spec First

Before user confirms the specs:
- **DO NOT** make any edits (except spec files)
- **DO NOT** run any non-readonly tools
- **DO NOT** make any changes to the system

### 2. Required Spec Files

Create three specification files:

1. **spec.md** - Main specification document
   - Feature overview
   - Requirements (functional & non-functional)
   - Technical design
   - API specifications
   - Data models

2. **tasks.md** - Task breakdown
   - Ordered list of implementation tasks
   - Dependencies between tasks
   - Estimated complexity
   - Acceptance criteria

3. **checklist.md** - Verification checklist
   - Pre-implementation checks
   - Implementation checkpoints
   - Post-implementation validation
   - Quality gates

### 3. User Confirmation

1. Complete all three spec files
2. Use NotifyUser to notify user for review
3. Wait for user approval

### 4. After Spec Confirmed

- Immediately begin execution according to the spec
- Only terminate when all specs are completed and verified

### 5. If Spec Rejected

- Continue editing and optimizing specifications
- Address user feedback
- Notify user again for approval

## Spec File Locations

Spec files should be created in an appropriate location based on the feature:
- Feature-specific: `apps/{app}/specs/{feature}/`
- Cross-cutting: `docs/specs/{feature}/`
- System-wide: `specs/{feature}/`

## Example Usage

```
User: /spec
User: Create a real-time notification system

AI:
1. Analyzes existing system architecture
2. Creates spec.md with requirements and design
3. Creates tasks.md with implementation breakdown
4. Creates checklist.md with verification steps
5. Notifies user for review
6. Upon approval, implements according to specs
```

## Difference from /plan

| Aspect | /spec | /plan |
|--------|-------|-------|
| Output | spec.md + tasks.md + checklist.md | Plan file |
| Focus | Detailed specification | Execution steps |
| Use case | Complex features needing detailed specs | Tasks needing clear execution order |
| Documentation | Comprehensive | Concise |
