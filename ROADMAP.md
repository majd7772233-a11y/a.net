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
- js/scripts.js has now been modified in Stage 3 for local UI behavior only. It must not contain router/API calls. Current blob SHA: ac7d8c72ef65aced4b742b68e919d9c95e87fc3e.
- js/myfile.min.js remains unchanged.
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
- scripts.js retained legacy duplicate initialization and misleading update-control text; these are now addressed in Stage 3.
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
- Left all JavaScript files unchanged in Stage 2.

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
Completed:
- Consolidated local UI startup into one guarded DOMContentLoaded initializer; removed multiple window.onload overwrites, duplicate speed listeners, conflicting preference handlers, and unsafe direct element assumptions.
- Added defensive localStorage access, unified the data-usage preference under dataUsageReminder, and migrated old local keys without changing cookies or router state.
- Synchronized the login toggle and status-page selector. Rewrote the copy to clarify this is only a local preference and cannot turn off operating-system updates or app synchronization.
- Fixed speed-label restoration and persistence to use exact existing profile values; legacy stored option labels are migrated. Saved-card selection refreshes local speed UI only.
- Fixed warnings to match the actual available 8 Mbps and 64 Mbps profiles.
- Rebuilt the local alert as an accessible dialog with focus handling, Escape/outside closing, and a functioning optional report callback.
- Connected the login loading indicator to the existing submit button without changing its request handler; interval cleanup and aria-busy are handled locally.
- Restored the original cookie reader and cookie-clear helpers at initialization because main.min.js otherwise shadows the implementations exported earlier by hotBlocker.min.js and hotCookie.min.js. The protected source files remain untouched.
- Removed the obsolete image-carousel click-to-pause handler.
- The speedChange UI referenced a nonexistent changeSpeed(). Its selector is disabled with an explicit explanation while preserving all four existing values. No network operation was invented.
- Friday greeting is limited to once per local date.

### Stage 3 Validation
- JavaScript syntax parse: passed.
- Fake-DOM behavior harness: 15 checks passed for preference migration/synchronization, speed restore/persistence/warnings, loading lifecycle, accessible modal, report callback, Escape dismissal, and restoration of the original cookie/blocker helpers.
- HTML nesting and unique IDs: passed.
- Required hook IDs/attributes and script load order: preserved.
- Six original price rows and four speed values: preserved.
- No request/API code was added to scripts.js.
- main.min.js, hotCookie.min.js, hotBlocker.min.js, hotInImprover.min.js, and myfile.min.js remain byte-identical to main; only their already-exported helper references are restored by the local UI initializer.
- CSS brace-balance check: passed.
- No live browser or router test was available; production connectivity remains unverified.

## Stage 4 — Accessibility, Responsive and Performance Hardening
Implemented:
- Added a skip link to the main landmark, a name and help description for the login form/card field, and a text label for the local data-usage preference control.
- Added a keyboard-focusable, named price-table scroll region; set the per-second block countdown to aria-live="off".
- Added consistent focus-visible styling and programmatic focus management across panel navigation. Opening a panel focuses its heading; returning to login focuses the card field.
- Raised helper-text legibility and contrast; increased compact switches, selects, alert buttons, and the skip link to 44 CSS-pixel targets where appropriate.
- Added narrow-phone, small viewport, landscape, touch, forced-colors, higher-contrast, reduced-transparency, and reduced-motion handling.
- Reduced blur and animations on mobile/low-power contexts; hover reflections are disabled for touch devices. Pointer reflections now use requestAnimationFrame, are limited to fine-pointer devices, ignore touch pointermove, and stop when reduced motion is preferred.
- Added explicit focus, no-backdrop-filter, and system-color fallbacks. No external dependencies were introduced.
- No router/network files or integration contract values were modified.

### Stage 4 Validation
- HTML nesting: passed; duplicate IDs: zero; required hook IDs/attributes: present.
- Form and checkbox labels, helper descriptions, skip-link destination, table scroll region, and countdown live-region behavior: checked at source level.
- scripts.js and inline pointer script syntax: passed.
- UI behavior harness: 14/14 passed, including keyboard focus transition to panel headings and back to the card field.
- Pointer behavior harness: 4/4 passed for frame throttling, latest-coordinate handling, fine-pointer behavior, and ignoring touch movement.
- CSS brace balance and presence of required accessibility/responsive/performance media rules: passed.
- Sampled text color contrast calculations: lowest sampled value 7.02:1 against the dark background; not a full element-by-element WCAG audit.
- No actual browser visual test or live-router test was available; those checks are deferred to Stage 5.

## Stage 5 — Regression Verification and Handoff
Not started. Run formal HTML/CSS/JS validation where tooling is available, verify local assets, selectors and protected files, test in browser where available, and perform login/saved-card/block/status/logout/speed checks on the actual network when possible. Record precise limitations and deployment/rollback steps.

## Project-Wide Constraints
1. No router/server/backend changes.
2. No modification of request methods, paths, query strings, callbacks, payloads, authentication, or session behavior.
3. No changes to actual speed profiles, prices, phone numbers, or owner content without authorization.
4. Preserve all integration DOM hooks and script configuration.
5. No fake login or demo success replacing real hotspot behavior.
6. Keep main unchanged; use the feature branch.

## Current Progress
Stages 1, 2, 3, and 4 are complete at source-check level on redesign/liquid-glass-ui. main remains untouched. Next stage: Stage 5 — Regression Verification and Handoff.
