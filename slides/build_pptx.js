const pptxgen = require("pptxgenjs");
const { applyTheme } = require("/root/.claude/skills/synced/cd0a84d5-00aa-4b5b-b3eb-d1fafa02cdec_2f28d899-d7d9-42d1-b743-b2a7163a44e1/pptx/scripts/apply_theme.js");

const THEME = {
  name: "Retrain or teach",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "111827", lt1: "FFFFFF", dk2: "374151", lt2: "F9FAFB",
    accent1: "C2410C", accent2: "2563EB", accent3: "D97706", accent4: "7C3AED",
    accent5: "9CA3AF", accent6: "166534", hlink: "2563EB", folHlink: "7C3AED",
  },
};
const T = THEME.colors;

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.title = "Retrain or teach? How AI learns after it's built. Does the language matter?";
pres.author = "Nitin Sharma";
const C = pres.SchemeColor;

const M = 0.7; // margin
const W = 13.33 - 2 * M;

pres.defineSlideMaster({
  title: "CONTENT",
  background: { color: "FFFFFF" },
  objects: [
    { placeholder: { options: { name: "eyebrow", type: "body", x: M, y: 0.45, w: W, h: 0.35, fontSize: 12, bold: true, charSpacing: 3, color: C.accent1, margin: 0 } } },
    { placeholder: { options: { name: "title", type: "title", x: M, y: 0.8, w: W, h: 1.2, fontSize: 32, bold: true, color: C.text1, valign: "top", align: "left", margin: 0 } } },
    { placeholder: { options: { name: "takeaway", type: "body", x: M, y: 6.55, w: W, h: 0.6, fontSize: 18, bold: true, color: C.text1, valign: "middle", margin: 0 } } },
  ],
  slideNumber: { x: 12.3, y: 7.05, w: 0.6, h: 0.3, fontSize: 10, color: T.accent5 },
});
pres.defineSlideMaster({
  title: "TITLE",
  background: { color: "FFFFFF" },
  objects: [
    { placeholder: { options: { name: "eyebrow", type: "body", x: M, y: 1.6, w: W, h: 0.35, fontSize: 12, bold: true, charSpacing: 3, color: C.accent1, margin: 0 } } },
    { placeholder: { options: { name: "title", type: "title", x: M, y: 2.0, w: W, h: 1.6, fontSize: 66, bold: true, color: C.text1, valign: "top", align: "left", margin: 0 } } },
    { placeholder: { options: { name: "subtitle", type: "body", x: M, y: 3.7, w: W, h: 1.0, fontSize: 28, color: C.text2, valign: "top", margin: 0 } } },
  ],
});

function head(slide, eyebrow, bold, italic) {
  slide.addText(eyebrow.toUpperCase(), { placeholder: "eyebrow" });
  const runs = [{ text: bold + (italic ? " " : ""), options: { bold: true, color: C.text1 } }];
  if (italic) runs.push({ text: italic, options: { italic: true, bold: false, color: "6B7280" } });
  slide.addText(runs, { placeholder: "title" });
}
function take(slide, plain, italic) {
  slide.addText([
    { text: plain + " ", options: { bold: true } },
    { text: italic, options: { italic: true, bold: false, color: "6B7280" } },
  ], { placeholder: "takeaway" });
}
function card(slide, x, y, w, h, accent) {
  slide.addShape(pres.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.12, fill: { color: accent ? "FFF7ED" : "F9FAFB" }, line: { color: accent ? "FDBA74" : "E5E7EB", width: 1 } });
}
function bar(slide, x, yBase, w, h, color, label, labelColor) {
  slide.addShape(pres.ShapeType.rect, { x, y: yBase - h, w, h, fill: { color }, line: { color, width: 0 } });
  slide.addText(label, { x: x - 0.2, y: yBase - h - 0.42, w: w + 0.4, h: 0.4, fontSize: 16, bold: true, color: labelColor || "111827", align: "center", isTextBox: true, margin: 0 });
}
function axis(slide, x, y, w) {
  slide.addShape(pres.ShapeType.line, { x, y, w, h: 0, line: { color: "111827", width: 2 } });
}
function big(slide, x, y, w, text, color, size) {
  slide.addText(text, { x, y, w, h: size / 60, fontSize: size || 60, bold: true, fontFace: "Cambria", color: color || "111827", isTextBox: true, margin: 0 });
}
function note(slide, text) { slide.addNotes(text); }
function pill(slide, x, y, w, text) {
  slide.addShape(pres.ShapeType.roundRect, { x, y, w, h: 0.42, rectRadius: 0.21, fill: { color: "DCFCE7" }, line: { color: "DCFCE7", width: 0 } });
  slide.addText(text, { x, y, w, h: 0.42, fontSize: 13, bold: true, color: "166534", align: "center", valign: "middle", isTextBox: true, margin: 0 });
}
function lang(slide, x, y, w, h, code, color, outline) {
  slide.addShape(pres.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.1, fill: { color: outline ? "FFFFFF" : color }, line: { color, width: outline ? 2.5 : 0 } });
  slide.addText(code, { x, y, w, h, fontSize: 20, bold: true, color: outline ? "111827" : "FFFFFF", align: "center", valign: "middle", isTextBox: true, margin: 0 });
}
function arrow(slide, x, y, w, h, color) {
  slide.addShape(pres.ShapeType.rightArrow, { x, y, w, h, fill: { color: color || "9CA3AF" }, line: { color: color || "9CA3AF", width: 0 } });
}

