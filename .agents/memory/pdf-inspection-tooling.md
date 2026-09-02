---
name: PDF inspection tooling
description: Workspace-specific cleanup needed after installing Python PDF rendering dependencies.
---

When a PDF needs visual inspection, install the rendering dependency only for the inspection and verify the workspace configuration afterward.

**Why:** The package setup can add Python modules/packages to the Replit config and create root-level Python scaffolding even when the product is a JavaScript app.

**How to apply:** After rendering, keep the rendered result only if it is a requested deliverable; otherwise remove temporary scripts/output and restore unrelated config changes before final verification.