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

const React = require("react"); const RDS = require("react-dom/server"); const sharp = require("sharp");
const { FiBookOpen } = require("react-icons/fi"); const { HiOutlineLightBulb, HiOutlineLockClosed } = require("react-icons/hi");
async function icon(Comp, color) {
  const svg = RDS.renderToStaticMarkup(React.createElement(Comp, { color, size: 256, strokeWidth: 1.5 }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}
const ICON = {};
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

async function main() {
  ICON.bulb = await icon(HiOutlineLightBulb, "#111827"); ICON.book = await icon(FiBookOpen, "#C2410C"); ICON.lock = await icon(HiOutlineLockClosed, "#111827");
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

// ---------- 1a hook
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Part 1: It already knows more than it says" });
  head(s, "The hook", "Your AI finished school in 2023.", "It hasn't read anything since.");
  s.addImage({ data: ICON.lock, x: 6.1, y: 2.35, w: 1.1, h: 1.1 });
  s.addText("Dec 2023", { x: 5.2, y: 3.5, w: 2.9, h: 0.45, fontSize: 24, bold: true, color: "111827", align: "center", isTextBox: true, margin: 0 });
  s.addShape(pres.ShapeType.roundRect, { x: M, y: 4.1, w: 5.8, h: 0.32, rectRadius: 0.16, fill: { color: "111827" }, line: { color: "111827", width: 0 } });
  for (let i = 0; i < 9; i++) s.addShape(pres.ShapeType.rect, { x: 6.75 + i * 0.66, y: 4.1, w: 0.42, h: 0.32, fill: { color: "C2410C" }, line: { color: "C2410C", width: 0 } });
  s.addText("Read everything up to here", { x: M, y: 4.6, w: 5.8, h: 0.5, fontSize: 24, bold: true, color: "111827", isTextBox: true, margin: 0 });
  s.addText("Never saw this", { x: 6.75, y: 4.6, w: 5.9, h: 0.5, fontSize: 24, bold: true, color: "C2410C", isTextBox: true, margin: 0 });
  s.addText("elections · new drugs · yesterday's news", { x: 6.75, y: 5.1, w: 5.9, h: 0.4, fontSize: 18, color: "6B7280", isTextBox: true, margin: 0 });
  take(s, "Ask it about anything after that and it guesses.", "So how do we keep it useful?");
  note(s, "A language model is trained once on a giant snapshot of text, then frozen. The models we use stopped reading around the end of 2023. Everything after that it never saw. Ask it and it guesses, confidently. So: how do we keep it useful?");
}

// ---------- 1a2 usual fix
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Part 1: It already knows more than it says" });
  head(s, "The usual fix", "Send it back to school.", "Expensive, and it forgets.");
  card(s, M, 2.4, 5.75, 3.6);
  s.addText("TO TEACH IT MEDICINE", { x: M, y: 2.65, w: 5.75, h: 0.3, fontSize: 11, bold: true, charSpacing: 2, color: "6B7280", align: "center", isTextBox: true, margin: 0 });
  s.addText("~48B", { x: M, y: 3.05, w: 5.75, h: 1.4, fontSize: 72, bold: true, fontFace: "Cambria", color: "111827", align: "center", isTextBox: true, margin: 0 });
  s.addText("words of training, weeks on 8 GPUs, thousands of dollars per run", { x: M + 0.4, y: 4.6, w: 4.95, h: 0.8, fontSize: 15, color: "374151", align: "center", isTextBox: true, margin: 0 });
  card(s, M + 6.15, 2.4, 5.75, 3.6, true);
  s.addText("AND AFTERWARDS", { x: M + 6.15, y: 2.65, w: 5.75, h: 0.3, fontSize: 11, bold: true, charSpacing: 2, color: "C2410C", align: "center", isTextBox: true, margin: 0 });
  s.addText("“Anna passed the file to Ben. Ben passed it to Clara. Who has it?”", { x: M + 6.5, y: 3.05, w: 5.05, h: 0.9, fontSize: 16, italic: true, color: "374151", align: "center", isTextBox: true, margin: 0 });
  const ans = (x, label, val, c) => { s.addShape(pres.ShapeType.roundRect, { x, y: 4.15, w: 2.2, h: 1.3, rectRadius: 0.12, fill: { color: "FFFFFF" }, line: { color: c === "C2410C" ? "FDBA74" : "E5E7EB", width: 1.5 } }); s.addText(label, { x, y: 4.25, w: 2.2, h: 0.35, fontSize: 12, color: c === "C2410C" ? "C2410C" : "6B7280", align: "center", isTextBox: true, margin: 0 }); s.addText(val, { x, y: 4.6, w: 2.2, h: 0.7, fontSize: 24, bold: true, color: c, align: "center", valign: "middle", isTextBox: true, margin: 0 }); };
  ans(M + 6.8, "before", "Clara ✓", "111827"); ans(M + 9.3, "after", "Anna ✗", "C2410C");
  take(s, "Two costs every time: money, and what it used to know.", "Can we teach instead?");
  note(s, "The usual fix: train it some more. Two problems. Expensive: about 48 billion words, weeks on 8 GPUs. And it forgets: after medical training the model gets worse at simple things it could do before. Catastrophic forgetting. Can we teach instead of retrain?");
}

// ---------- 1b goal
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Part 1: It already knows more than it says" });
  head(s, "The plan", "Two ways to teach", "instead of retrain.");
  const col = (x, accent, eyebrow, title, count, icon) => {
    card(s, x, 2.4, 5.75, 3.95, accent);
    s.addText(eyebrow, { x, y: 2.75, w: 5.75, h: 0.3, fontSize: 12, bold: true, charSpacing: 3, color: "C2410C", align: "center", isTextBox: true, margin: 0 });
    s.addImage({ data: icon, x: x + 2.875 - 0.6, y: 3.2, w: 1.2, h: 1.2 });
    s.addText(title, { x, y: 4.6, w: 5.75, h: 0.6, fontSize: 26, bold: true, color: "111827", align: "center", isTextBox: true, margin: 0 });
    s.addText(count, { x, y: 5.25, w: 5.75, h: 0.4, fontSize: 16, color: "6B7280", align: "center", isTextBox: true, margin: 0 });
  };
  col(M, false, "WAY 1", "It already knows it", "it just doesn't say it", ICON.bulb);
  col(M + 6.15, true, "WAY 2", "It never read it", "and has to learn, in some language", ICON.book);
  take(s, "Way 1 needs no training at all.", "Way 2 is where the language question comes in.");
  note(s, "The map. Goal: keep an AI useful after it's built, without rebuilding it. Way one: the model already has the knowledge, it just doesn't come out, three questions. Way two: it never read it, yesterday's news, so it has to learn, six questions, and this is where language comes in.");
}

