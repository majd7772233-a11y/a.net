# ROADMAP

## Objective
Transform the Arabic Al-Ghaith Net captive portal into a polished, accessible, responsive Deep / Pure Liquid Glass experience using its purple identity. Deliver a front-end replacement without changing router, server, authentication, session, API, or hotspot integration.

## Success Criteria
- Preserve login, logout, status polling, speed selection, saved-card behavior, blocker behavior, and hotspot integration.
- Preserve request methods, paths, query parameters, callbacks, payloads, script attributes, DOM hooks, form names, and script order.
- Redesign login, prices, sales points, offers, connected status, usage information, preference controls, blocked state, alerts, loading, and contacts.
- Use genuine translucent surfaces, backdrop blur, layered depth, edge lighting, reflections, purple/cyan ambient light, soft liquid motion, and pointer/touch-responsive highlights.
- Support Arabic RTL, phones/tablets/desktops, keyboard access, visible focus, labels, and reduced motion.
- Repair malformed markup and styling. Remove broken-image dependencies without changing business data.
- Never state that live-router behavior was tested unless the actual network was used.

## Baseline
- Repository: majd7772233-a11y/a.net.
- Default branch: main.
- Baseline commit: 8a4eb27aafbff8340c19703cb916253dbbf6916c.
- Working branch: redesign/liquid-glass-ui.
- Static HTML/CSS/JS; no backend, package/build manifest, automated tests, CI, or live-router access.
- Entry: index.html. Main UI: index-2.html. Styles: css/style.css and css/chik.css. Font: local Almarai.
- Existing JS: main.min.js, hotCookie.min.js, hotBlocker.min.js, hotInImprover.min.js, scripts.js, myfile.min.js.

## Protected Integration Boundary
Do not modify server/router communication or the business logic in protected JS:
- js/main.min.js — unchanged; includes getRequest(), XMLHttpRequest behavior, login/logout/status paths, callbacks, panel flow, and session logic.
- js/hotCookie.min.js — unchanged; saved-card and cookie semantics.
- js/hotBlocker.min.js — unchanged; retry counter, block time, countdown.
- js/hotInImprover.min.js — unchanged; input normalization.
- Also unchanged in this stage: js/scripts.js and js/myfile.min.js.
- Preserve main.min.js attribute link-login-only="http://a.net/login".
- Preserve form name login, username/password names, all custom input attributes, cookie/blocker attributes, selectors, and script order.
- Preserve exact speed profiles: 1024K/2048k, 2048K/4096k, 4096K/8192k, 64M/64M.
- Preserve selectors .login, button[parent-id], .app-logout, .login-submit, .logout-submit and status IDs card_number, uptime, session_time_left, bytes_out, bytes_in, remain_bytes_total, updateStatus, sps.
- Do not add an id="login" to the wrapper; the form uses name="login" and the network script reads document.login.
- Do not normalize odd request syntax based on convention. The user confirms the deployed portal works.

## Verified Baseline Findings
- Baseline index.html redirected to index-2.html and incorrectly declared English for an Arabic portal.
- Original prices: 100 YER / 5 hours / 350 MB / 2 days; 200 YER / 8 hours / 1000 MB / 2 days; 300 YER / 10 hours / 1500 MB / 3 days; 500 YER / 20 hours / 2.5 GB / 10 days; 1000 YER / 50 hours / 5 GB / open validity; 3000 YER / unlimited time / 15 GB / one month.
- Phone numbers retained: 739741546 and 777252368; WhatsApp link retained for +967739741546.
- Sales point copy remains: all nearby grocery stores.
- Current offer state remains: no offers at this time.
- Several image paths were 109-byte HTML 404 content, not image files. The redesigned page no longer references them.
- Original HTML had duplicate id, invalid contact anchor, stray closing tags, and malformed table rows.
- scripts.js retains known legacy UI assumptions and duplicate window.onload handlers; these are reserved for Stage 3.
- main.min.js combines hotspot integration and panel behavior, so it remains fully untouched.

## Stage 1 — Safe Baseline and Engineering Memory
Completed. Baseline, branch, project constraints, and documentation recorded.

## Stage 2 — Complete Visual System and Portal Redesign
Completed on redesign/liquid-glass-ui:
- Replaced the root redirect page with Arabic RTL metadata and a fallback navigation link.
- Rebuilt all visible portal sections with semantic, validly nested markup.
- Created a purple Deep / Pure Liquid Glass system with real translucent layers, blur, asymmetrical reflections, ambient light, soft animation, and pointer/touch-following highlights.
- Added responsive layouts, keyboard focus, a scoped accessible toggle, reduced-motion rules, and a no-backdrop-filter fallback.
- Replaced broken image-carousel paths with a local CSS feature panel; no image or external asset dependency remains in the new portal markup.
- Preserved price details, phone numbers, sales point wording, and the no-current-offers message.
- Retained the legacy DOM contract and script loading order.
- Left all JavaScript files unchanged.

### Stage 2 Validation Record
- HTML structural nesting: passed (zero mismatched/unclosed tags).
- Duplicate IDs: zero.
- Required DOM IDs/attributes, names, panel selectors, four speed values, and script order: passed.
- Pricing rows: six.
- Broken-image references and HTML image tags: zero.
- CSS braces: balanced in both style sheets.
- Six JavaScript files compared against main: unchanged blob SHAs.
- No full browser/standards validation and no live-router test were available. Therefore real login/logout/session compatibility remains unclaimed.

## Stage 3 — Safe Client-Side UI Repairs
Not started. Inspect non-network UI logic and callers. Address duplicate initialization, missing-element assumptions, status/speed labels, local preference behavior, alerts, loading indicators, and UI transitions. Correct any claim that settings disable operating-system or app updates when no real control mechanism exists. Do not alter network requests, saved-card semantics, blocker behavior, or speed profiles. Acceptance requires meaningful behavior checks and a proof that protected JS/network contract is unchanged.

## Stage 4 — Accessibility, Responsive and Performance Hardening
Not started. Verify keyboard/touch behavior, labels/ARIA, contrast, touch target sizing, reduced motion, blur fallback, low-power effect cost, and dependency-free delivery. Acceptance: usable on phone/tablet/desktop, including without backdrop-filter.

## Stage 5 — Regression Verification and Handoff
Not started. Run formal HTML/CSS/JS validation where tooling is available, verify local assets, selectors and protected files, test in browser where available, and perform login/saved-card/block/status/logout/speed checks on the actual network when possible. Record precise limitations and deployment/rollback steps.

## Project-Wide Constraints
1. No router/server/backend changes.
2. No modification of request methods, paths, query strings, callbacks, payloads, authentication, or session behavior.
3. No changes to actual speed profiles, prices, phone numbers, or owner content without authorization.
4. Preserve all integration DOM hooks and script configuration.
5. No fake login or demo success replacing real hotspot behavior.
6. Keep main unchanged; use the feature branch.