// ---------- 1 cover
pres.addSection({ title: "Part 1: It already knows more than it says" });
{
  const s = pres.addSlide({ masterName: "TITLE", sectionTitle: "Part 1: It already knows more than it says" });
  s.addText("MHM LAB MEETING", { placeholder: "eyebrow" });
  s.addText("Retrain or teach?", { placeholder: "title" });
  s.addText([
    { text: "How AI learns after it's built. ", options: {} },
    { text: "Does the language matter?", options: { italic: true, color: "6B7280" } },
  ], { placeholder: "subtitle" });
  s.addShape(pres.ShapeType.line, { x: M, y: 5.35, w: W, h: 0, line: { color: "E5E7EB", width: 1 } });
  const who = (x, w, name, role, nameSize) => {
    s.addText(name, { x, y: 5.55, w, h: 0.4, fontSize: nameSize || 15, bold: true, color: "111827", isTextBox: true, margin: 0 });
    s.addText(role, { x, y: 5.95, w, h: 0.8, fontSize: 11.5, color: "6B7280", valign: "top", isTextBox: true, margin: 0 });
  };
  who(M, 2.6, "Nitin Sharma", "Research Assistant\nUKT Tübingen", 17);
  who(M + 2.9, 3.4, "Prof. Dr. Thomas Wolfers", "Carl Zeiss Professor for AI in Neural Systems Imaging, FSU Jena");
  who(M + 6.6, 3.4, "Dr. Çağatay Yıldız", "Cluster of Excellence ML for Science, University of Tübingen");
  s.addText("MHM Lab", { x: 10.6, y: 5.55, w: 2.0, h: 0.4, fontSize: 15, bold: true, color: "111827", align: "right", isTextBox: true, margin: 0 });
  s.addText("Mental Health Mapping", { x: 10.0, y: 5.95, w: 2.6, h: 0.4, fontSize: 11.5, color: "6B7280", align: "right", isTextBox: true, margin: 0 });
  note(s, "One question for today: when an AI needs to know something new, do we retrain it, or can we teach it? And a second one I spent this year on: does it matter which language it learns in? Very high level, almost no numbers, and I'll leave you with a question at the end.");
}

// ---------- 1b goal
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Part 1: It already knows more than it says" });
  head(s, "The goal", "Keep an AI useful after it's built.", "Without rebuilding it.");
  const col = (x, accent, eyebrow, title, qs) => {
    card(s, x, 2.4, 5.75, 3.95, accent);
    s.addText(eyebrow.toUpperCase(), { x: x + 0.3, y: 2.55, w: 5.2, h: 0.3, fontSize: 11, bold: true, charSpacing: 2, color: "C2410C", isTextBox: true, margin: 0 });
    s.addText(title, { x: x + 0.3, y: 2.9, w: 5.2, h: 0.8, fontSize: 19, bold: true, color: "111827", valign: "top", isTextBox: true, margin: 0 });
    s.addText(qs.map((q, i) => ({ text: q, options: { breakLine: i < qs.length - 1, paraSpaceAfter: 6 } })), { x: x + 0.3, y: 3.75, w: 5.2, h: 2.5, fontSize: 14, color: "374151", valign: "top", isTextBox: true, margin: 0 });
  };
  col(M, false, "Way 1 · it already knows it", "The knowledge is in there, it just doesn't come out", ["1   Does the model know more than it says?", "2   Can we get it out without training?", "3   Where should we nudge?"]);
  col(M + 6.15, true, "Way 2 · it never read it", "Yesterday's news: now it has to learn", ["4   How do we teach it, cheaply?", "5   Taught in English, does it know it in German?", "6   What decides how much it learns?", "7   What does it cost?", "8   Can we keep the facts without the cost?", "9   Why does that work?"]);
  take(s, "Nine small questions.", "One answer at the end.");
  note(s, "The map. Goal: keep an AI useful after it's built, without rebuilding it. Way one: the model already has the knowledge, it just doesn't come out, three questions. Way two: it never read it, yesterday's news, so it has to learn, six questions, and this is where language comes in.");
}

// ---------- 2 insight
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Part 1: It already knows more than it says" });
  head(s, "Way 1 · Question 1", "Does the model know more than it says?", "");
  const yB = 5.6, x0 = M + 0.2, bw = 0.9, gap = 0.3;
  const vals = [["+1", 0.2, "FDBA74", "6B7280", "once"], ["+2", 0.45, "FB923C", "6B7280", "a few"], ["+5", 1.1, "F97316", "C2410C", "dozens"], ["+8", 1.8, "EA580C", "C2410C", "~100"], ["+12", 2.7, "C2410C", "C2410C", "200+"]];
  vals.forEach((v, i) => { const x = x0 + i * (bw + gap); bar(s, x, yB, bw, v[1], v[2], v[0], v[3]); s.addText(v[4], { x: x - 0.1, y: yB + 0.08, w: bw + 0.2, h: 0.3, fontSize: 13, color: "6B7280", align: "center", isTextBox: true, margin: 0 }); });
  axis(s, x0 - 0.1, yB, 5 * (bw + gap));
  s.addText("how often the model has seen a fact → how well it answers", { x: x0 - 0.1, y: yB + 0.42, w: 6, h: 0.3, fontSize: 12, color: "6B7280", isTextBox: true, margin: 0 });
  card(s, 7.3, 2.5, 5.3, 1.3);
  s.addText("Even a fact seen once leaves a trace", { x: 7.55, y: 2.6, w: 4.9, h: 0.5, fontSize: 18, bold: true, color: "111827", isTextBox: true, margin: 0 });
  s.addText("the information is in there, weakly", { x: 7.55, y: 3.1, w: 4.9, h: 0.5, fontSize: 15, color: "374151", isTextBox: true, margin: 0 });
  card(s, 7.3, 4.1, 5.3, 1.5);
  s.addText("But it gets drowned out on the way to the output", { x: 7.55, y: 4.2, w: 4.9, h: 0.6, fontSize: 18, bold: true, color: "111827", isTextBox: true, margin: 0 });
  s.addText("higher layers mix it with everything else: vague, not wrong", { x: 7.55, y: 4.85, w: 4.9, h: 0.6, fontSize: 15, color: "374151", isTextBox: true, margin: 0 });
  take(s, "Yes.", "Even a fact seen once leaves a trace; it just gets drowned out on the way to the output.");
  note(s, "How well a model answers a fact depends on how often it has seen it. The curve rises steeply with repetition, but even a fact seen once leaves a small, real trace. For rare facts the information is in there, weakly, and it gets drowned out by higher-level computation on the way to the output. If the knowledge is already there, we don't need training. We need to help it out. (Bar heights sketch the log-linear trend; exact numbers in the papers.)");
}