// ---------- 2 insight
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Part 1: It already knows more than it says" });
  head(s, "Way 1 · the hunch", "Ever had a word on the tip of your tongue?", "So does the model.");
  const yB = 5.6, x0 = M + 0.2, bw = 0.9, gap = 0.3;
  const vals = [["+1", 0.2, "FDBA74", "6B7280", "once"], ["+2", 0.45, "FB923C", "6B7280", "a few"], ["+5", 1.1, "F97316", "C2410C", "dozens"], ["+8", 1.8, "EA580C", "C2410C", "~100"], ["+12", 2.7, "C2410C", "C2410C", "200+"]];
  vals.forEach((v, i) => { const x = x0 + i * (bw + gap); bar(s, x, yB, bw, v[1], v[2], v[0], v[3]); s.addText(v[4], { x: x - 0.1, y: yB + 0.08, w: bw + 0.2, h: 0.3, fontSize: 13, color: "6B7280", align: "center", isTextBox: true, margin: 0 }); });
  axis(s, x0 - 0.1, yB, 5 * (bw + gap));
  s.addText("how often the model has seen a fact → how well it answers", { x: x0 - 0.1, y: yB + 0.42, w: 6, h: 0.3, fontSize: 12, color: "6B7280", isTextBox: true, margin: 0 });
  take(s, "Even a fact read once leaves a trace.", "It just gets drowned out on the way to the answer.");
  note(s, "How well a model answers a fact depends on how often it has seen it. The curve rises steeply with repetition, but even a fact seen once leaves a small, real trace. For rare facts the information is in there, weakly, and it gets drowned out by higher-level computation on the way to the output. If the knowledge is already there, we don't need training. We need to help it out. (Bar heights sketch the log-linear trend; exact numbers in the papers.)");
}

