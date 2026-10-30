# GPT — Engineering Memory

## Identity and Product
Repository: majd7772233-a11y/a.net. Product: Arabic captive portal for Al-Ghaith Net Wi-Fi. Subscribers buy prepaid cards locally, enter the card number, choose a speed profile, and connect through the existing hotspot. The objective is a professional front-end replacement suitable for handoff to the network owner.

## Non-Negotiable Requirements
- Redesign every portal panel and visible state, not only the login form.
- Follow the Deep / Pure Liquid Glass reference in majd7772233-a11y/gpts/LiquidGlassUI: genuinely translucent surfaces, visible layered backgrounds, backdrop blur, asymmetric reflections and edge highlights, ambient liquid motion, pointer/touch-responsive lighting, depth, and restrained neon. Avoid generic flat glassmorphism.
- Keep the Al-Ghaith purple identity, Arabic RTL first, and responsive phone/tablet/desktop layouts.
- Preserve actual prices, phone numbers, selling-point information, offer availability, and owner content.
- Do not modify server/router communication, authentication/session semantics, request methods, endpoint paths, query strings, callbacks, payloads, or speed profile values.
- User confirms the deployed portal works. Never label unusual request syntax as broken based on convention.
- Develop on redesign/liquid-glass-ui. Do not modify main.

## Baseline and Structure
- Default branch: main.
- Baseline commit: 8a4eb27aafbff8340c19703cb916253dbbf6916c.
- Working branch: redesign/liquid-glass-ui.
- Static HTML/CSS/JS. No backend source, package/build manifest, automated test suite, CI workflow, or router runtime is included in the repository.
- index.html redirects to index-2.html.
- index-2.html contains the login, prices, selling points, offers, connection status, and temporary block panels.
- css/style.css is the primary visual system; css/chik.css contains toggle component styling.
- fonts/Almarai.css and fonts/Almarai.woff2 are local.
- js/main.min.js mixes hotspot communication with panel transitions and status rendering.
- js/hotCookie.min.js manages saved-card cookies and the save/clear hooks.
- js/hotBlocker.min.js manages failed-login counter, temporary block, and countdown.
- js/hotInImprover.min.js normalizes username input.
- js/scripts.js handles local preferences, alerts, loading, and speed-label UI.
- js/myfile.min.js injects a contact/credit strip.
- GET.html is a 109-byte HTML 404 response and is not an image.

## Protected Integration Contract
The following integration and support files remain byte-for-byte unchanged from main:
- js/main.min.js — blob SHA 2d794af9eaf4f833c3b2bb6e25540f6d7d867cc0.
- js/hotCookie.min.js — blob SHA d3dda4ded7d1c4d50478067280280f7a9a51fd13.
- js/hotBlocker.min.js — blob SHA ed181b0eadbe0f792bc222dc40b8ed0e34e05b6a.
- js/hotInImprover.min.js — blob SHA ebeeea10d1567c2bf5f91b8e92a6e2d7f3631f89.
- js/myfile.min.js — blob SHA 741118e8eb41b75b783c04ec43453d167e8c3fb5.

js/scripts.js is the only behavior script changed in Stage 3. It contains local UI state and presentation logic only; its current blob SHA is ac7d8c72ef65aced4b742b68e919d9c95e87fc3e. It must not gain router requests, API calls, authentication, cookie, or session behavior.

Preserve:
- getRequest() and its current XMLHttpRequest behavior, including t.open("GET.html", e, !0).
- /login?username=...&var=callBack and initial /login?var=callBack.
- /logout?var=callBack and /logout?erase-cookie=yes&var=callBack.
- /status?var=callBack and status?var=callBack.
- onLoginError, onLoggedIn, onLoggedOut, onStatusQuery.
- link-login-only="http://a.net/login".
- Speed values 1024K/2048k, 2048K/4096k, 4096K/8192k, 64M/64M.
- Form name login; username/password names; username-field, password-field, rm-white-spaces, improve-input, to-arabic-numbers; enable-hot-cookie, clear-hot-cookie, erase-cookie, enable-hot-blocker, try-count=5, block-time=1.
- IDs speed, se, price, sell-point, info, status, block, error, loadingIndicator, loadingText, remember, remember-select, speedChange, updateStatus, sps, card_number, uptime, session_time_left, bytes_out, bytes_in, remain_bytes_total, count-down-span, speedStatus.
- .login, button[parent-id], .app-logout, .login-submit, .logout-submit.
- Preserve script order: hotInImprover, hotCookie, hotBlocker, scripts, main. The head-loaded myfile script remains in place.
- The login wrapper intentionally keeps class .login without id="login", avoiding a potential collision with the login form named property document.login.