// ---------- 3 steering method
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Part 1: It already knows more than it says" });
  head(s, "Way 1 · Question 2", "Can we get it out without training?", "");
  // cluster panel
  card(s, M, 2.35, 5.2, 3.6);
  const dotsA = [[0.7,0.9],[1.2,0.6],[0.95,1.5],[1.6,1.2],[0.6,2.1],[1.3,2.0],[1.8,1.7],[1.0,2.6]];
  const dotsB = [[3.3,1.2],[3.8,0.8],[4.2,1.5],[3.5,1.9],[4.0,2.3],[3.1,2.7],[3.7,3.0],[4.3,2.0]];
  dotsA.forEach(([dx,dy]) => s.addShape(pres.ShapeType.ellipse, { x: M + dx, y: 2.35 + dy, w: 0.22, h: 0.22, fill: { color: "C2410C" }, line: { color: "C2410C", width: 0 } }));
  dotsB.forEach(([dx,dy]) => s.addShape(pres.ShapeType.ellipse, { x: M + dx, y: 2.35 + dy, w: 0.22, h: 0.22, fill: { color: "2563EB" }, line: { color: "2563EB", width: 0 } }));
  s.addShape(pres.ShapeType.line, { x: M + 1.5, y: 2.35 + 1.6, w: 2.2, h: 0.3, flipH: true, line: { color: "111827", width: 3, endArrowType: "triangle" } });
  s.addText("v", { x: M + 2.4, y: 2.35 + 1.1, w: 0.5, h: 0.4, fontSize: 20, bold: true, color: "111827", isTextBox: true, margin: 0 });
  s.addText("medical", { x: M + 0.3, y: 2.35 + 3.0, w: 2, h: 0.4, fontSize: 14, bold: true, color: "C2410C", isTextBox: true, margin: 0 });
  s.addText("everything else", { x: M + 3.0, y: 2.35 + 0.3, w: 2.0, h: 0.4, fontSize: 14, bold: true, color: "2563EB", align: "right", isTextBox: true, margin: 0 });
  s.addText("inside one layer, each dot a sentence: the domains are separable", { x: M, y: 6.0, w: 5.2, h: 0.4, fontSize: 12, color: "6B7280", align: "center", isTextBox: true, margin: 0 });
  // layer stack
  const lx = 7.0, lw = 3.4, lh = 0.5, ly0 = 2.6;
  for (let i = 0; i < 5; i++) {
    const hot = i === 2;
    s.addShape(pres.ShapeType.roundRect, { x: lx, y: ly0 + i * (lh + 0.12), w: lw, h: lh, rectRadius: 0.06, fill: { color: hot ? "C2410C" : "E5E7EB" }, line: { color: hot ? "C2410C" : "E5E7EB", width: 0 } });
    if (hot) {
      s.addText("MLP, layer 8", { x: lx, y: ly0 + i * (lh + 0.12), w: lw, h: lh, fontSize: 16, bold: true, color: "FFFFFF", align: "center", valign: "middle", isTextBox: true, margin: 0 });
      s.addText("+ v", { x: lx + lw + 0.25, y: ly0 + i * (lh + 0.12) - 0.05, w: 1.2, h: 0.6, fontSize: 28, bold: true, color: "C2410C", isTextBox: true, margin: 0 });
    }
  }
  pill(s, lx, 5.9, 5.3, "one vector addition  ·  versus billions of tokens of training");
  take(s, "Yes: one vector addition.", "Compute the “medical” direction once, add it at inference.");
  note(s, "Look inside one layer, each dot is a sentence, and medical sentences sit in their own cluster. Compute the direction from everything-else to medical, once. At inference, add that vector to the activations at one layer. One addition per forward pass, no training, nothing forgotten.");
}