// ---------- 3 open the box
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Part 1: It already knows more than it says" });
  head(s, "Way 1 · open the box", "So we looked inside.", "Knowledge has an address.");
  s.addShape(pres.ShapeType.roundRect, { x: M, y: 2.5, w: 3.6, h: 3.1, rectRadius: 0.2, fill: { color: "111827" }, line: { color: "111827", width: 0 } });
  s.addText("?", { x: M, y: 2.5, w: 3.6, h: 3.1, fontSize: 80, bold: true, color: "4B5563", align: "center", valign: "middle", isTextBox: true, margin: 0 });
  s.addText("the black box", { x: M, y: 5.7, w: 3.6, h: 0.4, fontSize: 15, bold: true, color: "6B7280", align: "center", isTextBox: true, margin: 0 });
  arrow(s, 4.6, 3.8, 1.0, 0.5, "C2410C");
  const bx = 6.0, by = 2.5; card(s, bx, by, 6.6, 3.1);
  const dotsA = [[0.7,0.8],[1.2,0.5],[0.95,1.3],[1.6,1.05],[0.6,1.85],[1.3,1.75],[1.8,1.5],[1.0,2.3],[1.5,2.2]];
  const dotsB = [[4.5,1.05],[5.0,0.7],[5.4,1.3],[4.7,1.65],[5.2,2.0],[5.6,2.45],[4.3,2.35],[4.9,2.8],[5.5,1.75]];
  dotsA.forEach(([dx,dy]) => s.addShape(pres.ShapeType.ellipse, { x: bx + dx, y: by + dy, w: 0.24, h: 0.24, fill: { color: "C2410C" }, line: { color: "C2410C", width: 0 } }));
  dotsB.forEach(([dx,dy]) => s.addShape(pres.ShapeType.ellipse, { x: bx + dx, y: by + dy, w: 0.24, h: 0.24, fill: { color: "2563EB" }, line: { color: "2563EB", width: 0 } }));
  s.addShape(pres.ShapeType.line, { x: bx + 1.8, y: by + 1.5, w: 3.2, h: 0.2, flipH: true, line: { color: "111827", width: 3, endArrowType: "triangle" } });
  s.addText("v", { x: bx + 3.1, y: by + 0.95, w: 0.5, h: 0.5, fontSize: 24, bold: true, color: "111827", isTextBox: true, margin: 0 });
  s.addText("medical", { x: bx + 0.3, y: by + 2.65, w: 2, h: 0.35, fontSize: 15, bold: true, color: "C2410C", isTextBox: true, margin: 0 });
  s.addText("everything else", { x: bx + 4.0, y: by + 0.2, w: 2.4, h: 0.35, fontSize: 15, bold: true, color: "2563EB", align: "right", isTextBox: true, margin: 0 });
  s.addText("one layer, each dot a sentence", { x: bx, y: 5.7, w: 6.6, h: 0.4, fontSize: 15, bold: true, color: "6B7280", align: "center", isTextBox: true, margin: 0 });
  take(s, "Medical sits in its own corner.", "So we can point at it: one arrow, v.");
  note(s, "We opened the black box. Inside one layer, each dot a sentence, medical sentences sit in their own corner, cleanly separated. Knowledge has an address. So we can point at it: one arrow, v, from everything-else to medical.");
}