## Stage 1 — Safe Baseline
Completed. Baseline, original integration contract, repository structure, and phased roadmap were recorded on the feature branch.

## Stage 2 — Complete Visual System and Portal Redesign
Completed on redesign/liquid-glass-ui:
- Rebuilt index.html as an Arabic RTL redirect page with a manual fallback link.
- Rebuilt index-2.html using semantic sections for the login area, saved-card selector, speed selection, prices, sales points, offers, connected state, usage, preferences, logout, contacts, and temporary block state.
- Preserved all required DOM hooks and existing form field names. Kept .box and #speedStatus because the existing scripts.js assumes they exist.
- Removed sample card/usage figures and replaced them with neutral dashes until real status data arrives.
- Rebuilt the pricing table with the original six price/time/quota/validity combinations.
- Preserved phone numbers, sales-point wording, and the no-current-offers state.
- Replaced references to invalid image assets with a locally rendered Liquid Glass feature surface; the redesigned HTML contains no image tags and has no external asset dependency.
- Replaced css/style.css with a purple Deep / Pure Liquid Glass visual system: backdrop blur, translucent layered surfaces, asymmetric edge reflections, ambient purple/cyan light, soft movement, and pointer/touch-following highlights.
- Replaced css/chik.css global reset/transition/outline suppression with a scoped keyboard-accessible toggle.
- Added responsive rules, focus-visible styling, a backdrop-filter fallback, and reduced-motion behavior.
- No application or network JavaScript file was changed in this stage.

## Stage 2 Source-Level Validation
- HTML tag nesting check: passed; no mismatched or unclosed tags.
- Duplicate ID check: passed.
- Required integration IDs and attributes: all present.
- Preserved four speed values: all present.
- Pricing table: six data rows.
- Existing script loading order: preserved.
- Image references to the known broken assets: none; image elements: zero.
- CSS and toggle stylesheet brace balance: passed.
- Protected JavaScript files: branch blob SHAs matched main.
- The checks above are source-level checks, not a full browser or live-network test.

## Stage 3 — Safe Client-Side UI Repairs
Completed in js/scripts.js, with truthful-copy/control-state updates in index-2.html and matching presentation rules in css/style.css:
- Replaced three competing window.onload assignments and duplicate event handlers with one guarded DOMContentLoaded initializer.
- Made localStorage access defensive. Added one canonical dataUsageReminder preference and migration from former updatesDisabled, autoUpdateState, and autoUpdateSetting keys.
- Synchronized the login-page toggle, status-page preference selector, status label, and explanatory text. The setting is explicitly a local preference only; it does not disable phone/PC updates or app synchronization.
- Repaired speed-label restoration: the selected profile is stored by its exact existing value, legacy saved option labels are migrated, and the saved-card selector updates the local speed label without sending requests.
- Corrected speed warnings to match the existing 8-megabit and 64-megabit profiles. Invalid old profile comparisons were removed.
- Replaced the old modal with one accessible dialog implementation: semantic dialog labeling, focus management/restoration, Escape and outside-click closing, and working optional report callback.
- Added the login loading state before the existing click handler runs, prevents duplicate loading intervals, sets/removes aria-busy, and clears the loader on existing callback paths. The local hide function is rebound after main.min.js loads so its legacy no-op does not override the indicator.
- Captured and restored the original getCookieOrNull and clearCookies helpers exported by hotBlocker.min.js and hotCookie.min.js because main.min.js shadows those names with replacement globals. The original implementations themselves remain unchanged; restoring the references preserves existing blocker and saved-card clearing behavior.
- Removed the obsolete click-to-pause handler for the former 3D image carousel.
- The old speedChange markup called changeSpeed(), a function absent from every repository script. Rather than invent a router operation, the in-session selector is visibly disabled with an explanation; its original four profile values remain present. A real speed-change operation requires the network owner's documented integration flow and is not claimed as implemented.
- Friday greeting is shown at most once per local date.

