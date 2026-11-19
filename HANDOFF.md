# Handoff: "Retrain or teach?" lab talk (Nitin Sharma, MHM Lab, 23 Oct 2026)

Everything needed to resume this work in a new Claude session. Read this first, then `docs/`.

## 0. Paste this to start a new session

> I'm continuing a lab-meeting presentation. Repo: `notagit3650/Claude_expo_repo_36501`, branch `claude/llm-research-presentation-slides-q7ncw2`. Read `HANDOFF.md` and everything in `docs/` first. The deck is `slides/Lab_presentation_Nitin_23rd_Oct_2026.pptx`, built by `slides/build_pptx.js`. Follow the style rules in HANDOFF.md section 3 exactly, and start with the "Open TODOs" in section 6. Do not invent numbers or citations: every statistic must trace to `docs/citations_and_numbers.md`.

If the three papers and the Carl Zeiss deck are not in `papers/` and `reference/`, ask me to attach them (see `papers/README.md`).

## 1. The task

- **Speaker:** Nitin Sharma, Research Assistant, UKT Tübingen. MHM Lab (Mental Health Mapping).
- **Supervisors on the title slide:** Prof. Dr. Thomas Wolfers (Carl Zeiss Professor for AI in Neural Systems Imaging, FSU Jena); Dr. Çağatay Yıldız (Cluster of Excellence ML for Science, University of Tübingen). Names and affiliations must match the CZS deck (`reference/czs_steering_talk/`).
- **Contact on closing slide:** nitinsharma3150@gmail.com (copied from the CZS deck).
- **Audience:** labmates who know little about LLMs. 10 minutes. Very high level, visual, almost no text, one clear takeaway per slide.
- **Talk title (chosen by the user):** "Retrain or teach? How AI learns after it's built. Does the language matter?"
- **Supervisor's own talk title (do not copy):** "Continued pretraining: how to update LLMs with what happened yesterday".
- **Output file name (required):** `Lab_presentation_Nitin_23rd_Oct_2026.pptx`. The user also asked about Keynote: this environment cannot write `.key`; Keynote opens the `.pptx` directly (File > Open).

## 2. The three pieces of work being presented

| Work | What it shows | Role in the talk |
|---|---|---|
| **Steering paper** "Where You Steer Depends on What You Steer" (ICML submission, anonymous) | Steering vectors added at MLP outputs improve factual recall far more than at the residual stream or attention (mean rank improvement 45.19% vs 20.66% residual, 28.52% attention, global injection, factual axes, 3 models). For behaviour (toxicity) attention wins. | **Way 1**: "it already knows it, so nudge it". |
| **NewsCPT** "News as a Substrate for Temporal Continued Pretraining" (ICLR 2027 submission, anonymous) | 205M-article news corpus (10 languages, 2024-2026). Continued pretraining on 6B tokens of English news beats matched-budget web text by 3.6 to 6.3 points on post-cutoff quizzes. Gains grow about log-linearly with how often the corpus states a fact. Costs: small drop in general skills; MLP-only splice keeps 92.6% of new-fact gain. | The basis for **Way 2** (hand it the newspaper). |
| **Multilingual paper** "Does New Knowledge Cross Languages? Multilingual Transfer and Update Language in Temporal Continued Pretraining" (ACL submission, anonymous). **The user did most of this work; it is the focus.** | 5 models (Llama-3.2-3B, Llama-3.1-8B, Qwen3 1.7B/4B/8B) updated on EN, DE, FR or mixed news; same facts asked in 3 languages. 57-88% of home-language gain transfers; coverage matters about 2x more than query language; German/French-only updates lose 1.2-1.3 points on 20 multilingual tasks (EN 0.5, mix 0.3); weight averaging of EN+DE+FR gives +5.1 net facts, +0.2 downstream. | The heart of **Way 2**. |

Also used for context (not published): the user's MECH2 notes on where new knowledge lives (`docs/mech2_notes_from_user.md`) and the March 2026 Carl Zeiss Stiftung steering talk (`reference/czs_steering_talk/`).

## 3. Style rules the user gave (follow exactly)