// ---------- 4 result
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Part 1: It already knows more than it says" });
  head(s, "Way 1 · Question 3", "Where should we nudge?", "");
  const yB = 5.7, x0 = M + 0.3, bw = 1.4, gap = 0.5;
  bar(s, x0, yB, bw, 1.3, "9CA3AF", "+21%", "6B7280");
  bar(s, x0 + (bw + gap), yB, bw, 1.8, "9CA3AF", "+29%", "6B7280");
  bar(s, x0 + 2 * (bw + gap), yB, bw, 2.8, "C2410C", "+45%", "C2410C");
  axis(s, x0 - 0.15, yB, 3 * (bw + gap));
  const labs = [["residual stream", "the usual spot", "374151"], ["attention", "", "374151"], ["MLP", "", "C2410C"]];
  labs.forEach((l, i) => s.addText([{ text: l[0], options: { bold: true, color: l[2] } }, { text: l[1] ? "\n" + l[1] : "", options: { color: "6B7280", bold: false } }], { x: x0 + i * (bw + gap) - 0.2, y: yB + 0.08, w: bw + 0.4, h: 0.7, fontSize: 14, align: "center", valign: "top", isTextBox: true, margin: 0 }));
  card(s, 7.4, 2.6, 5.2, 1.3);
  s.addText("FACTS · MEDICAL, LAW", { x: 7.65, y: 2.7, w: 4.8, h: 0.35, fontSize: 12, bold: true, charSpacing: 2, color: "6B7280", isTextBox: true, margin: 0 });
  s.addText("MLP wins, in 3 of 3 models", { x: 7.65, y: 3.1, w: 4.8, h: 0.6, fontSize: 20, bold: true, color: "111827", isTextBox: true, margin: 0 });
  card(s, 7.4, 4.2, 5.2, 1.3);
  s.addText("BEHAVIOUR · TONE", { x: 7.65, y: 4.3, w: 4.8, h: 0.35, fontSize: 12, bold: true, charSpacing: 2, color: "6B7280", isTextBox: true, margin: 0 });
  s.addText("attention wins, MLP can even hurt", { x: 7.65, y: 4.7, w: 4.8, h: 0.6, fontSize: 20, bold: true, color: "111827", isTextBox: true, margin: 0 });
  take(s, "The MLP layers, where facts live.", "But steering can only surface what the model has already read.");
  note(s, "Where you add the vector matters. Nudging the MLP layers improves factual recall by 45%, more than double the residual stream where everyone usually steers. It flips for behaviour: for tone, attention wins. So facts live in the MLPs. But steering can only surface what the model has already read. It cannot tell the model who won an election last year. For that, part two.");
}

// ---------- 5 problem
pres.addSection({ title: "Part 2: It needs knowledge it never had" });
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Part 2: It needs knowledge it never had" });
  head(s, "Way 2 · Question 4", "How do we teach it something it never read?", "");
  card(s, M, 2.5, 4.6, 1.55);
  s.addText("RETRAIN FROM SCRATCH", { x: M + 0.25, y: 2.6, w: 4.2, h: 0.3, fontSize: 11, bold: true, charSpacing: 2, color: "6B7280", isTextBox: true, margin: 0 });
  big(s, M + 0.25, 2.9, 4.2, "trillions", "111827", 40);
  s.addText("of tokens, millions of dollars, every few months", { x: M + 0.25, y: 3.6, w: 4.2, h: 0.4, fontSize: 13, color: "374151", isTextBox: true, margin: 0 });
  card(s, M, 4.3, 4.6, 1.55, true);
  s.addText("CONTINUED PRETRAINING", { x: M + 0.25, y: 4.4, w: 4.2, h: 0.3, fontSize: 11, bold: true, charSpacing: 2, color: "C2410C", isTextBox: true, margin: 0 });
  big(s, M + 0.25, 4.7, 4.2, "~6 billion", "C2410C", 40);
  s.addText("tokens of fresh news, same recipe, a few days", { x: M + 0.25, y: 5.4, w: 4.2, h: 0.4, fontSize: 13, color: "374151", isTextBox: true, margin: 0 });
  // bars
  const yB = 5.3, x0 = 6.4, bw = 0.7, g = 0.1, G = 0.6;
  const pairs = [["+8", 2.3, "+2", 0.55], ["+5", 1.4, "+1", 0.3], ["+4.5", 1.3, "0", 0.03]];
  pairs.forEach((p, i) => { const x = x0 + i * (2 * bw + g + G); bar(s, x, yB, bw, p[1], "C2410C", p[0], "C2410C"); bar(s, x + bw + g, yB, bw, p[3], "9CA3AF", p[2], "6B7280"); });
  axis(s, x0 - 0.15, yB, 3 * (2 * bw + g + G));
  s.addShape(pres.ShapeType.rect, { x: 7.3, y: 5.55, w: 0.22, h: 0.22, fill: { color: "C2410C" }, line: { color: "C2410C", width: 0 } });
  s.addText("news", { x: 7.6, y: 5.5, w: 1.2, h: 0.32, fontSize: 13, bold: true, color: "374151", isTextBox: true, margin: 0 });
  s.addShape(pres.ShapeType.rect, { x: 8.9, y: 5.55, w: 0.22, h: 0.22, fill: { color: "9CA3AF" }, line: { color: "9CA3AF", width: 0 } });
  s.addText("random web text", { x: 9.2, y: 5.5, w: 2.4, h: 0.32, fontSize: 13, bold: true, color: "374151", isTextBox: true, margin: 0 });
  s.addText("new facts learned, three quizzes, eight models", { x: 6.3, y: 5.9, w: 6, h: 0.3, fontSize: 12, color: "6B7280", isTextBox: true, margin: 0 });
  take(s, "Let it read the news.", "6 billion tokens instead of a new model, and news teaches 2–4× more than web text.");
  note(s, "Sometimes the knowledge genuinely isn't in there: everything after the cutoff. Retraining from scratch is trillions of tokens and millions of dollars. The alternative is continued pretraining on about six billion tokens of fresh news. In NewsCPT, news beat random web text by two to four times on every model and quiz. So it works. What happens inside when we do this?");
}

