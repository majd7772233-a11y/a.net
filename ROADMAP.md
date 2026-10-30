# ROADMAP

## Objective
Transform the existing Arabic Al-Ghaith Net captive portal into a polished, accessible, responsive Deep / Pure Liquid Glass experience using the established purple brand identity. Deliver a drop-in front-end replacement without changing the router, server, authentication, session, API, or hotspot integration.

## Success Criteria
- Preserve current login, logout, status polling, speed selection, saved-card, blocker, and hotspot behavior.
- Preserve server-facing request methods, paths, query parameters, callback names, payloads, script attributes, and script load order.
- Preserve all DOM hooks consumed by existing scripts.
- Redesign login, pricing, sales points, offers, connected status, usage information, preference controls, blocked state, alerts, loading, and contact actions.
- Implement real translucent glass, backdrop blur, visible background, layered depth, asymmetric highlights/reflections, purple ambient lighting, restrained liquid motion, and pointer/touch response.
- Support Arabic RTL, phone/tablet/desktop layouts, keyboard navigation, visible focus, adequate contrast, and reduced motion.
- Fix invalid markup/CSS and broken assets without changing network behavior or business data.
- Report live-router verification only after testing on the real neighborhood network.

## Baseline
- Repository: majd7772233-a11y/a.net; default branch main.
- Baseline commit: 8a4eb27aafbff8340c19703cb916253dbbf6916c (First commit, 2026-10-30).
- Working branch: redesign/liquid-glass-ui.
- Static HTML/CSS/JS portal; no separate backend, package/build manifest, automated tests, CI workflow, README, ROADMAP, or GPT memory file existed at baseline.
- Entry: index.html redirects to index-2.html. Main UI: index-2.html. Styles: css/style.css, css/chik.css. Local font: fonts/Almarai.css and Almarai.woff2.
- Scripts: js/main.min.js, hotCookie.min.js, hotBlocker.min.js, hotInImprover.min.js, scripts.js, myfile.min.js.

## Protected Integration Boundary
Treat the following as immutable during visual-only work:
- js/main.min.js, including getRequest(), XMLHttpRequest behavior, current request method, /login, /logout, status request paths, query parameters, callbacks, and session behavior.
- js/hotCookie.min.js saved-card/cookie semantics and registration hooks.
- js/hotBlocker.min.js counter, duration, countdown, and blocker semantics.
- The main.min.js script attribute link-login-only="http://a.net/login".
- Form name login; username/password names; username-field/password-field; enable-hot-cookie; clear-hot-cookie; erase-cookie; enable-hot-blocker; try-count; block-time.
- Speed selector #speed and its existing values: 1024K/2048k, 2048K/4096k, 4096K/8192k, 64M/64M.
- Panel IDs login, price, sell-point, info, status, block; button[parent-id]; .app-logout, .login-submit, .logout-submit.
- Status hooks: card_number, uptime, session_time_left, bytes_out, bytes_in, remain_bytes_total, updateStatus, sps.
- Other hooks: error, se, loadingIndicator, loadingText, remember, remember-select, speedChange, count-down-span.
Do not normalize unusual request behavior based on conventional web assumptions. The user confirms the deployed portal works. No server/router changes are authorized.

## Verified Source Findings
- index.html redirects to index-2.html and declares lang=en although the portal is Arabic.
- index-2.html contains login, pricing, sales point, offer, status, and blocked panels.
- Current prices include 100, 200, 300, 500, 1000, and 3000 YER; preserve them exactly.
- Several purported image files (adimg/1.jpg through adimg/5.jpg, bg.jpg, bg2.jpg, css/img/logo.png) share the exact 109-byte blob of GET.html, which is an HTML 404 page, not an image.
- bg1.jpg is a distinct 45,279-byte file; successful image decoding/rendering is not yet verified.
- HTML includes malformed tags, a repeated id attribute on #se, malformed contact anchor, and table structure errors.
- css/style.css contains malformed declarations and legacy rules. css/chik.css applies global transitions and removes outlines globally.
- scripts.js assigns window.onload repeatedly, references absent #speedStatus, and has overlapping preference/status handlers.
- main.min.js mixes hotspot integration with UI transitions; leave it untouched during visual redesign until a safe boundary is proven.
- No router configuration, server source, production logs, or live session was available for inspection.

## Stages

### Stage 1 — Safe Baseline and Engineering Memory
Create this roadmap and GPT.md, document baseline and protected contract, and create a dedicated branch. Acceptance: both docs committed; main untouched; no integration files changed. Status: in progress during kickoff.

### Stage 2 — Complete Visual System and Portal Redesign
Create purple Deep / Pure Liquid Glass design tokens and components; redesign all portal panels and states; repair semantic HTML while preserving all selectors, IDs, names, custom attributes, form semantics, and script order; replace broken-image presentation with valid-asset/fallback treatment; preserve all business data. Acceptance: every visible panel redesigned, no invalid 404 image displayed, no protected hook lost, responsive RTL layouts, visible focus, reduced-motion support, no server-facing code changes.

### Stage 3 — Safe Client-Side UI Repairs
Audit non-protected UI scripts and their callers; fix duplicate initialization, missing-element assumptions, local alert/loading/preference/status-label behavior, and carousel UI without changing API requests, saved-card semantics, blocker behavior, or speed values. Clearly state that the portal cannot directly disable OS/app updates. Acceptance: controls behave truthfully; no null dereferences; protected flows retain semantics; network contract unchanged.

### Stage 4 — Accessibility, Responsive and Performance Hardening
Keyboard and touch support, labels/ARIA, contrast, touch target sizing, reduced-motion, blur fallback, restrained low-power effects, and dependency-free local delivery. Acceptance: usable at phone/tablet/desktop widths and without backdrop-filter.

### Stage 5 — Regression Verification and Handoff
Validate HTML/CSS/JS syntax, assets, selectors and protected scripts; run browser checks where available; compare protected files to baseline; document live-router checks that require the actual network; prepare deployment and rollback instructions. Acceptance: all available checks pass or are precisely documented; no unverified live-network claims; handoff is deployable.

## Project-wide Constraints
1. No router/server/backend changes.
2. No changes to request method, endpoint, query, callback, payload, authentication/session semantics.
3. No changes to actual speed values, prices, phone numbers, or network-owner content without permission.
4. Preserve every integration DOM hook and script configuration attribute.
5. No fake login or demo success replacing real hotspot behavior.
6. Keep main untouched; use the feature branch.

## Current Progress
Stage 1 documentation setup is being committed on redesign/liquid-glass-ui. Next eligible implementation stage: Stage 2 — Complete Visual System and Portal Redesign. No application source file has been modified in this kickoff.