1. **Very visual, minimal text.** Text people "don't need to read at all". One visual and one bottom-line sentence per slide. Several rounds of "too dense": cut repeated numbers, cut side cards, cut secondary stats, keep the general "gain vs. loss" message rather than many bar breakdowns.
2. **Motivate every part, intuitively, for non-experts.** No jargon before the picture has explained it ("newspaper" not "continued pretraining"; "tip of the tongue" not "latent knowledge"; "arrow v" not "steering vector"). A flowing story with hooks, like a pitch. Each motivation gets one real number with a citation.
3. **Titles are claims or questions in the user's own CZS-deck voice:** a small eyebrow label, a bold claim, an *italic* twist. Example: "Retraining is the brute-force option. *Looking inside is the smart one.*"
4. **No em dashes** in visible text (the user: "it looks AI because of the hyphen"). Use periods, commas or colons.
5. **Plain white background**, professional palette (near-black headings, grey body, one burnt-orange accent `#C2410C`; language colours EN `#2563EB`, DE `#D97706`, FR `#7C3AED`). Fonts in the pptx: Cambria (headings) + Calibri (body), which ship with Office. The web deck uses Source Serif 4 + IBM Plex Sans.
6. **No transitions and no effects.** (First request was "minimal fade", then "remove them".) The current pptx has none.
7. **Re-plot the summary figure without confidence intervals** and with plain-language axes: x "new facts learned", y "general skills kept".
8. **Never invent numbers.** The user asked for "one or two numbers, not more" per motivation, with citations. Accuracy corrections the user made: there are **4 update corpora** (EN, DE, FR, Mix) but **5 models**; do not show "5 models" next to four boxes.
9. Show the 3-language setup in a build order: first three (EN, DE, FR), then the mix, then the average.

## 4. The story (current deck, 18 slides)

See `docs/slide_outline.md` for the exact on-slide text. Arc:

1. **Why this matters.** Cover; (1) doctors need AI that runs locally: AMA survey 86%; (2) the usual fix (retrain) costs money and forgetting.
2. **Way 1: it already knows it.** The hunch (even a fact read once leaves a trace; early layers look up facts, late layers assemble the answer, Geva et al. 2023) -> open the black box (medicine clusters apart in one layer, arrow v) -> the nudge (add v at MLP: +45% vs +21% usual spot).
3. **Way 2: genuinely new knowledge.** (2) The model finished school in 2023 -> hand it the newspaper (Llama 3 from scratch vs 6B tokens) -> (3) therapy happens in people's own language (Dewaele & Costa 2013) so: train once per language? -> the question (EN in, DE out) -> the answer (about 70% carries over) -> the cost (old facts stay, general skills slip, hidden in other languages) -> mix the three newspapers -> average three models ("model soups", Wortsman et al. 2022) -> the result figure (scatter).
4. **Ongoing + summary.** Where does the new knowledge live? In the MLPs, first half of layers (about 95% of new facts survive MLP-only). Could we find the direction without training three models? -> summary slide (three motivations answered) -> thank you.

## 5. Files and how to rebuild

```
HANDOFF.md                  this file
README.md                   short repo description
docs/
  chat_summary.md           chronological decisions and the user's feedback
  citations_and_numbers.md  every number on a slide, its source, and verification status
  slide_outline.md          the 18 slides: headline, visual, bottom line, speaker notes summary
  user_messages.md          all the user's messages, verbatim
  mech2_notes_from_user.md  the user's pasted MECH2 / E1 notes, verbatim
slides/
  Lab_presentation_Nitin_23rd_Oct_2026.pptx   the deck (speaker notes on every slide)
  build_pptx.js             pptxgenjs script that generates the deck
  summary_part2.png         the re-plotted summary figure (no CIs)
  plot_summary_figure.py    matplotlib script that makes it
web_deck/project/           the same deck as the HTML "Slides" artifact (deck.json + slides/*.html)
reference/                  the user's original figure, CZS talk contact sheets, feedback screenshots
papers/                     paper notes (+ recovered text/page images if included; see papers/README.md)
```

Note: the verbatim user messages, the MECH2 notes, `papers/key_results.md`, recovered paper text/pages, `reference/` and `chat/` are published only if the owner confirms the repository is private (it was public when this was written). If any of them are missing here, ask the owner for the files.

**Rebuild the pptx** (from `slides/`): `npm install pptxgenjs react react-dom react-icons sharp jszip`, then `node build_pptx.js out.pptx`. Notes from this session:
- pptxgenjs needs `NODE_PATH=$PWD/node_modules` if you run the script from elsewhere.
- Layout is `LAYOUT_WIDE` (13.33 x 7.5 in). Colours are hex without `#`.
- The script originally called helper scripts from Claude's pptx skill (`apply_theme.js`, `validate.py`). If these are unavailable, remove the `applyTheme` call (colours are hard-coded anyway) and check the file by opening it or converting with LibreOffice (`soffice --headless --convert-to pdf`).
- Icons are rendered from `react-icons` (Feather, Heroicons) to PNG with `sharp`.