// ---------- 6 question
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Part 2: It needs knowledge it never had" });
  head(s, "Way 2 · Question 5", "Taught in English, does it know it in German?", "");
  const y0 = 2.9, h = 0.6, gap = 0.2;
  s.addText("reads news in", { x: M + 0.3, y: 2.45, w: 2.2, h: 0.35, fontSize: 14, bold: true, color: "6B7280", align: "center", isTextBox: true, margin: 0 });
  lang(s, M + 0.3, y0, 2.2, h, "EN", "2563EB"); lang(s, M + 0.3, y0 + h + gap, 2.2, h, "DE", "D97706"); lang(s, M + 0.3, y0 + 2 * (h + gap), 2.2, h, "FR", "7C3AED");
  arrow(s, 3.6, 3.75, 1.3, 0.55);
  s.addText("plain LLM", { x: 5.2, y: 3.45, w: 2.9, h: 0.5, fontSize: 24, bold: true, color: "111827", align: "center", isTextBox: true, margin: 0 });
  s.addText("no reasoning", { x: 5.2, y: 3.95, w: 2.9, h: 0.4, fontSize: 14, color: "6B7280", align: "center", isTextBox: true, margin: 0 });
  arrow(s, 8.4, 3.75, 1.3, 0.55);
  s.addText("same fact asked in", { x: 10.0, y: 2.45, w: 2.3, h: 0.35, fontSize: 14, bold: true, color: "6B7280", align: "center", isTextBox: true, margin: 0 });
  lang(s, 10.0, y0, 2.3, h, "EN", "2563EB", true); lang(s, 10.0, y0 + h + gap, 2.3, h, "DE", "D97706", true); lang(s, 10.0, y0 + 2 * (h + gap), 2.3, h, "FR", "7C3AED", true);
  take(s, "Plain model, no reasoning, same facts in three languages.", "What's your guess?");
  note(s, "Plain model, no chain-of-thought. It reads the news in English only. I ask about the same event in German or French. Does it keep the answer? We updated models on English, German or French news, then asked the exact same facts, about fifteen thousand, translated, in all three languages. Who thinks it transfers?");
}

// ---------- 7 answer
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Part 2: It needs knowledge it never had" });
  head(s, "Way 2 · Question 5 · the answer", "Knowledge mostly doesn't speak a language.", "~70% carries over.");
  s.addText("~70%", { x: M, y: 2.3, w: W, h: 2.0, fontSize: 120, bold: true, fontFace: "Cambria", color: "C2410C", align: "center", isTextBox: true, margin: 0 });
  s.addShape(pres.ShapeType.roundRect, { x: 1.7, y: 4.6, w: 9.9, h: 0.55, rectRadius: 0.1, fill: { color: "F3F4F6" }, line: { color: "E5E7EB", width: 1 } });
  s.addShape(pres.ShapeType.roundRect, { x: 1.7, y: 4.6, w: 6.93, h: 0.55, rectRadius: 0.1, fill: { color: "C2410C" }, line: { color: "C2410C", width: 0 } });
  s.addText("learned in English", { x: 1.7, y: 5.25, w: 4, h: 0.35, fontSize: 14, bold: true, color: "6B7280", isTextBox: true, margin: 0 });
  s.addText("100% = as good as asking in English", { x: 7.6, y: 5.25, w: 4, h: 0.35, fontSize: 14, bold: true, color: "6B7280", align: "right", isTextBox: true, margin: 0 });
  take(s, "Learn it once, use it in the other two.", "Asking in the language it read is still a bit better.");
  note(s, "Yes, mostly. About 70% of the accuracy gain survives when you ask in another language, between 57 and 88% depending on direction. French to English travels better than English to French.");
}

// ---------- 8 driver
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Part 2: It needs knowledge it never had" });
  head(s, "Way 2 · Question 6", "What decides how much it learns?", "");
  const yB = 5.5, bw = 1.0, g = 0.2;
  bar(s, 1.6, yB, bw, 0.4, "C2410C", "+2", "C2410C"); bar(s, 1.6 + bw + g, yB, bw, 0.38, "FDBA74", "+2", "6B7280");
  axis(s, 1.45, yB, 2.5);
  s.addText("mentioned a few times", { x: 1.2, y: yB + 0.1, w: 3.0, h: 0.4, fontSize: 15, bold: true, color: "111827", align: "center", isTextBox: true, margin: 0 });
  bar(s, 5.2, yB, bw, 2.5, "C2410C", "+12", "C2410C"); bar(s, 5.2 + bw + g, yB, bw, 1.9, "FDBA74", "+9", "6B7280");
  axis(s, 5.05, yB, 2.5);
  s.addText("mentioned 200+ times", { x: 4.8, y: yB + 0.1, w: 3.0, h: 0.4, fontSize: 15, bold: true, color: "111827", align: "center", isTextBox: true, margin: 0 });
  s.addShape(pres.ShapeType.rect, { x: 8.8, y: 3.6, w: 0.3, h: 0.3, fill: { color: "C2410C" }, line: { color: "C2410C", width: 0 } });
  s.addText("asked in the training language", { x: 9.25, y: 3.55, w: 3.5, h: 0.4, fontSize: 14, bold: true, color: "374151", isTextBox: true, margin: 0 });
  s.addShape(pres.ShapeType.rect, { x: 8.8, y: 4.2, w: 0.3, h: 0.3, fill: { color: "FDBA74" }, line: { color: "FDBA74", width: 0 } });
  s.addText("asked in the other two", { x: 9.25, y: 4.15, w: 3.5, h: 0.4, fontSize: 14, bold: true, color: "374151", isTextBox: true, margin: 0 });
  take(s, "Repetition, the same curve as in Way 1.", "What the news repeats, the model learns, in every language.");
  note(s, "Facts mentioned a few times gain about two points; facts mentioned 200 or more times gain 10 to 14 points in the training language and 8 to 11 in the others. Each model learns its own newspaper's events best: what it read matters about twice as much as which language you ask in.");
}

