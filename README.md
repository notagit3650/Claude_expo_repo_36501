# Retrain or teach? How AI learns after it's built. Does the language matter?

Lab-meeting talk (10 min) covering three pieces of work:

1. **Steering** – "Where You Steer Depends on What You Steer": factual knowledge is surfaced best by nudging MLP outputs (no training).
2. **NewsCPT** – news as a substrate for temporal continued pretraining.
3. **Multilingual CPT** – "Does New Knowledge Cross Languages?": facts transfer across languages, costs hide in the other languages, and averaging separately trained updates keeps the facts without the damage.

## Files

- `slides/Lab_presentation_Nitin_23rd_Oct_2026.pptx` – the deck (18 slides, speaker notes included).
- `slides/summary_part2.png` – the Part 2 summary figure (facts learned vs. skills kept), re-plotted without confidence intervals.
- `slides/build_pptx.js` – pptxgenjs script that generates the deck (`NODE_PATH=./node_modules node build_pptx.js out.pptx` after `npm install pptxgenjs react react-dom react-icons sharp`).