### Stage 3 Validation Record
- JavaScript syntax parse using the JavaScript runtime: passed.
- Fake-DOM behavior harness: 15 checks passed, covering legacy preference migration, toggle/selector synchronization, speed restoration and persistence, high-speed warning, loader start/stop and timer cleanup, accessible modal, report callback, Escape dismissal, and restoration of the original cookie/blocker helper functions.
- HTML nesting: passed; duplicate IDs: zero; required DOM IDs/attributes: present.
- Six price rows and all four original speed values: preserved.
- Script order preserved; no new network/API calls or request paths in scripts.js.
- main.min.js, hotCookie.min.js, hotBlocker.min.js, hotInImprover.min.js, and myfile.min.js compared byte-for-byte with main: unchanged. The original global helper functions were restored by reference at UI initialization; their source files were not edited.
- CSS brace-balance check: passed.
- These are source-level and fake-DOM checks. No real-browser rendering or live-router test was available.

## Stage 4 — Accessibility, Responsive and Performance Hardening

Implemented on the same feature branch:
- Added a visible-on-focus skip link to the main content and made the main landmark a programmatic focus target.
- Added an accessible name to the login form, a descriptive help text for the card number input, and a described-by relationship for the speed selector.
- Added a real text label for the data-usage preference checkbox; the decorative switch track is hidden from assistive technology while retaining click behavior.
- Made the pricing table wrapper a named, keyboard-focusable scroll region for narrow-screen horizontal scrolling.
- Marked the one-second block countdown as aria-live="off" to avoid constant unsolicited screen-reader announcements.
- Added shared focus-visible outlines for links, buttons, form controls and programmatically focused content. Focus moves to the heading when an information/status/block panel opens and returns to the card-number field when navigating back to login.
- Raised small helper text and footer contrast, and increased compact switch/select/alert/skip-link targets to at least 44 CSS pixels where relevant.
- Added responsive handling for narrow phones, small screens, landscape/short viewports, touch-first devices, and modern small-viewport units. Existing table horizontal scrolling is preserved.
- Added more-contrast, forced-colors, reduced-transparency, and reduced-motion treatments plus a no-backdrop-filter fallback.
- Reduced expensive blur strengths on mobile, disabled hover-only glass reflections on touch devices, limited pointer effects to fine-pointer devices, throttled pointer updates to requestAnimationFrame, and disabled pointer-following effects when reduced motion is requested.
- Limited ambient movement to larger fine-pointer screens; removed the old breathing animation from the promo surface.
- No network/router code, API paths, speed values, prices, or protected integration files were modified.

### Stage 4 Validation Record
- HTML structural nesting: passed; duplicate IDs: zero; required DOM IDs/attributes: all present.
- Form/checkbox/control labeling, skip-link destination, keyboard-focusable price-table region, and live-region behavior: source checks passed.
- JavaScript syntax: passed for scripts.js and the inline pointer-lighting script.
- UI behavior harness: 14 of 14 checks passed, including focus transfer to panel headings and focus restoration to the card field.
- Pointer-lighting harness: 4 of 4 checks passed (fine-pointer listener, one animation-frame update for burst input, latest pointer coordinates, and ignoring touch pointermove).
- CSS brace balance: passed. Presence of focus, touch, landscape, reduced-motion, reduced-transparency, higher-contrast, forced-colors, and mobile blur-fallback rules: verified.
- Sampled foreground contrast calculations against the dark surface exceeded 4.5:1 (the lowest sampled value was 7.02:1); these calculations are not a full palette/element WCAG audit.
- No browser visual preview or real-router test was available; responsive rendering and deployed connectivity still require Stage 5 checks on actual runtime/browser/network.

## Runtime and Deployment Limits
- No router/server source or live hotspot was provided.
- Do not claim that login, logout, status polling, speed changes, saved cards, or block countdown have been verified in production until tested on the actual Al-Ghaith Net network.
- No real-browser visual test was available through the connected repository environment.
- Do not introduce a CDN, package manager, framework, external font, external image, or server dependency.
- Keep main untouched.

## Next Action
Read this file and ROADMAP.md again before starting Stage 5 — Regression Verification and Handoff. Stage 4 is closed at source-check level; browser and live-network checks remain explicit Stage 5 work.