// ---------- 4 the nudge
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Part 1: It already knows more than it says" });
  head(s, "Way 1 · the nudge", "Add the arrow while it thinks.", "Where you add it matters.");
  const lx = M + 0.3, lw = 3.2, lh = 0.48, ly0 = 2.7;
  for (let i = 0; i < 5; i++) {
    const hot = i === 2;
    s.addShape(pres.ShapeType.roundRect, { x: lx, y: ly0 + i * (lh + 0.12), w: lw, h: lh, rectRadius: 0.06, fill: { color: hot ? "C2410C" : "E5E7EB" }, line: { color: hot ? "C2410C" : "E5E7EB", width: 0 } });
    if (hot) {
      s.addText("MLP layer", { x: lx, y: ly0 + i * (lh + 0.12), w: lw, h: lh, fontSize: 16, bold: true, color: "FFFFFF", align: "center", valign: "middle", isTextBox: true, margin: 0 });
      s.addText("+ v", { x: lx + lw + 0.2, y: ly0 + i * (lh + 0.12) - 0.08, w: 1.2, h: 0.6, fontSize: 28, bold: true, color: "C2410C", isTextBox: true, margin: 0 });
    }
  }
  s.addText("the model, layer by layer", { x: lx, y: 5.75, w: lw, h: 0.4, fontSize: 14, color: "6B7280", align: "center", isTextBox: true, margin: 0 });
  const yB = 5.45, x0 = 7.2, bw = 1.3, gap = 0.4;
  bar(s, x0, yB, bw, 1.25, "9CA3AF", "+21%", "6B7280");
  bar(s, x0 + (bw + gap), yB, bw, 1.7, "9CA3AF", "+29%", "6B7280");
  bar(s, x0 + 2 * (bw + gap), yB, bw, 2.65, "C2410C", "+45%", "C2410C");
  axis(s, x0 - 0.15, yB, 3 * (bw + gap));
  [["the usual spot","374151"],["attention","374151"],["MLP","C2410C"]].forEach((l, i) => s.addText(l[0], { x: x0 + i * (bw + gap) - 0.2, y: yB + 0.08, w: bw + 0.4, h: 0.35, fontSize: 14, bold: true, color: l[1], align: "center", isTextBox: true, margin: 0 }));
  s.addText("better at medical and law facts", { x: x0 - 0.15, y: yB + 0.45, w: 3 * (bw + gap), h: 0.35, fontSize: 13, color: "6B7280", align: "center", isTextBox: true, margin: 0 });
  take(s, "No training, nothing forgotten.", "But it can only surface what the model has already read.");
  note(s, "While the model answers, add that arrow to its activity at one layer. One addition, no training, nothing forgotten. And where you add it matters: at the MLP layers, the memory blocks, factual recall improves by 45%, more than double the usual spot. Facts live in the MLPs. But steering can only surface what the model has already read. For yesterday's news: Way two.");
}

// ---------- 5 problem
pres.addSection({ title: "Part 2: It needs knowledge it never had" });
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Part 2: It needs knowledge it never had" });
  head(s, "Way 2 · it never read it", "Yesterday's news isn't in there.", "So hand it the newspaper.");
  card(s, M, 2.5, 4.6, 1.55);
  s.addText("BACK TO SCHOOL", { x: M + 0.25, y: 2.6, w: 4.2, h: 0.3, fontSize: 11, bold: true, charSpacing: 2, color: "6B7280", isTextBox: true, margin: 0 });
  big(s, M + 0.25, 2.9, 4.2, "trillions", "111827", 40);
  s.addText("of words, from scratch", { x: M + 0.25, y: 3.6, w: 4.2, h: 0.4, fontSize: 13, color: "374151", isTextBox: true, margin: 0 });
  card(s, M, 4.3, 4.6, 1.55, true);
  s.addText("THE NEWSPAPER", { x: M + 0.25, y: 4.4, w: 4.2, h: 0.3, fontSize: 11, bold: true, charSpacing: 2, color: "C2410C", isTextBox: true, margin: 0 });
  big(s, M + 0.25, 4.7, 4.2, "~6 billion", "C2410C", 40);
  s.addText("words of fresh news, a few days", { x: M + 0.25, y: 5.4, w: 4.2, h: 0.4, fontSize: 13, color: "374151", isTextBox: true, margin: 0 });
  take(s, "Same model, same learning recipe, just new text.", "And it works: it learns the news.");
  note(s, "Sometimes the knowledge genuinely isn't in there: everything after the cutoff. Retraining from scratch is trillions of tokens and millions of dollars. The alternative is continued pretraining on about six billion tokens of fresh news. In NewsCPT, news beat random web text by two to four times on every model and quiz. So it works. What happens inside when we do this?");
}