**Web deck.** The live version was a private claude.ai "Slides" artifact (`https://claude.ai/artifact/61DyVGRUKkADBKhUdSNS1g`, only visible to the owner's account). To recreate it in a new session: create a new Slides artifact and publish `web_deck/project/deck.json` plus `web_deck/project/slides/*.html`. The summary slide references an uploaded asset (`/_blob/...`) that will not exist in a new artifact: re-upload `slides/summary_part2.png` and update the `<img src>` in `summary2.html`.

## 6. Open TODOs (in priority order)

1. **Tokens, not words.** Slides say "words" for 48B, 6B and 15.6T; these are **tokens** (about 0.75 words each). Change to "tokens" everywhere (slides 3 and 8 and the speaker notes) or add a gloss.
2. **Llama 3 comparison.** The slide shows Llama 3.1 **405B** (15.6T tokens, about 30.84M H100 GPU-hours), which is not a model one runs in a clinic. Recommended: compare to **Llama 3.1 8B** (more than 15T tokens, about 1.46M GPU-hours; same size class as the user's Llama-3.1-8B). Cite: Grattafiori et al., "The Llama 3 Herd of Models", Meta 2024, arXiv:2407.21783, and the Llama 3.1 model card. Numbers came from secondary sources; verify against the model card.
3. **Unsupported claim: "a few days on a few GPUs"** for the 6B-token update (slide 8). This was not taken from any paper. Replace with the real figure from the user's own runs or remove it.
4. **Therapy quote is a paraphrase in quotation marks** (slide 9): "When the emotional tone rises, multilingual clients switch to their first language." The Dewaele & Costa 2013 result (182 multilingual clients) is that code-switching happens when emotional tone rises; it is not a verbatim quote. Remove the quotation marks or reword, and cite the exact finding.
5. **AMA 86%** (slide 2) is "data-privacy assurances are important for adoption" (AMA 2026 physician survey), not "won't use AI because of privacy". Wording on the slide ("need ... before they would adopt") is close but check against the report.
6. **"Seen-once" curve** (slide 4): the middle bars (+5, +8) are illustrative of the log-linear trend. Endpoints come from the multilingual paper (at most 12 mentions: +1.4 to +2.7 cross-language; 200 or more: +10.5 to +14.1 home language). The curve is measured after continued pretraining, not on the base model; the slide uses it as intuition for "weak traces". Say so in the notes.
7. **48B tokens to teach medicine** (slide 3): taken from the user's CZS deck (Meditron-70B, Chen et al. 2023, arXiv:2311.16079; catastrophic forgetting, Luo et al. 2023, arXiv:2308.08747 — footnote read from a low-resolution render, verify).
8. **The Way-1 hook uses the CPT curve.** The user's own CZS "tuned lens / where does forgetting happen" slides are better evidence that knowledge is present mid-stack and lost at output; consider adding one picture from that talk.
9. **"About 95%"** (ongoing slide) is a one-number summary: NewsCPT MLP-only keeps 92.6%; the user's five versions range 89-124%. Swap for 92.6% if a single published number is preferred.
10. Optional: the CZS deck's "Anna passed the file to Ben" forgetting example is reused from the user's own talk.

## 7. Known facts and gotchas

- The original PDFs and the CZS `.pptx` were uploaded attachments in the first session and were **not recoverable** from the container afterwards. See `papers/README.md` for what is included instead.
- Both ICLR/ACL/ICML submissions are anonymous and under review. The steering paper is marked "Preliminary work. Under review... Do not distribute."
- **Repository visibility:** `notagit3650/Claude_expo_repo_36501` was **public** when this handoff was written. Check what you commit here.
- A Claude session cannot create `.key` files. A new session cannot see the old session's artifact unless it is the same account.
- Numbers on the summary scatter (net facts / downstream): EN 3.4 / -0.52, DE 2.6 / -1.32, FR 3.3 / -1.21, Mix 5.0 / -0.26, average 5.1 / +0.17 (five-model means, multilingual paper Fig. 1 and Fig. 2).