// ---------- 9 cost
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Part 2: It needs knowledge it never had" });
  head(s, "Way 2 · Question 7", "What does it cost?", "");
  card(s, M, 2.5, 5.7, 3.4);
  s.addText("FACTS FROM BEFORE 2023", { x: M, y: 2.75, w: 5.7, h: 0.35, fontSize: 12, bold: true, charSpacing: 2, color: "6B7280", align: "center", isTextBox: true, margin: 0 });
  s.addText("+0.3", { x: M, y: 3.2, w: 5.7, h: 1.6, fontSize: 84, bold: true, fontFace: "Cambria", color: "111827", align: "center", isTextBox: true, margin: 0 });
  s.addText("nothing forgotten", { x: M, y: 5.0, w: 5.7, h: 0.4, fontSize: 16, color: "374151", align: "center", isTextBox: true, margin: 0 });
  card(s, 6.95, 2.5, 5.7, 3.4, true);
  s.addText("GENERAL SKILLS · 20 TESTS", { x: 6.95, y: 2.75, w: 5.7, h: 0.35, fontSize: 12, bold: true, charSpacing: 2, color: "C2410C", align: "center", isTextBox: true, margin: 0 });
  s.addText("−1.2", { x: 6.95, y: 3.2, w: 5.7, h: 1.6, fontSize: 84, bold: true, fontFace: "Cambria", color: "C2410C", align: "center", isTextBox: true, margin: 0 });
  s.addText("after French-only news", { x: 6.95, y: 4.95, w: 5.7, h: 0.4, fontSize: 16, color: "374151", align: "center", isTextBox: true, margin: 0 });
  s.addText([{ text: "+0.3", options: { bold: true } }, { text: " if you only test in French", options: {} }], { x: 6.95, y: 5.3, w: 5.7, h: 0.4, fontSize: 16, color: "374151", align: "center", isTextBox: true, margin: 0 });
  take(s, "Old facts stay, general skills slip.", "And you only see it if you test beyond the training language.");
  note(s, "Old facts from before 2023: kept, slightly up. General skills on twenty tests in three languages: they slip. French-only loses 1.2, German 1.3, English 0.5. Test the French model only in French and it looks fine. Catastrophic forgetting in a new disguise, and the multilingual lens makes it visible.");
}

// ---------- 10 mix
pres.addSection({ title: "Train separately, average, and why it works" });
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Train separately, average, and why it works" });
  head(s, "Way 2 · Question 8", "Can we keep the facts without the cost?", "");
  const bw = 0.8, g = 0.25;
  s.addText("new facts learned", { x: M + 0.2, y: 2.35, w: 4.4, h: 0.35, fontSize: 14, bold: true, color: "6B7280", align: "center", isTextBox: true, margin: 0 });
  const yB1 = 5.3; const f = [["+3.4", 1.5, "2563EB", "EN", "111827"], ["+2.6", 1.15, "D97706", "DE", "111827"], ["+3.3", 1.45, "7C3AED", "FR", "111827"], ["+5.0", 2.2, "C2410C", "Mix", "C2410C"]];
  f.forEach((v, i) => { const x = M + 0.3 + i * (bw + g); bar(s, x, yB1, bw, v[1], v[2], v[0], v[4]); s.addText(v[3], { x: x - 0.1, y: yB1 + 0.08, w: bw + 0.2, h: 0.35, fontSize: 14, bold: true, color: "111827", align: "center", isTextBox: true, margin: 0 }); });
  axis(s, M + 0.15, yB1, 4 * (bw + g));
  s.addText("skills lost", { x: 7.2, y: 2.35, w: 4.4, h: 0.35, fontSize: 14, bold: true, color: "6B7280", align: "center", isTextBox: true, margin: 0 });
  const yT = 2.9; const l = [["−0.5", 0.7, "2563EB", "EN", "111827"], ["−1.3", 1.8, "D97706", "DE", "C2410C"], ["−1.2", 1.65, "7C3AED", "FR", "C2410C"], ["−0.3", 0.42, "C2410C", "Mix", "111827"]];
  axis(s, 7.15, yT, 4 * (bw + g));
  l.forEach((v, i) => { const x = 7.3 + i * (bw + g); s.addShape(pres.ShapeType.rect, { x, y: yT, w: bw, h: v[1], fill: { color: v[2] }, line: { color: v[2], width: 0 } }); s.addText(v[0], { x: x - 0.2, y: yT + v[1] + 0.05, w: bw + 0.4, h: 0.35, fontSize: 16, bold: true, color: v[4], align: "center", isTextBox: true, margin: 0 }); s.addText(v[3], { x: x - 0.1, y: yT + v[1] + 0.4, w: bw + 0.2, h: 0.35, fontSize: 14, bold: true, color: "111827", align: "center", isTextBox: true, margin: 0 }); });
  take(s, "Mixing helps: more facts, less damage.", "But can we do better without training at all?");
  note(s, "The obvious fix: mix all three newspapers. A balanced mix learns more facts than any single language, plus 5 points, and loses only 0.3. But can we do better, without training anything new?");
}

