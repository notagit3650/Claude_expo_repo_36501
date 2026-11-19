# Every number on the slides: source and verification status

Legend: OK = read directly in a paper or the user's own notes in this session. SEARCH = found by web search, secondary source, verify. UNSOURCED = not backed by anything; fix before presenting. DERIVED = computed by me from sourced numbers.

| Slide | Number or claim | Source | Status |
|---|---|---|---|
| Why 1 | 86% of physicians need data-privacy assurances before adopting AI | AMA 2026 Physician Survey on Augmented Intelligence (amaassn.org, March 2026). Reported as "data privacy assurances (86% say important)" for adoption, alongside "validation of safety/efficacy (88%)". | SEARCH. Wording slightly stronger than "important for adoption". |
| Usual fix | about 48B tokens, weeks on 8 GPUs to make a medical model | User's CZS talk, slide 2 ("~48B tokens, 8x A100, weeks"; footnote Meditron-70B, Chen et al. 2023, arXiv:2311.16079) | OK as the user's own number; footnote unverified. Slides say "words": should be "tokens". |
| Usual fix | Anna/Clara forgetting example | User's CZS talk, slide 2 (catastrophic forgetting after medical fine-tuning; Luo et al. 2023, arXiv:2308.08747) | OK, reused from the user. |
| Way 1 hunch | Early layers look up facts, late layers assemble the answer | Geva, Bastings, Filippova, Globerson, "Dissecting Recall of Factual Associations in Auto-Regressive Language Models", EMNLP 2023 (arXiv:2304.14767): early MLPs enrich the subject, attention heads in upper layers extract the attribute. | SEARCH. Models studied: GPT-2 XL, GPT-J. |
| Way 1 hunch | Bars +1, +2, +5, +8, +12 by mention count | Trend from NewsCPT Fig. 4 (about +3 pts per 10x mentions) and multilingual Fig. 4 (<=12 mentions: +1.4 to +2.7; >=200: +10.5 to +14.1 home) | Endpoints OK; middle bars ILLUSTRATIVE. Measured after CPT, not on the base model. |
| Way 1 result | +45% (MLP), +29% (attention), +21% (residual stream) | Steering paper, Fig. 3: mean relative rank improvement under global injection, factual axes, across Llama-3.1-8B, Qwen2.5-7B, Gemma-2 9B: 45.19% / 28.52% / 20.66%. | OK. |
| Way 1 result | MLP wins on factual axes, attention on behaviour (toxicity) | Steering paper s3.1-3.2 | OK (not shown on current slide). |
| Way 2 | Llama 3 from scratch: 15.6T tokens, about 30M GPU-hours | Llama 3.1 405B: 15.6T tokens, 30.84M H100-80GB GPU-hours (model card via secondary sources). 8B: 1.46M, 70B: 7.0M, total 39.3M. Grattafiori et al., "The Llama 3 Herd of Models", arXiv:2407.21783. | SEARCH. Shows the 405B; recommended to switch to 8B. |
| Way 2 | 6B tokens of news | NewsCPT s2.2 (continued pretraining on 6B tokens of English CC-News); multilingual paper (English 6B, German about 4.4B, French about 4.7B, mix about 5.8B tokens) | OK. |
| Way 2 | "2,500x less text" | DERIVED: 15T / 6B = 2,500 (15.6T / 6B = 2,600) | DERIVED. |
| Way 2 | "a few days on a few GPUs" | none | **UNSOURCED. Fix or delete.** |
| Way 2 | 205M news articles, 10 languages | NewsCPT abstract | OK. |
| Why 3 | Dewaele & Costa 2013, 182 multilingual clients; clients code-switch more when emotional tone rises | Dewaele, J.-M. & Costa, B. (2013), "Multilingual clients' experience of psychotherapy", Language and Psychoanalysis 2(2) (DOI 10.7565/landp.2013.0005) | SEARCH. The slide's sentence is shown in quotation marks but is a paraphrase: fix. |
| Question/answer | about 70% of home-language gain carries over | Multilingual paper s3.1, Fig. 3: EN->DE 76%, EN->FR 66%, DE->EN 60%, DE->FR 57%, FR->EN 88%, FR->DE 78%. Mean of the six = 70.8%. | OK (mean DERIVED). Range 57-88% is in the paper. |
| Question | about 15,000 facts, 3 languages | Multilingual paper Table 1: 4,937 EN + 4,912 DE + 4,996 FR after-cutoff facts, each asked in 3 languages | OK (sum DERIVED). |
| Cost | Old facts before 2023: +0.3 | Multilingual paper Fig. 2, before-cutoff change: EN +0.6, DE +0.2, FR +0.3 (5-model means) | OK. The slide shows +0.3 (the French update; German +0.2, English +0.6). |
| Cost | General skills -1.2 (French update, 20 multilingual tasks); +0.3 in French only | Multilingual paper s3.3: DE -1.32, FR -1.21, EN -0.52, mix -0.26; French CPT gains +0.3 on French tasks (Fig. 5) | OK. |
| Mix | Facts: EN +3.4, DE +2.6, FR +3.3, Mix +5.0. Skills: -0.5, -1.3, -1.2, -0.3 | Multilingual paper Fig. 2 (net facts = after-cutoff gain + before-cutoff change) and s3.3 | OK. |
| Average | +5.1 net facts, +0.2 downstream | Multilingual paper abstract/Fig. 1: avg(EN,DE,FR) = +5.1 net, +0.17 downstream | OK. Mixture is +5.0 / -0.26. |
| Average | "Model soups" averaging idea | Wortsman et al., "Model soups: averaging weights of multiple fine-tuned models improves accuracy without increasing inference time", ICML 2022 | OK (cited in the paper). |
| Ongoing | about 95% of new facts survive with MLP-only changes | NewsCPT: MLP-only splice keeps 92.6% of post-cutoff Wikipedia gain (about 78-100% per model). User's MECH2: five models, MLP-only vs full net facts: EN 99%, DE 124%, FR 102%, average 89%, mix 95% (user's notes s20). | DERIVED summary. Prefer 92.6% (NewsCPT) if quoting a published number. |
| Ongoing | first half of the MLP layers carries most | User's MECH2 (Qwen3-4B, one model, mix update): all MLPs 102% of mix net; first half (layers 0-17) 91%; first quarter (0-8) 32%; attention V/O 9% and Q/K 8% (n.s.). Caveat: one model, quarter/half ranges only, 600 items per cell, CIs about +/-1 pp. | OK, user's own notes. |
| Ongoing | the three language updates point in different directions; the average is the "good direction" | User's MECH2 notes: cosine 0.08-0.20 between the EN/DE/FR MLP updates; the average sits at 63-68% of one update's length. | OK (user's notes). The slide only draws the arrows; the numbers (about 0.15, about 65%) were on an earlier version of the slide and were cut as too dense, but remain valid for Q&A. |

## Papers' own caveats (say these if asked)

- Multilingual paper: five models, two families, three high-resource European languages with the same script; machine-translated MCQ; the update language and corpus content are confounded; German/French updates use 20-27% fewer tokens than English/mix; the 3-language average costs about 15B training tokens (three runs) vs 6B for the mixture; no replay or other mitigation tested; effect of averaging on retention is not explained yet.
- NewsCPT: no single layer hotspot (MLP weight change is smooth over depth); MLP-only splice removes 42.6% of the MMLU drop; attention-only keeps only about 18% of the fact gain.
- Steering paper: synthetic cloze prompts; 7-9B models only; two factual axes (medical, law) and one behavioural axis (toxicity).
