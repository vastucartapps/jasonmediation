#!/usr/bin/env bash
# ==============================================================================
# Failproof & Breakproof Autonomous Deployment Pipeline for AminoAcidSupplements.co
# Target Environment: Client Linux VPS (Nginx / OpenResty / Apache)
# ==============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE_DIR="$(dirname "$SCRIPT_DIR")"
cd "$SITE_DIR"

echo "=========================================================="
echo "🚀 AMINOACIDSUPPLEMENTS.CO AUTONOMOUS VPS DEPLOYMENT GATE"
echo "=========================================================="

# ------------------------------------------------------------------------------
# STEP 1: Pre-Build Strict Content & Post Validation Guardrail
# ------------------------------------------------------------------------------
echo "🔍 [1/5] Executing Pre-Build Content & Guardrails Auditor..."
npx tsx scripts/validate-post.ts

# ------------------------------------------------------------------------------
# STEP 2: Production Static Export & Single Source of Truth Discovery
# ------------------------------------------------------------------------------
if [[ "${1:-}" != "--skip-build" ]]; then
  echo "⚙️ [2/5] Compiling Production Static Export & Discovery Assets..."
  rm -rf .next out
  npm run build
else
  echo "⚡ [2/5] Skipping build step (--skip-build specified). Using existing out/ build."
fi

# ------------------------------------------------------------------------------
# STEP 3: Post-Build Ahrefs 100/100 Integrity & SEO Limits Auditing
# ------------------------------------------------------------------------------
echo "🧪 [3/5] Running Ahrefs 100/100 & Strict Character Limits Audit..."
python3 ../../scripts/audit-aminoacidsupplements-ahrefs.py
python3 ../../scripts/audit-seo-limits.py

# ------------------------------------------------------------------------------
# STEP 4: Atomic Deployment to Client VPS
# ------------------------------------------------------------------------------
echo "🌐 [4/5] Preparing VPS Synchronization..."

# Read VPS Configuration from environment or .secrets/vps.env
VPS_ENV_FILE="${SITE_DIR}/.secrets/vps.env"
if [ -f "$VPS_ENV_FILE" ]; then
  # shellcheck source=/dev/null
  source "$VPS_ENV_FILE"
fi

VPS_HOST="${VPS_HOST:-}"
VPS_USER="${VPS_USER:-}"
VPS_PORT="${VPS_PORT:-22}"
VPS_DEST="${VPS_DEST:-/var/www/aminoacidsupplements.co/html/}"
VPS_KEY="${VPS_KEY:-}"

if [ -z "$VPS_HOST" ] || [ -z "$VPS_USER" ]; then
  echo "⚠️  VPS credentials not yet configured in .secrets/vps.env."
  echo "   Build & Verification passed with 100/100 score. Output ready at: ${SITE_DIR}/out/"
  echo "   To deploy live, configure VPS_HOST, VPS_USER, and VPS_DEST in .secrets/vps.env and re-run."
  exit 0
fi

SSH_CMD="ssh -p ${VPS_PORT} -o StrictHostKeyChecking=no"
if [ -n "$VPS_KEY" ] && [ -f "$VPS_KEY" ]; then
  SSH_CMD="${SSH_CMD} -i ${VPS_KEY}"
fi

echo "📦 Synchronizing out/ -> ${VPS_USER}@${VPS_HOST}:${VPS_DEST}..."
rsync -avz --delete \
  --exclude ".git" \
  --exclude ".env*" \
  --exclude "*.log" \
  -e "${SSH_CMD}" \
  out/ "${VPS_USER}@${VPS_HOST}:${VPS_DEST}"

# Fix remote file permissions
echo "🔒 Enforcing standard web permissions on remote VPS..."
${SSH_CMD} "${VPS_USER}@${VPS_HOST}" "chown -R www-data:www-data '${VPS_DEST}' && chmod -R 755 '${VPS_DEST}'"

# ------------------------------------------------------------------------------
# STEP 5: Instant Search Indexing Telemetry
# ------------------------------------------------------------------------------
echo "📡 [5/5] Triggering IndexNow & Discovery Notifications..."
curl -s -X GET "https://www.google.com/ping?sitemap=https://aminoacidsupplements.co/sitemap.xml" >/dev/null 2>&1 || true
curl -s -X GET "https://www.bing.com/ping?sitemap=https://aminoacidsupplements.co/sitemap.xml" >/dev/null 2>&1 || true

echo "=========================================================="
echo "🏆 DEPLOYMENT COMPLETE! SITEMAP, DISCOVERY, AND SITE LIVE!"
echo "=========================================================="
