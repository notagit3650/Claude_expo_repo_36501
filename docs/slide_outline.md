# Current deck: 18 slides (the exact text is in `web_deck/project/slides/*.html` and `slides/build_pptx.js`)

Format per slide: eyebrow / headline / visual / bottom-line sentence.

1. **Cover.** MHM Lab meeting / *Retrain or teach?* / How AI learns after it's built. *Does the language matter?* / presenter + supervisors + MHM Lab.
2. **Why this matters 1.** *Doctors want AI. Not on someone else's computer.* / big "86%" (AMA physician survey 2026) + two cards: big model (data leaves the clinic) vs small local model that still knows medicine / "We need small models that run in the clinic. *Can we make one understand medicine without retraining it?*"
3. **The usual fix.** *Send it back to school. Expensive, and it forgets.* / "~48B words, weeks on 8 GPUs" + Anna/Clara before/after / "Training has a cost: what it used to know. *Can we avoid training altogether?*" (fix: tokens)
4. **Way 1 · the hunch.** *The knowledge is already in there. It gets lost on the way out.* / five bars (once ... 200+) + layer stack (early layers look up facts, late layers assemble the answer; Geva et al. 2023) / "Even a fact read once leaves a trace. *A weak one gets overruled by the layers that write the answer.*"
5. **Way 1 · open the box.** *So we looked inside. Knowledge has an address.* / black "?" box -> cluster plot (medical vs everything else, arrow v) / "Medical sits in its own corner. *So we can point at it: one arrow, v.*"
6. **Way 1 · the nudge.** *Add the arrow while it thinks. Where you add it matters.* / layer stack with "MLP layer + v"; bars +21% (usual spot), +29% (attention), +45% (MLP) / "No training, nothing forgotten. *But it can only surface what the model has already read.*"
7. **Why this matters 2.** *But what if the knowledge is genuinely new? The model finished school in 2023.* / timeline with lock at Dec 2023 / "Steering can't surface what was never read. *Now we have to train, and pay the forgetting cost.*"
8. **Way 2 · the cheaper way.** *Don't rebuild it. Hand it the newspaper.* / "15.6 T from scratch (Llama 3, Meta 2024)" vs "6 B of fresh news, 2,500x less" / "Same model, same recipe, new text: it learns the news. *It still forgets a little. Can we minimise that?*"
9. **Why this matters 3.** *People open up in their own language. Do we have to train once per language?* / Dewaele & Costa 2013 (182 clients) + EN, DE, FR circles "train / train again? / and again?" / "If we must train, we'd rather train once. *So: does what it learns in one language carry to the others?*"
10. **Way 2 · the question.** *It read the news in English. Ask it in German. Does it know?* / EN, DE, FR -> plain LLM -> EN, DE, FR / "A plain model, no reasoning, same facts in three languages. *What's your guess?*"
11. **Way 2 · the answer.** *Mostly, yes. Knowledge doesn't really speak a language.* / "~70%" with a bar / "About 70% of what it learned in English, it can answer in German or French. *Asking in the language it read is still a bit better.*"
12. **Way 2 · the cost.** *So what did training cost us?* / two cards: +0.3 old facts, -1.2 general skills / "Old facts stay. General skills slip, mostly in the other languages. *Can we take less of a hit, and transfer more?*"
13. **Way 2 · better.** *Mix the three newspapers. Less damage, more facts.* / bar charts: new facts (EN +3.4, DE +2.6, FR +3.3, Mix +5.0) and skills lost (-0.5, -1.3, -1.2, -0.3) / "Mixing helps. *But can we do even better?*"
14. **Way 2 · even better.** *Teach three students, then average their brains.* / EN + DE + FR ÷ 3 = star / "All the new facts, nothing lost, no extra training. *'Model soups', Wortsman et al. 2022: average the weights.*"
15. **Way 2 · the result.** *Every update learns. Only the average learns without losing.* / the scatter (facts learned vs skills kept; base, EN, DE, FR, mix, average) / "Right = more new facts. Up = nothing forgotten. *Top right is where we want to be.*"
16. **Ongoing.** *In the same place steering found. So do we even need to train three models?* / MLP layer stack (first half highlighted) + "about 95% of the new facts survive if we keep only the MLP changes" + three language arrows and the "good direction" / "If we know where and which way, maybe we nudge the MLPs there, like steering, *instead of training three models.*"
17. **What we achieved.** *Retrain or teach? Teach.* / three cards: a local medical model (steer it), genuinely new knowledge (newspaper, then average), every language (train once, mostly) / "Knowledge has an address and a direction. *Next: find the direction without training at all.*"
18. **Thank you.** *Thank you for your attention.* Questions? / presenter, supervisors, MHM Lab, email.

Speaker notes on every slide carry the technical terms (continued pretraining, activation steering, model soups) and the exact numbers for Q&A.

## Slides that existed in earlier versions and were cut (restore if wanted)
- Repetition driver (EN a few mentions +2 vs 200+ mentions +12 / +9 cross-language) and "what it reads matters about 2x more than the language".
- Per-direction transfer bars (EN->DE 76, EN->FR 66, DE->EN 60, DE->FR 57, FR->EN 88, FR->DE 78).
- A 3x3 "which newspaper" grid (own-news gains 3.5/3.5/4.6, off-diagonals 1.4-3.0).
- A "why averaging works" slide with cosine about 0.15 and average length about 65%.
- NewsCPT news-vs-web bars (+8.2/+4.7/+4.5 vs about 2-6 points less for web text on Wikipedia/CC-News/Daily Oracle).
