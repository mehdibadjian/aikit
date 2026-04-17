#!/bin/bash
# AIKit SessionStart Hook
# Injects delivery project context at the start of every agent session.
# Scans delivery/ for projects and lists available artifacts.

set -euo pipefail

DELIVERY_DIR="delivery"
CONTEXT=""

if [ -d "$DELIVERY_DIR" ]; then
  PROJECT_COUNT=$(find "$DELIVERY_DIR" -mindepth 1 -maxdepth 1 -type d 2>/dev/null | wc -l | tr -d ' ')

  if [ "$PROJECT_COUNT" -gt 0 ]; then
    PROJECTS=""
    for dir in "$DELIVERY_DIR"/*/; do
      [ -d "$dir" ] || continue
      dirname=$(basename "$dir")
      artifact_count=$(find "$dir" -maxdepth 2 -name "DLV-*.md" 2>/dev/null | wc -l | tr -d ' ')
      PROJECTS="$PROJECTS  - $dirname/ ($artifact_count artifacts)\n"
    done
    CONTEXT="AIKit delivery workspace: $PROJECT_COUNT project(s) found.\n$PROJECTS"
  else
    CONTEXT="AIKit delivery workspace: no projects yet. Use /aikit-kickoff to start."
  fi
else
  CONTEXT="AIKit delivery workspace: delivery/ directory not found. Use /aikit-kickoff to create first project."
fi

# Check for global artifacts
if [ -d "$DELIVERY_DIR/000-global" ]; then
  GLOBAL_COUNT=$(find "$DELIVERY_DIR/000-global" -maxdepth 1 -name "DLV-*.md" 2>/dev/null | wc -l | tr -d ' ')
  if [ "$GLOBAL_COUNT" -gt 0 ]; then
    CONTEXT="$CONTEXT\nGlobal artifacts (000-global): $GLOBAL_COUNT files"
  fi
fi

# Output JSON for Copilot to consume
printf '{"hookSpecificOutput":{"hookEventName":"SessionStart","additionalContext":"%s"}}' "$(echo -e "$CONTEXT" | sed 's/"/\\"/g' | tr '\n' ' ')"