// ---------- 11 merge
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Train separately, average, and why it works" });
  head(s, "Way 2 · Question 8 · the trick", "Three models, one average.", "No training.");
  const cy = 3.0, d = 1.1;
  const circ = (x, color, label, fs) => { s.addShape(pres.ShapeType.ellipse, { x, y: cy, w: d, h: d, fill: { color }, line: { color, width: 0 } }); s.addText(label, { x, y: cy, w: d, h: d, fontSize: fs || 26, bold: true, color: "FFFFFF", align: "center", valign: "middle", isTextBox: true, margin: 0 }); };
  circ(1.4, "2563EB", "EN"); s.addText("+", { x: 2.6, y: cy, w: 0.5, h: d, fontSize: 36, bold: true, color: "9CA3AF", align: "center", valign: "middle", isTextBox: true, margin: 0 });
  circ(3.2, "D97706", "DE"); s.addText("+", { x: 4.4, y: cy, w: 0.5, h: d, fontSize: 36, bold: true, color: "9CA3AF", align: "center", valign: "middle", isTextBox: true, margin: 0 });
  circ(5.0, "7C3AED", "FR"); s.addText("÷ 3  =", { x: 6.2, y: cy, w: 1.6, h: d, fontSize: 36, bold: true, color: "9CA3AF", align: "center", valign: "middle", isTextBox: true, margin: 0 });
  s.addShape(pres.ShapeType.ellipse, { x: 8.0, y: cy - 0.2, w: 1.5, h: 1.5, fill: { color: "C2410C" }, line: { color: "C2410C", width: 0 } });
  s.addText("★", { x: 8.0, y: cy - 0.2, w: 1.5, h: 1.5, fontSize: 48, color: "FFFFFF", align: "center", valign: "middle", isTextBox: true, margin: 0 });
  s.addText("+5.1", { x: 1.4, y: 4.6, w: 2.6, h: 1.0, fontSize: 60, bold: true, fontFace: "Cambria", color: "C2410C", align: "center", isTextBox: true, margin: 0 });
  s.addText("new facts", { x: 1.4, y: 5.6, w: 2.6, h: 0.4, fontSize: 15, color: "6B7280", align: "center", isTextBox: true, margin: 0 });
  s.addText("+0.2", { x: 4.4, y: 4.6, w: 2.6, h: 1.0, fontSize: 60, bold: true, fontFace: "Cambria", color: "111827", align: "center", isTextBox: true, margin: 0 });
  s.addText("skills, nothing lost", { x: 4.4, y: 5.6, w: 2.6, h: 0.4, fontSize: 15, color: "6B7280", align: "center", isTextBox: true, margin: 0 });
  pill(s, 7.6, 4.95, 4.6, "zero training  ·  just average the weights");
  take(s, "All the facts, none of the damage.", "Train separately, merge afterwards.");
  note(s, "Take the three single-language models and average their weights: add the numbers, divide by three. No training. Model soups, Wortsman et al. 2022. As many new facts as the mixture, plus 5.1, and zero skill loss. It beats every single-language model on both axes. Language-specific updates can be trained separately and merged.");
}

// ---------- 12 why
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Train separately, average, and why it works" });
  head(s, "Way 2 · Question 9 · work in progress", "Why does averaging work?", "");
  const bx = 1.6, by = 5.4;
  const arr = (x2, y2, color, w) => s.addShape(pres.ShapeType.line, { x: Math.min(bx, x2), y: Math.min(by, y2), w: Math.abs(x2 - bx), h: Math.abs(y2 - by), flipV: true, line: { color, width: w, endArrowType: "triangle" } });
  arr(5.6, 4.6, "2563EB", 4); arr(2.9, 2.4, "D97706", 4); arr(4.9, 2.5, "7C3AED", 4); arr(4.0, 4.0, "C2410C", 7);
  s.addShape(pres.ShapeType.ellipse, { x: bx - 0.15, y: by - 0.15, w: 0.3, h: 0.3, fill: { color: "FFFFFF" }, line: { color: "111827", width: 3 } });
  s.addText("base model", { x: bx - 0.9, y: by + 0.2, w: 1.8, h: 0.35, fontSize: 14, bold: true, color: "111827", align: "center", isTextBox: true, margin: 0 });
  s.addText("EN", { x: 5.7, y: 4.4, w: 0.6, h: 0.35, fontSize: 16, bold: true, color: "2563EB", isTextBox: true, margin: 0 });
  s.addText("DE", { x: 2.6, y: 2.05, w: 0.6, h: 0.35, fontSize: 16, bold: true, color: "D97706", isTextBox: true, margin: 0 });
  s.addText("FR", { x: 4.95, y: 2.15, w: 0.6, h: 0.35, fontSize: 16, bold: true, color: "7C3AED", isTextBox: true, margin: 0 });
  s.addText("average ★", { x: 4.1, y: 3.75, w: 1.6, h: 0.35, fontSize: 16, bold: true, color: "C2410C", isTextBox: true, margin: 0 });
  const stat = (y, n, nc, txt) => { s.addText(n, { x: 7.0, y, w: 1.9, h: 0.8, fontSize: 40, bold: true, fontFace: "Cambria", color: nc, isTextBox: true, margin: 0 }); s.addText(txt, { x: 9.0, y: y + 0.05, w: 3.7, h: 0.8, fontSize: 14, color: "374151", valign: "middle", isTextBox: true, margin: 0 }); };
  stat(2.5, "≈0.15", "111827", "similarity of the three updates: nearly unrelated directions");
  stat(3.65, "≈65%", "C2410C", "of one update's length: language-specific parts cancel, the shared part stays");
  stat(4.8, "MLPs", "111827", "carry 92–100% of the new facts, the same place steering found in part 1");
  take(s, "New knowledge is a direction; averaging keeps the shared part.", "Running now: shorter step, or better direction?");
  note(s, "Preliminary. Each language update moves the model in a different direction; similarity only about 0.15. Averaging cancels most of each language-specific part and keeps what all three share: about 65% as far from base as a single update. Keep only the MLP changes and 92 to 100% of the new facts survive, the same place steering found. Running now: is averaging a shorter, safer step or a better direction? And can we walk further along it?");
}

