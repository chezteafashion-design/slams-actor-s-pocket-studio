# 10 — Risk Register

Likelihood / Impact: L = low, M = medium, H = high.

| # | Risk | L | I | Mitigation | Owner |
| --- | --- | --- | --- | --- | --- |
| R1 | Original 47-page blueprint not available; reconstructed pages diverge from intent | H | M | Matrix flags reconstructed pages; founder confirms before each phase | Founder |
| R2 | Curriculum content volume and quality (8 schools × multiple years) | H | H | Content-as-code with validators; vertical slice first; practitioner review gate; content status stays beta until reviewed | Founder / content lead |
| R3 | Technique names and institutions (Stella Adler Studio, Lee Strasberg Institute, Meisner, Practical Aesthetics/Atlantic) imply affiliation or trademark issues | M | H | "Inspired by / based on the technique of" wording, non-affiliation notice on About, legal review before launch | Founder |
| R4 | Fabricated or misleading AI feedback damages trust | M | H | AI only via server functions, always labelled, no claims of video analysis, coach review path | Engineering |
| R5 | Recording privacy (faces, voices, possibly minors) | M | H | Private buckets, signed URLs, deletion cascade, age gate (16+ or guardian), explicit sharing grants | Engineering |
| R6 | Mobile browser media inconsistencies (iOS Safari MediaRecorder formats, permissions) | H | M | Recorder abstraction, device test matrix in Phase 4, Capacitor native capture later | Engineering |
| R7 | Storage cost growth from video | M | M | Duration caps, resolution presets, per-user quotas, deletion tools | Engineering |
| R8 | Mature brand language vs app-store ratings and some users | M | M | Language-intensity setting, store-rating review in Phase 10, consistent "Bullsh*t" asterisk | Founder |
| R9 | Emotional-safety harm (Strasberg affective memory, trauma) | M | H | Safety guidance, opt-outs, No Tears Required philosophy, no exercise requires reliving trauma | Content lead |
| R10 | Scope creep from 47 pages and 10 experiences | H | H | Phase gates, registry as the only source of pages, no extra destinations | Product |
| R11 | Mockup elements read as promises (progress %, levels) | M | M | Integrity rules G2/G3; honest empty states | Product |
| R12 | Real-time partner rehearsal complexity (WebRTC) | M | M | Phase 5 starts with reader + async invites; live audio/video only after evaluation | Engineering |
| R13 | Single-reviewer bottleneck for assessments | M | M | Rule-based reviewers for objective criteria; coach pool; labelled AI pre-review | Product |
| R14 | Native packaging later forces rework | L | M | Mobile-first, no desktop-only APIs, media behind an abstraction | Engineering |