// ---------- 6 question
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Part 2: It needs knowledge it never had" });
  head(s, "Way 2 · the question", "It read the news in English. Ask it in German.", "Does it know?");
  const y0 = 2.9, h = 0.6, gap = 0.2;
  s.addText("reads news in", { x: M + 0.3, y: 2.45, w: 2.2, h: 0.35, fontSize: 14, bold: true, color: "6B7280", align: "center", isTextBox: true, margin: 0 });
  lang(s, M + 0.3, y0, 2.2, h, "EN", "2563EB"); lang(s, M + 0.3, y0 + h + gap, 2.2, h, "DE", "D97706"); lang(s, M + 0.3, y0 + 2 * (h + gap), 2.2, h, "FR", "7C3AED");
  arrow(s, 3.6, 3.75, 1.3, 0.55);
  s.addText("plain LLM", { x: 5.2, y: 3.45, w: 2.9, h: 0.5, fontSize: 24, bold: true, color: "111827", align: "center", isTextBox: true, margin: 0 });
  s.addText("no reasoning", { x: 5.2, y: 3.95, w: 2.9, h: 0.4, fontSize: 14, color: "6B7280", align: "center", isTextBox: true, margin: 0 });
  arrow(s, 8.4, 3.75, 1.3, 0.55);
  s.addText("same fact asked in", { x: 10.0, y: 2.45, w: 2.3, h: 0.35, fontSize: 14, bold: true, color: "6B7280", align: "center", isTextBox: true, margin: 0 });
  lang(s, 10.0, y0, 2.3, h, "EN", "2563EB", true); lang(s, 10.0, y0 + h + gap, 2.3, h, "DE", "D97706", true); lang(s, 10.0, y0 + 2 * (h + gap), 2.3, h, "FR", "7C3AED", true);
  take(s, "A plain model, no reasoning, same facts in three languages.", "What's your guess?");
  note(s, "Plain model, no chain-of-thought. It reads the news in English only. I ask about the same event in German or French. Does it keep the answer? We updated models on English, German or French news, then asked the exact same facts, about fifteen thousand, translated, in all three languages. Who thinks it transfers?");
}

// ---------- 7 answer
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Part 2: It needs knowledge it never had" });
  head(s, "Way 2 · the answer", "Mostly, yes.", "Knowledge doesn't really speak a language.");
  s.addText("~70%", { x: M, y: 2.3, w: W, h: 2.0, fontSize: 120, bold: true, fontFace: "Cambria", color: "C2410C", align: "center", isTextBox: true, margin: 0 });
  s.addShape(pres.ShapeType.roundRect, { x: 1.7, y: 4.6, w: 9.9, h: 0.55, rectRadius: 0.1, fill: { color: "F3F4F6" }, line: { color: "E5E7EB", width: 1 } });
  s.addShape(pres.ShapeType.roundRect, { x: 1.7, y: 4.6, w: 6.93, h: 0.55, rectRadius: 0.1, fill: { color: "C2410C" }, line: { color: "C2410C", width: 0 } });
  s.addText("what it learned in English", { x: 1.7, y: 5.25, w: 4, h: 0.35, fontSize: 14, bold: true, color: "6B7280", isTextBox: true, margin: 0 });
  s.addText("100% = as good as asking in English", { x: 7.6, y: 5.25, w: 4, h: 0.35, fontSize: 14, bold: true, color: "6B7280", align: "right", isTextBox: true, margin: 0 });
  take(s, "About 70% of what it learned in English, it can answer in German or French.", "Asking in the language it read is still a bit better.");
  note(s, "Yes, mostly. About 70% of the accuracy gain survives when you ask in another language, between 57 and 88% depending on direction. French to English travels better than English to French.");
}

