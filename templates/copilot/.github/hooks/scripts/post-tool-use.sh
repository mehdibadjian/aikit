#!/bin/bash
# AIKit PostToolUse Hook
# After file edits, checks if the edited file is a delivery artifact (DLV-*.md)
# and warns if it's missing a Document Control section.

set -euo pipefail

# Read tool input from stdin
INPUT=$(cat)

TOOL_NAME=$(echo "$INPUT" | grep -o '"tool_name":"[^"]*"' | head -1 | cut -d'"' -f4 2>/dev/null || true)

# Only act on file edit tools
case "$TOOL_NAME" in
  editFiles|create_file|replace_string_in_file|multi_replace_string_in_file)
    ;;
  *)
    # Not a file edit — pass through
    echo '{"continue": true}'
    exit 0
    ;;
esac

# Extract file path from tool input (best-effort parsing)
FILE_PATH=$(echo "$INPUT" | grep -oE '"filePath":"[^"]*"' | head -1 | cut -d'"' -f4 2>/dev/null || true)

if [ -z "$FILE_PATH" ]; then
  echo '{"continue": true}'
  exit 0
fi

# Only check delivery artifacts
case "$FILE_PATH" in
  */DLV-*.md|delivery/*)
    ;;
  *)
    echo '{"continue": true}'
    exit 0
    ;;
esac

# Check if the file exists and is missing Document Control
if [ -f "$FILE_PATH" ]; then
  if ! grep -q "Document Control\|Document ID" "$FILE_PATH" 2>/dev/null; then
    echo '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":"Warning: delivery artifact is missing Document Control section. Include the Document Control Template from copilot-instructions.md"}}'
    exit 0
  fi
fi

echo '{"continue": true}'
