# GPT — Engineering Memory

## Identity and Intent
Repository: majd7772233-a11y/a.net. Product: Arabic captive-portal login for the neighborhood Al-Ghaith Net Wi-Fi network. Subscribers buy prepaid cards locally, enter the card number, choose a speed profile, and connect through the existing hotspot. The user wants a substantial visual/UX redesign to hand to the network owner.

## Non-Negotiable User Requirements
- Redesign the entire portal, not only login.
- Follow the user's Deep / Pure Liquid Glass reference in majd7772233-a11y/gpts/LiquidGlassUI. The reference means actual translucency and backdrop blur, visible background, layered depth, asymmetric highlights/reflections, liquid ambient motion, interactive lighting, and restrained neon effects; not generic flat glassmorphism.
- Adapt the design to Al-Ghaith Net's purple identity; Arabic RTL first; responsive on phones/tablets/desktops.
- Fix safe front-end markup, CSS, accessibility, and client-side UI defects.
- Absolutely do not change server/router communication, server code/configuration, request methods, endpoint paths, query parameters, callbacks, payloads, login/logout/status/session behavior, or speed profile values.
- User confirms the live portal works. Never declare unusual request syntax broken from convention alone.
- Preserve real prices, phone numbers, offers, and business content.
- Develop on redesign/liquid-glass-ui; do not modify main during implementation.

## Baseline
- Default branch main; baseline commit 8a4eb27aafbff8340c19703cb916253dbbf6916c (First commit, 2026-10-30).
- Repository public; GitHub connection has admin/push permission.
- Working branch created: redesign/liquid-glass-ui.
- Static HTML/CSS/JS. No backend source, build manifest, test suite, CI workflow, README, ROADMAP.md, or GPT.md at baseline.

## File Map
- index.html: redirect to index-2.html.
- index-2.html: Arabic single-page portal with login, pricing, sales points, offers, connected status, blocked state.
- css/style.css: primary layout and styling.
- css/chik.css: toggle styling; currently global transitions and outline removal.
- fonts/Almarai.css and fonts/Almarai.woff2: local Arabic font.
- js/main.min.js: hotspot requests/callbacks, login/logout/status, panel transitions, status formatting, some UI behavior. Protect whole file for visual-only work.
- js/hotCookie.min.js: saved-card/cookie persistence and registration of login/clear actions. Preserve semantics.
- js/hotBlocker.min.js: failed-login counter, temporary block, countdown. Preserve semantics.
- js/hotInImprover.min.js: username normalization, whitespace removal, Arabic numeral conversion.
- js/scripts.js: local preference, speed-label, alerts, loading, carousel behavior; contains duplicated initialization and missing-element assumptions.
- js/myfile.min.js: injects a contact/credit strip.
- GET.html: 109-byte HTML 404 response.

## Protected Network Contract
Do not modify:
- getRequest() and current XMLHttpRequest behavior in main.min.js.
- Login request string /login?username=...&var=callBack.
- Initial probe /login?var=callBack.
- Logout strings /logout?var=callBack and /logout?erase-cookie=yes&var=callBack.
- Status polling string status?var=callBack.
- Callback names onLoginError, onLoggedIn, onLoggedOut, onStatusQuery.
- Script configuration link-login-only="http://a.net/login".
- Current request method call t.open("GET.html", e, !0); despite its unusual appearance, preserve it because the real portal is reported working.
- Speed values 1024K/2048k, 2048K/4096k, 4096K/8192k, 64M/64M.
- Form name login; username/password names; username-field/password-field; enable-hot-cookie; clear-hot-cookie; erase-cookie; enable-hot-blocker; try-count=5; block-time=1.
- Panels login, price, sell-point, info, status, block; button[parent-id]; .app-logout, .login-submit, .logout-submit.
- Status IDs card_number, uptime, session_time_left, bytes_out, bytes_in, remain_bytes_total, updateStatus, sps.
- Other IDs error, se, loadingIndicator, loadingText, remember, remember-select, speedChange, count-down-span.
Do not rename/remove these hooks. Preserve script loading order.

## Verified Baseline Findings
- index.html redirects to index-2.html; root lang is en while the portal is Arabic.
- Existing prices are 100/200/300/500/1000/3000 Yemeni rials; do not alter.
- adimg/1.jpg through adimg/5.jpg, bg.jpg, bg2.jpg, and css/img/logo.png are each byte-identical to GET.html (109-byte HTML 404), not actual images.
- bg1.jpg is a separate 45,279-byte blob; actual decode/display remains unverified.
- index-2.html has malformed markup, including duplicate id attributes, malformed contact anchor, stray closing tags, and table row/cell errors.
- style.css has malformed declarations and legacy layout rules. chik.css applies global transitions and globally removes outlines.
- scripts.js has multiple window.onload assignments, references absent #speedStatus, and overlaps update-preference handlers.
- main.min.js intermixes UI transitions with network integration; protect it in full until a safe split is demonstrated.
- No live router config, server code, logs, or production runtime was available during source inspection.

## DOM Contract and Visual Refactor Rule
Wrappers and CSS may change, but protected form controls, IDs, names, custom attributes, panel IDs, and script selectors must remain. After any HTML change, mechanically compare all required hooks to this record and the baseline. Do not create fake values or demo login flows.

## Runtime Assumptions
Router/network serves local static files and responds to the existing relative hotspot endpoints. No CDN, framework, package manager, or build system is assumed available. Prefer dependency-free assets that the captive portal can serve locally.

## History
2026-10-30: Inspected repository tree and all HTML/CSS/JS source files. Confirmed baseline commit. Created branch redesign/liquid-glass-ui. No app source changed yet. No browser tests, build, or live router tests were run; GitHub connector access did not provide a local runtime.

## Validation Checklist for Future Changes
1. Compare main.min.js, hotCookie.min.js, hotBlocker.min.js, hotInImprover.min.js and network configuration against baseline; protected files must remain unchanged unless separately authorized.
2. Compare request method/path/query/callback strings and main script attributes.
3. Assert all protected IDs, names, and custom attributes remain.
4. Parse/validate HTML and CSS; check JS syntax.
5. Verify local asset MIME/decoding and remove invalid 404-as-image references.
6. Browser-test login, saved-card selection, blocker, status, logout, and speed selection on the actual network before asserting production compatibility.
7. Check responsive widths, keyboard focus, contrast, and prefers-reduced-motion.

## Current State / Next Action
Branch: redesign/liquid-glass-ui. Baseline: 8a4eb27aafbff8340c19703cb916253dbbf6916c. Stage 1 — Safe Baseline and Engineering Memory is complete. ROADMAP.md and GPT.md were committed and verified on `redesign/liquid-glass-ui` in commit `67a7394d8dd7e9ed71b7e53a088b9c9c1f94ccba`. Main remains unchanged. No application source files were changed. Next eligible implementation: Stage 2, full visual redesign.