// ---------- 9 cost
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Part 2: It needs knowledge it never had" });
  head(s, "Way 2 · the catch", "But it quietly gets worse at other things.", "");
  card(s, M, 2.5, 5.7, 3.4);
  s.addText("FACTS FROM BEFORE 2023", { x: M, y: 2.75, w: 5.7, h: 0.35, fontSize: 12, bold: true, charSpacing: 2, color: "6B7280", align: "center", isTextBox: true, margin: 0 });
  s.addText("+0.3", { x: M, y: 3.2, w: 5.7, h: 1.6, fontSize: 84, bold: true, fontFace: "Cambria", color: "111827", align: "center", isTextBox: true, margin: 0 });
  s.addText("nothing forgotten", { x: M, y: 5.0, w: 5.7, h: 0.4, fontSize: 16, color: "374151", align: "center", isTextBox: true, margin: 0 });
  card(s, 6.95, 2.5, 5.7, 3.4, true);
  s.addText("GENERAL SKILLS · 20 TESTS", { x: 6.95, y: 2.75, w: 5.7, h: 0.35, fontSize: 12, bold: true, charSpacing: 2, color: "C2410C", align: "center", isTextBox: true, margin: 0 });
  s.addText("−1.2", { x: 6.95, y: 3.2, w: 5.7, h: 1.6, fontSize: 84, bold: true, fontFace: "Cambria", color: "C2410C", align: "center", isTextBox: true, margin: 0 });
  s.addText("looks fine in the training language, drops in the others", { x: 6.95, y: 5.0, w: 5.7, h: 0.4, fontSize: 16, color: "374151", align: "center", isTextBox: true, margin: 0 });
  take(s, "Old facts stay. General skills slip.", "And you only notice if you test in the other languages.");
  note(s, "Old facts from before 2023: kept, slightly up. General skills on twenty tests in three languages: they slip. French-only loses 1.2, German 1.3, English 0.5. Test the French model only in French and it looks fine. Catastrophic forgetting in a new disguise, and the multilingual lens makes it visible.");
}

// ---------- 11 merge
pres.addSection({ title: "Train separately, average, and why it works" });
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Train separately, average, and why it works" });
  head(s, "Way 2 · the trick", "Teach three students, then average their brains.", "");
  const cy = 3.0, d = 1.1;
  const circ = (x, color, label, fs) => { s.addShape(pres.ShapeType.ellipse, { x, y: cy, w: d, h: d, fill: { color }, line: { color, width: 0 } }); s.addText(label, { x, y: cy, w: d, h: d, fontSize: fs || 26, bold: true, color: "FFFFFF", align: "center", valign: "middle", isTextBox: true, margin: 0 }); };
  circ(1.4, "2563EB", "EN"); s.addText("+", { x: 2.6, y: cy, w: 0.5, h: d, fontSize: 36, bold: true, color: "9CA3AF", align: "center", valign: "middle", isTextBox: true, margin: 0 });
  circ(3.2, "D97706", "DE"); s.addText("+", { x: 4.4, y: cy, w: 0.5, h: d, fontSize: 36, bold: true, color: "9CA3AF", align: "center", valign: "middle", isTextBox: true, margin: 0 });
  circ(5.0, "7C3AED", "FR"); s.addText("÷ 3  =", { x: 6.2, y: cy, w: 1.6, h: d, fontSize: 36, bold: true, color: "9CA3AF", align: "center", valign: "middle", isTextBox: true, margin: 0 });
  s.addShape(pres.ShapeType.ellipse, { x: 8.0, y: cy - 0.2, w: 1.5, h: 1.5, fill: { color: "C2410C" }, line: { color: "C2410C", width: 0 } });
  s.addText("★", { x: 8.0, y: cy - 0.2, w: 1.5, h: 1.5, fontSize: 48, color: "FFFFFF", align: "center", valign: "middle", isTextBox: true, margin: 0 });
  take(s, "All the new facts, nothing lost, no extra training.", "Train one model per language, then average the weights.");
  note(s, "Take the three single-language models and average their weights: add the numbers, divide by three. No training. Model soups, Wortsman et al. 2022. As many new facts as the mixture, plus 5.1, and zero skill loss. It beats every single-language model on both axes. Language-specific updates can be trained separately and merged.");
}

