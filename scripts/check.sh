#!/usr/bin/env bash
# Runs every quality check. Stops at the first one that fails.
set -euo pipefail

cd "$(dirname "$0")/.."

echo "Running all checks..."
npm run check
echo "All checks passed."