// ---------- 13 part 2 summary figure
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Train separately, average, and why it works" });
  head(s, "Way 2 · in one picture", "Every update learns.", "Only the average learns without losing.");
  s.addImage({ path: __dirname + "/summary_part2.png", x: 2.55, y: 2.15, w: 8.2, h: 5.08 * 0.86 });
  take(s, "Right = more new facts. Up = nothing forgotten.", "Top right is where we want to be.");
  note(s, "Part two in one picture. Right means more new facts learned; up means general skills kept. Each single-language update learns but forgets. The mixture learns the most and forgets less. The average of the three single-language models, no extra training, sits top right: as many facts as the mixture and nothing lost.");
}

// ---------- 14 closing
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Train separately, average, and why it works" });
  head(s, "The answers", "Retrain or teach?", "Teach.");
  const col = (x, eyebrow, big, body) => {
    card(s, x, 2.35, 3.8, 2.9);
    s.addText(eyebrow.toUpperCase(), { x: x + 0.25, y: 2.5, w: 3.3, h: 0.3, fontSize: 10.5, bold: true, charSpacing: 2, color: "6B7280", isTextBox: true, margin: 0 });
    s.addText(big, { x: x + 0.25, y: 2.85, w: 3.3, h: 1.1, fontSize: 24, bold: true, fontFace: "Cambria", color: "C2410C", valign: "top", isTextBox: true, margin: 0 });
    s.addText(body, { x: x + 0.25, y: 3.95, w: 3.3, h: 1.2, fontSize: 13.5, color: "374151", valign: "top", isTextBox: true, margin: 0 });
  };
  col(M, "Way 1 · it already knows it", "Steer it.", "One vector at the MLP layers. No training, nothing forgotten.");
  col(M + 4.07, "Way 2 · it never read it", "Let it read, then average.", "Train per language, merge the weights. The facts without the price.");
  col(M + 8.13, "Does the language matter?", "Less than you'd think.", "Facts cross languages. Costs hide in the others. Test in all of them.");
  s.addText([{ text: "If new knowledge is a direction we can add, average and steer: ", options: { bold: true } }, { text: "do we ever need to retrain from scratch?", options: { italic: true, color: "6B7280" } }], { x: M, y: 5.4, w: W, h: 0.5, fontSize: 17, color: "111827", align: "center", isTextBox: true, margin: 0 });
  s.addShape(pres.ShapeType.line, { x: M, y: 6.1, w: W, h: 0, line: { color: "E5E7EB", width: 1 } });
  s.addText([{ text: "Thank you ", options: { bold: true, color: "111827" } }, { text: "for your attention.", options: { italic: true, color: "6B7280" } }], { x: M, y: 6.25, w: 6, h: 0.5, fontSize: 18, isTextBox: true, margin: 0 });
  s.addText("Nitin Sharma · MHM Lab\nnitinsharma3150@gmail.com", { x: 7.0, y: 6.2, w: 5.63, h: 0.6, fontSize: 11.5, color: "6B7280", align: "right", isTextBox: true, margin: 0 });
  note(s, "The answers. Retrain or teach? Teach. If it already knows it, steer it. If it never read it, let it read, then average. Does the language matter? Less than you'd think. And the question I'm chasing: if new knowledge is a direction we can add, average and steer, do we ever need to retrain from scratch? Thank you.");
}

(async () => {
  const out = process.argv[2];
  await pres.writeFile({ fileName: out });
  await applyTheme(out, THEME);
  // simple fade transition on every slide
  const JSZip = require("jszip"); const fs = require("fs");
  const zip = await JSZip.loadAsync(fs.readFileSync(out));
  for (const name of Object.keys(zip.files)) {
    if (/^ppt\/slides\/slide\d+\.xml$/.test(name)) {
      let xml = await zip.file(name).async("string");
      if (!xml.includes("<p:transition")) {
        const tr = '<p:transition spd="med"><p:fade/></p:transition>';
        if (xml.includes("</p:clrMapOvr>")) xml = xml.replace("</p:clrMapOvr>", "</p:clrMapOvr>" + tr);
        else xml = xml.replace("</p:cSld>", "</p:cSld>" + tr);
        zip.file(name, xml);
      }
    }
  }
  fs.writeFileSync(out, await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
  console.log("wrote", out);
})();
