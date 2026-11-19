# How the deck evolved: decisions and feedback, in order

Dates are session dates (Oct 2026). The user's exact words are in `user_messages.md`.

## Round 1: first deck (10 slides)
- Request: 10 visual slides, 10 minutes, labmates who don't know LLMs. NewsCPT is the basis; the focus is the multilingual paper (user did most of that work).
- First build: warm-linen background, dark navy accents, text-heavy cards. **Feedback: "sooo much text, I said make it visual."**
- Rebuilt as headline + one big visual + one line. Fixes: "five models" next to four boxes was wrong (4 updates, 5 models); six transfer bars were "too many bars", replaced by one average (about 70%).
- User asked to make it "more natural, attention-grabbing, so someone who doesn't know the topic wants to listen" -> rewrote headlines as story beats.

## Round 2: connect to the steering work
- User supplied the steering paper and a 23-slide Carl Zeiss Stiftung talk (March 2026) on steering, and asked for a bigger picture, not instruction-following line by line. Key learning: the user's voice is eyebrow label + bold claim + italic twist; the user's title style is a question/benefit.
- Title discussion (no slides yet): rejected "Why does averaging two AIs make a better one?" (too one-answer), "Where does an AI keep what it knows... can we just add to it?" (user: "Do I know that?"), "Can an AI learn without forgetting the old?" (too close to the supervisor's title). Also rejected "-" hyphen/em-dash style ("looks AI"). Final: **"Retrain or teach? How AI learns after it's built. Does the language matter?"**
- Structure the user dictated: Part 1 = improve the model with no training (knowledge already there, steering); Part 2 = genuinely new knowledge (news), the cost of forgetting, then "does the language matter".

## Round 3: look and feel
- "Plain white background, change colours accordingly so it looks professional", minimal transitions (later: remove all effects).
- User supplied the original summary scatter (with CIs) and asked to simplify (no CIs, axes in plain language) and add it as the Part 2 summary. Asked about Keynote (cannot write .key; open the pptx in Keynote).
- Repo was empty: deck pushed as `.pptx` with the build script.

## Round 4: organisation and density
- "Very organised with very specific questions: what's the overall goal and two ways." -> goal slide, two ways, numbered questions on every slide.
- "That's a lot of text" about the goal slide -> two icons only.
- External feedback: "slides are very dense" -> cut repetition (facts vs. skills numbers repeated), cut side cards, cut secondary stats, keep the general gain-vs-loss message, remove all transitions. 13 slides.

## Round 5: pitch and motivation
- "Not motivating enough. Make it like a pitch. Slide 2 is only understandable to people who already know what continued pretraining or steering is." -> rebuilt as a story: hook -> usual fix -> two ways -> open the black box -> nudge -> newspaper -> language question -> answer -> cost -> mix -> average.
- User's exact motivation chain (message 49): medicine needs small local models (cite a number); steering as no-training Way 1 because pretraining forgets (late layers focus on completion, early on knowledge, cite); then genuinely new knowledge (cost of training from scratch, a number or two); therapy is preferred in one's own language (cite) so can we train once and transfer?; results; cost; better via mixing; better via averaging with the "model soups" motivation; the result figure; then ongoing work on where the knowledge lives (MLPs, early layers; numbers from the user's MECH2 report) and the question "do I really have to train several models to get the average, or can I find a direction/activation like in steering?"; one summary slide in the same style as the motivation slide; thank you. File name `Lab_presentation_Nitin_23rd_Oct_2026`.
- Built 18 slides with sourced numbers (see `citations_and_numbers.md`).

## Round 6: audit of numbers
- User asked which Llama 3 model the training budget was. Answer: the **405B** (15.6T tokens, about 30.84M GPU-hours); 8B is about 1.46M GPU-hours. Found that slides say "words" but the numbers are **tokens**. Proposed: use Llama 3.1 8B and say tokens. **Not yet applied.**
- Further audit when writing this handoff found: an unsourced "few days on a few GPUs" claim, and a paraphrase shown in quotation marks as if it were a Dewaele & Costa quote. See HANDOFF.md section 6.

## Things the user did not ask for but that matter
- The deck was pushed to a **public** GitHub repo; the papers are under double-blind review. Consider making the repo private.
