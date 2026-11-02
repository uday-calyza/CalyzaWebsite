# CalyzaTech — Change Log

---

## 1. Company Address Updated

**Files changed:**
- `frontend/src/pages/ContactPage.jsx`
- `frontend/src/components/HomeClosing.jsx`

**Change:** Replaced old address (Mondeal Heights, Satellite) with the new address:
`E-1009, Ganesh Glory 11, Jagatpur Road, Gota, Ahmedabad, Gujarat – 382470`

**Reason:** The company has moved. Both locations where the address appeared on the website were updated to reflect the current office.

---

## 2. Privacy Statement Page Added

**Files changed / created:**
- `frontend/src/pages/PrivacyPage.jsx` *(new)*
- `frontend/src/App.js` — added `/privacy` route
- `frontend/src/components/SiteFooter.jsx` — added Privacy Statement link

**Change:** Created a new `/privacy` page with 7 sections matching the site's design system. Added it to the footer and registered the route.

**Reason:** The website had no privacy policy. This is a legal requirement for any website that collects user data (contact forms, AI chat). Clients arriving from YouTube or other platforms expect to see one.

**Sections covered:**
1. Introduction
2. Who This Statement Applies To
3. Information We Collect
4. How We Use Your Information
5. AI Chat Assistant and AI Processing
6. Cookies and Analytics
7. Data Retention

---

## 3. Footer Link Order Updated

**File changed:** `frontend/src/components/SiteFooter.jsx`

**Change:** Moved "Book a Strategy Call" to the end of the footer link list, after "Privacy Statement."

**Reason:** "Book a Strategy Call" is a highlighted/accented link. Having it in the middle of the list looked visually unbalanced. The standard pattern is: navigation links → utility/legal links → primary CTA last.

---

## 4. Backend — `emergentintegrations` Made Optional

**Files changed:**
- `backend/server.py`
- `backend/requirements.txt`

**Change:** Wrapped the `emergentintegrations` import in a `try/except`. If the package is not installed, the server starts normally and the `/api/chat` endpoint returns a `503` instead of crashing. Removed `emergentintegrations==0.2.0` from `requirements.txt`.

**Reason:** This is a private package not available on PyPI — `pip install` was failing and blocking the entire backend from starting. All other features (contact form, MongoDB, email) work fine without it. The AI chat widget is the only affected feature.

---

## 5. Frontend `.env` — Backend URL Set

**File changed:** `frontend/.env`

**Change:** `REACT_APP_BACKEND_URL=` → `REACT_APP_BACKEND_URL=http://localhost:8000`

**Reason:** The frontend was not pointing to the backend. Without this, API calls (contact form submissions, AI chat) would fail silently in local development.

---

## 6. `.gitignore` Files Updated

**Files changed:**
- `CalyzaTech/.gitignore` — added explicit entries for `backend/.env` and `frontend/.env`
- `CalyzaTech/frontend/.gitignore` — added `.env` entries
- `server-backup/.gitignore` *(new)* — root-level gitignore protecting all `.env` files across the repo

**Reason:** `.env` files contain secrets (API keys, SMTP passwords, MongoDB URLs). They must never be committed to Git. The existing gitignore was missing explicit coverage for these files.

---

## 7. AWS Credentials Removed from Source Code

**File changed:** `Spotem/nova_sonic.py` (lines 775–776)

**Change:** Removed hardcoded `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` values. Replaced with a comment directing to use environment variables (already present in `Spotem/.env`).

**Reason:** GitHub Push Protection blocked the push because live AWS credentials were hardcoded in the file. Hardcoded secrets in source code are a critical security risk. The commit was amended and force-pushed to remove them from git history entirely.

---

## 8. `jsconfig.json` — Path Alias Fix

**File changed:** `frontend/jsconfig.json`

**Change:**
- `baseUrl` changed from `"."` to `"src"`
- Added `"ignoreDeprecations": "6.0"` to suppress TypeScript 7.0 deprecation warning

**Reason:** VS Code was showing a red underline on `baseUrl` due to schema validation. The newer TypeScript version bundled with VS Code flags `baseUrl` as deprecated. Adding `ignoreDeprecations` silences the warning without changing any build behaviour.