// ---------- 12 why
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Train separately, average, and why it works" });
  head(s, "Way 2 · why it works · work in progress", "Each language pulls in its own direction.", "Averaging keeps what they share.");
  const bx = 1.6, by = 5.4;
  const arr = (x2, y2, color, w) => s.addShape(pres.ShapeType.line, { x: Math.min(bx, x2), y: Math.min(by, y2), w: Math.abs(x2 - bx), h: Math.abs(y2 - by), flipV: true, line: { color, width: w, endArrowType: "triangle" } });
  arr(5.6, 4.6, "2563EB", 4); arr(2.9, 2.4, "D97706", 4); arr(4.9, 2.5, "7C3AED", 4); arr(4.0, 4.0, "C2410C", 7);
  s.addShape(pres.ShapeType.ellipse, { x: bx - 0.15, y: by - 0.15, w: 0.3, h: 0.3, fill: { color: "FFFFFF" }, line: { color: "111827", width: 3 } });
  s.addText("base model", { x: bx - 0.9, y: by + 0.2, w: 1.8, h: 0.35, fontSize: 14, bold: true, color: "111827", align: "center", isTextBox: true, margin: 0 });
  s.addText("EN", { x: 5.7, y: 4.4, w: 0.6, h: 0.35, fontSize: 16, bold: true, color: "2563EB", isTextBox: true, margin: 0 });
  s.addText("DE", { x: 2.6, y: 2.05, w: 0.6, h: 0.35, fontSize: 16, bold: true, color: "D97706", isTextBox: true, margin: 0 });
  s.addText("FR", { x: 4.95, y: 2.15, w: 0.6, h: 0.35, fontSize: 16, bold: true, color: "7C3AED", isTextBox: true, margin: 0 });
  s.addText("average ★", { x: 4.1, y: 3.75, w: 1.6, h: 0.35, fontSize: 16, bold: true, color: "C2410C", isTextBox: true, margin: 0 });
  s.addText("Three updates, three different directions", { x: 7.0, y: 2.7, w: 5.6, h: 0.6, fontSize: 22, bold: true, color: "111827", isTextBox: true, margin: 0 });
  s.addText("averaging keeps what they share, cancels the rest", { x: 7.0, y: 3.3, w: 5.6, h: 0.4, fontSize: 15, color: "6B7280", isTextBox: true, margin: 0 });
  s.addText("The shared part lives in the MLPs", { x: 7.0, y: 4.3, w: 5.6, h: 0.6, fontSize: 22, bold: true, color: "C2410C", isTextBox: true, margin: 0 });
  s.addText("the same place steering found in Way 1", { x: 7.0, y: 4.9, w: 5.6, h: 0.4, fontSize: 15, color: "6B7280", isTextBox: true, margin: 0 });
  take(s, "New knowledge is a direction.", "And it lives in the MLPs, the same place Way 1 found.");
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
  col(M, "Way 1 · it already knows it", "Steer it.", "Point at the knowledge and nudge. No training, nothing forgotten.");
  col(M + 4.07, "Way 2 · it never read it", "Let it read, then average.", "Hand it the newspaper per language, then average. The facts without the price.");
  col(M + 8.13, "Does the language matter?", "Less than you'd think.", "Facts cross languages. Costs hide in the others. Test in all of them.");
  s.addText([{ text: "If new knowledge is a direction we can add, average and steer: ", options: { bold: true } }, { text: "do we ever need to retrain from scratch?", options: { italic: true, color: "6B7280" } }], { x: M, y: 5.4, w: W, h: 0.5, fontSize: 17, color: "111827", align: "center", isTextBox: true, margin: 0 });
  s.addShape(pres.ShapeType.line, { x: M, y: 6.1, w: W, h: 0, line: { color: "E5E7EB", width: 1 } });
  s.addText([{ text: "Thank you ", options: { bold: true, color: "111827" } }, { text: "for your attention.", options: { italic: true, color: "6B7280" } }], { x: M, y: 6.25, w: 6, h: 0.5, fontSize: 18, isTextBox: true, margin: 0 });
  s.addText("Nitin Sharma · MHM Lab\nnitinsharma3150@gmail.com", { x: 7.0, y: 6.2, w: 5.63, h: 0.6, fontSize: 11.5, color: "6B7280", align: "right", isTextBox: true, margin: 0 });
  note(s, "The answers. Retrain or teach? Teach. If it already knows it, steer it. If it never read it, let it read, then average. Does the language matter? Less than you'd think. And the question I'm chasing: if new knowledge is a direction we can add, average and steer, do we ever need to retrain from scratch? Thank you.");
}

  const out = process.argv[2];
  await pres.writeFile({ fileName: out });
  await applyTheme(out, THEME);
  console.log("wrote", out);
}
main();
