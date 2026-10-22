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
const { FiBookOpen, FiGlobe, FiCloud } = require("react-icons/fi"); const { HiOutlineLightBulb, HiOutlineLockClosed } = require("react-icons/hi");
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
  ICON.bulb = await icon(HiOutlineLightBulb, "#111827"); ICON.book = await icon(FiBookOpen, "#C2410C"); ICON.lock = await icon(HiOutlineLockClosed, "#111827"); ICON.lockO = await icon(HiOutlineLockClosed, "#C2410C"); ICON.cloud = await icon(FiCloud, "#9CA3AF"); ICON.globe = await icon(FiGlobe, "#111827"); ICON.bookD = await icon(FiBookOpen, "#111827");
// ---------- 1 cover
pres.addSection({ title: "Why this matters" });
{
  const s = pres.addSlide({ masterName: "TITLE", sectionTitle: "Why this matters" });
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

// ---------- med
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Why this matters" });
  head(s, "Why this matters · 1", "Doctors want AI.", "Not on someone else's computer.");
  s.addText("86%", { x: M, y: 2.3, w: 5.2, h: 1.9, fontSize: 120, bold: true, fontFace: "Cambria", color: "C2410C", align: "center", isTextBox: true, margin: 0 });
  s.addText("of physicians need data-privacy assurances before they would adopt AI in practice", { x: M + 0.3, y: 4.3, w: 4.6, h: 0.9, fontSize: 16, color: "374151", align: "center", isTextBox: true, margin: 0 });
  s.addText("AMA physician survey, 2026", { x: M, y: 5.25, w: 5.2, h: 0.35, fontSize: 12, color: "9CA3AF", align: "center", isTextBox: true, margin: 0 });
  const row = (y, accent, ic, txt) => { card(s, 6.8, y, 5.8, 1.2, accent); s.addImage({ data: ic, x: 7.05, y: y + 0.25, w: 0.7, h: 0.7 }); s.addText(txt, { x: 7.95, y, w: 4.5, h: 1.2, fontSize: 18, bold: true, color: accent ? "111827" : "6B7280", valign: "middle", isTextBox: true, margin: 0 }); };
  row(2.9, false, ICON.cloud, "Big model: patient data leaves the clinic");
  row(4.4, true, ICON.lockO, "Small model: runs locally, still knows medicine");
  take(s, "We need small models that run in the clinic.", "Can we make one understand medicine without retraining it?");
  note(s, "There are amazing models out there, but doctors hesitate: in the latest AMA survey, 86% of physicians need data-privacy assurances before adopting AI, because the big models run on someone else's cluster. We want a small model that runs locally and still understands medicine. Can we make a model understand a domain without retraining it?");
}

// ---------- usual fix
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Why this matters" });
  head(s, "The usual fix", "Send it back to school.", "Expensive, and it forgets.");
  card(s, M, 2.4, 5.75, 3.6);
  s.addText("TO TEACH IT MEDICINE", { x: M, y: 2.65, w: 5.75, h: 0.3, fontSize: 11, bold: true, charSpacing: 2, color: "6B7280", align: "center", isTextBox: true, margin: 0 });
  s.addText("~48B", { x: M, y: 3.05, w: 5.75, h: 1.4, fontSize: 72, bold: true, fontFace: "Cambria", color: "111827", align: "center", isTextBox: true, margin: 0 });
  s.addText("words of training, weeks on 8 GPUs", { x: M + 0.4, y: 4.6, w: 4.95, h: 0.8, fontSize: 15, color: "374151", align: "center", isTextBox: true, margin: 0 });
  card(s, M + 6.15, 2.4, 5.75, 3.6, true);
  s.addText("AND AFTERWARDS", { x: M + 6.15, y: 2.65, w: 5.75, h: 0.3, fontSize: 11, bold: true, charSpacing: 2, color: "C2410C", align: "center", isTextBox: true, margin: 0 });
  s.addText("“Anna passed the file to Ben. Ben passed it to Clara. Who has it?”", { x: M + 6.5, y: 3.05, w: 5.05, h: 0.9, fontSize: 16, italic: true, color: "374151", align: "center", isTextBox: true, margin: 0 });
  const ans = (x, label, val, c) => { s.addShape(pres.ShapeType.roundRect, { x, y: 4.15, w: 2.2, h: 1.3, rectRadius: 0.12, fill: { color: "FFFFFF" }, line: { color: c === "C2410C" ? "FDBA74" : "E5E7EB", width: 1.5 } }); s.addText(label, { x, y: 4.25, w: 2.2, h: 0.35, fontSize: 12, color: c === "C2410C" ? "C2410C" : "6B7280", align: "center", isTextBox: true, margin: 0 }); s.addText(val, { x, y: 4.6, w: 2.2, h: 0.7, fontSize: 24, bold: true, color: c, align: "center", valign: "middle", isTextBox: true, margin: 0 }); };
  ans(M + 6.8, "before", "Clara ✓", "111827"); ans(M + 9.3, "after", "Anna ✗", "C2410C");
  take(s, "Training has a cost: what it used to know.", "Can we avoid training altogether?");
  note(s, "The usual fix: train it some more. Two problems. Expensive: about 48 billion words, weeks on 8 GPUs. And it forgets: after medical training the model gets worse at simple things it could do before. Catastrophic forgetting. Can we teach instead of retrain?");
}

// ---------- 2 insight
{
  pres.addSection({ title: "Way 1: the knowledge is already there" });
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Way 1: the knowledge is already there" });
  head(s, "Way 1 · the hunch", "The knowledge is already in there.", "It gets lost on the way out.");
  const yB = 5.6, x0 = M + 0.2, bw = 0.9, gap = 0.3;
  const vals = [["+1", 0.2, "FDBA74", "6B7280", "once"], ["+2", 0.45, "FB923C", "6B7280", "a few"], ["+5", 1.1, "F97316", "C2410C", "dozens"], ["+8", 1.8, "EA580C", "C2410C", "~100"], ["+12", 2.7, "C2410C", "C2410C", "200+"]];
  vals.forEach((v, i) => { const x = x0 + i * (bw + gap); bar(s, x, yB, bw, v[1], v[2], v[0], v[3]); s.addText(v[4], { x: x - 0.1, y: yB + 0.08, w: bw + 0.2, h: 0.3, fontSize: 13, color: "6B7280", align: "center", isTextBox: true, margin: 0 }); });
  axis(s, x0 - 0.1, yB, 5 * (bw + gap));
  s.addText("how often the model has seen a fact → how well it answers", { x: x0 - 0.1, y: yB + 0.42, w: 6, h: 0.3, fontSize: 12, color: "6B7280", isTextBox: true, margin: 0 });
  const ly = ["late layers: assemble the answer", "…", "early layers: look up the facts", "early layers: look up the facts"];
  ly.forEach((t, i) => { const hot = i >= 2; s.addShape(pres.ShapeType.roundRect, { x: 7.6, y: 2.6 + i * 0.75, w: 5.0, h: 0.62, rectRadius: 0.08, fill: { color: hot ? "C2410C" : "E5E7EB" }, line: { color: hot ? "C2410C" : "E5E7EB", width: 0 } }); s.addText(t, { x: 7.6, y: 2.6 + i * 0.75, w: 5.0, h: 0.62, fontSize: 15, bold: true, color: hot ? "FFFFFF" : "6B7280", align: "center", valign: "middle", isTextBox: true, margin: 0 }); });
  s.addText("Geva et al., 2023", { x: 7.6, y: 5.65, w: 5.0, h: 0.3, fontSize: 12, color: "9CA3AF", align: "center", isTextBox: true, margin: 0 });
  take(s, "Even a fact read once leaves a trace.", "A weak one gets overruled by the layers that write the answer.");
  note(s, "How well a model answers a fact depends on how often it has seen it. The curve rises steeply with repetition, but even a fact seen once leaves a small, real trace. For rare facts the information is in there, weakly, and it gets drowned out by higher-level computation on the way to the output. If the knowledge is already there, we don't need training. We need to help it out. (Bar heights sketch the log-linear trend; exact numbers in the papers.)");
}

// ---------- 3 open the box
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Way 1: the knowledge is already there" });
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
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Way 1: the knowledge is already there" });
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

// ---------- newknow
{
  pres.addSection({ title: "Way 2: genuinely new knowledge" });
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Way 2: genuinely new knowledge" });
  head(s, "Why this matters · 2", "But what if the knowledge is genuinely new?", "The model finished school in 2023.");
  s.addImage({ data: ICON.lock, x: 6.1, y: 2.35, w: 1.1, h: 1.1 });
  s.addText("Dec 2023", { x: 5.2, y: 3.5, w: 2.9, h: 0.45, fontSize: 24, bold: true, color: "111827", align: "center", isTextBox: true, margin: 0 });
  s.addShape(pres.ShapeType.roundRect, { x: M, y: 4.1, w: 5.8, h: 0.32, rectRadius: 0.16, fill: { color: "111827" }, line: { color: "111827", width: 0 } });
  for (let i = 0; i < 9; i++) s.addShape(pres.ShapeType.rect, { x: 6.75 + i * 0.66, y: 4.1, w: 0.42, h: 0.32, fill: { color: "C2410C" }, line: { color: "C2410C", width: 0 } });
  s.addText("Read everything up to here", { x: M, y: 4.6, w: 5.8, h: 0.5, fontSize: 24, bold: true, color: "111827", isTextBox: true, margin: 0 });
  s.addText("Never saw this", { x: 6.75, y: 4.6, w: 5.9, h: 0.5, fontSize: 24, bold: true, color: "C2410C", isTextBox: true, margin: 0 });
  s.addText("new drugs · new guidelines · yesterday's news", { x: 6.75, y: 5.1, w: 5.9, h: 0.4, fontSize: 18, color: "6B7280", isTextBox: true, margin: 0 });
  take(s, "Steering can't surface what was never read.", "Now we have to train, and pay the forgetting cost.");
  note(s, "A language model is trained once on a giant snapshot of text, then frozen. The models we use stopped reading around the end of 2023. Everything after that it never saw. Ask it and it guesses, confidently. So: how do we keep it useful?");
}

// ---------- recipe
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Way 2: genuinely new knowledge" });
  head(s, "Way 2 · the cheaper way", "Don't rebuild it.", "Hand it the newspaper.");
  const big2 = (x, accent, eyebrow, n, sub, cite) => { card(s, x, 2.4, 5.75, 3.6, accent); const c = accent ? "C2410C" : "6B7280"; s.addText(eyebrow, { x, y: 2.65, w: 5.75, h: 0.3, fontSize: 11, bold: true, charSpacing: 2, color: c, align: "center", isTextBox: true, margin: 0 }); s.addText(n, { x, y: 3.05, w: 5.75, h: 1.4, fontSize: 66, bold: true, fontFace: "Cambria", color: accent ? "C2410C" : "111827", align: "center", isTextBox: true, margin: 0 }); s.addText(sub, { x: x + 0.4, y: 4.55, w: 4.95, h: 0.7, fontSize: 15, color: "374151", align: "center", isTextBox: true, margin: 0 }); s.addText(cite, { x, y: 5.4, w: 5.75, h: 0.3, fontSize: 12, color: "9CA3AF", align: "center", isTextBox: true, margin: 0 }); };
  big2(M, false, "FROM SCRATCH · LLAMA 3", "15.6 T", "words · about 30 million GPU-hours", "Meta, 2024");
  big2(M + 6.15, true, "KEEP TRAINING ON NEWS", "6 B", "words of fresh news · a few days on a few GPUs", "2,500× less text");
  take(s, "Same model, same recipe, new text: it learns the news.", "It still forgets a little. Can we minimise that?");
  note(s, "Rebuilding from scratch: Llama 3 took 15.6 trillion words and about 30 million GPU-hours. Instead we keep training the existing model on six billion words of fresh news, 2,500 times less text. It learns the news. It still forgets a little. Can we minimise that?");
}

// ---------- lang
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Way 2: genuinely new knowledge" });
  head(s, "Why this matters · 3", "People open up in their own language.", "Do we have to train once per language?");
  s.addText("“When the emotional tone rises, multilingual clients switch to their first language.”", { x: M, y: 2.8, w: 7.0, h: 1.6, fontSize: 24, italic: true, color: "374151", valign: "middle", isTextBox: true, margin: 0 });
  s.addText("Dewaele & Costa, 2013 · 182 clients in psychotherapy", { x: M, y: 4.45, w: 7.0, h: 0.35, fontSize: 13, color: "9CA3AF", isTextBox: true, margin: 0 });
  const r = (y, col, code, txt) => { s.addShape(pres.ShapeType.ellipse, { x: 8.9, y, w: 0.8, h: 0.8, fill: { color: col }, line: { color: col, width: 0 } }); s.addText(code, { x: 8.9, y, w: 0.8, h: 0.8, fontSize: 16, bold: true, color: "FFFFFF", align: "center", valign: "middle", isTextBox: true, margin: 0 }); s.addText(txt, { x: 9.9, y, w: 2.7, h: 0.8, fontSize: 18, color: "6B7280", valign: "middle", isTextBox: true, margin: 0 }); };
  r(2.7, "2563EB", "EN", "train"); r(3.75, "D97706", "DE", "train again?"); r(4.8, "7C3AED", "FR", "and again?");
  take(s, "If we must train, we'd rather train once.", "So: does what it learns in one language carry to the others?");
  note(s, "In therapy, people open up in their own language: Dewaele and Costa followed 182 multilingual clients and found they switch to their first language when the emotional tone rises. So our models must work in German and French too. Training once per language multiplies the cost. If what it learns in one language carries over, we train once. Does it?");
}

// ---------- 6 question
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Way 2: genuinely new knowledge" });
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
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Way 2: genuinely new knowledge" });
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
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Way 2: genuinely new knowledge" });
  head(s, "Way 2 · the cost", "So what did training cost us?", "");
  card(s, M, 2.5, 5.7, 3.4);
  s.addText("FACTS FROM BEFORE 2023", { x: M, y: 2.75, w: 5.7, h: 0.35, fontSize: 12, bold: true, charSpacing: 2, color: "6B7280", align: "center", isTextBox: true, margin: 0 });
  s.addText("+0.3", { x: M, y: 3.2, w: 5.7, h: 1.6, fontSize: 84, bold: true, fontFace: "Cambria", color: "111827", align: "center", isTextBox: true, margin: 0 });
  s.addText("nothing forgotten", { x: M, y: 5.0, w: 5.7, h: 0.4, fontSize: 16, color: "374151", align: "center", isTextBox: true, margin: 0 });
  card(s, 6.95, 2.5, 5.7, 3.4, true);
  s.addText("GENERAL SKILLS · 20 TESTS", { x: 6.95, y: 2.75, w: 5.7, h: 0.35, fontSize: 12, bold: true, charSpacing: 2, color: "C2410C", align: "center", isTextBox: true, margin: 0 });
  s.addText("−1.2", { x: 6.95, y: 3.2, w: 5.7, h: 1.6, fontSize: 84, bold: true, fontFace: "Cambria", color: "C2410C", align: "center", isTextBox: true, margin: 0 });
  s.addText("looks fine in the training language, drops in the others", { x: 6.95, y: 5.0, w: 5.7, h: 0.4, fontSize: 16, color: "374151", align: "center", isTextBox: true, margin: 0 });
  take(s, "Old facts stay. General skills slip, mostly in the other languages.", "Can we take less of a hit, and transfer more?");
  note(s, "Old facts from before 2023: kept, slightly up. General skills on twenty tests in three languages: they slip. French-only loses 1.2, German 1.3, English 0.5. Test the French model only in French and it looks fine. Catastrophic forgetting in a new disguise, and the multilingual lens makes it visible.");
}

// ---------- mix
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Way 2: genuinely new knowledge" });
  head(s, "Way 2 · better", "Mix the three newspapers.", "Less damage, more facts.");
  const bw = 0.8, g = 0.25;
  s.addText("new facts learned", { x: M + 0.2, y: 2.35, w: 4.4, h: 0.35, fontSize: 14, bold: true, color: "6B7280", align: "center", isTextBox: true, margin: 0 });
  const yB1 = 5.3; const f = [["+3.4", 1.5, "2563EB", "EN", "111827"], ["+2.6", 1.15, "D97706", "DE", "111827"], ["+3.3", 1.45, "7C3AED", "FR", "111827"], ["+5.0", 2.2, "C2410C", "Mix", "C2410C"]];
  f.forEach((v, i) => { const x = M + 0.3 + i * (bw + g); bar(s, x, yB1, bw, v[1], v[2], v[0], v[4]); s.addText(v[3], { x: x - 0.1, y: yB1 + 0.08, w: bw + 0.2, h: 0.35, fontSize: 14, bold: true, color: "111827", align: "center", isTextBox: true, margin: 0 }); });
  axis(s, M + 0.15, yB1, 4 * (bw + g));
  s.addText("skills lost", { x: 7.2, y: 2.35, w: 4.4, h: 0.35, fontSize: 14, bold: true, color: "6B7280", align: "center", isTextBox: true, margin: 0 });
  const yT = 2.9; const l = [["−0.5", 0.7, "2563EB", "EN", "111827"], ["−1.3", 1.8, "D97706", "DE", "C2410C"], ["−1.2", 1.65, "7C3AED", "FR", "C2410C"], ["−0.3", 0.42, "C2410C", "Mix", "111827"]];
  axis(s, 7.15, yT, 4 * (bw + g));
  l.forEach((v, i) => { const x = 7.3 + i * (bw + g); s.addShape(pres.ShapeType.rect, { x, y: yT, w: bw, h: v[1], fill: { color: v[2] }, line: { color: v[2], width: 0 } }); s.addText(v[0], { x: x - 0.2, y: yT + v[1] + 0.05, w: bw + 0.4, h: 0.35, fontSize: 16, bold: true, color: v[4], align: "center", isTextBox: true, margin: 0 }); s.addText(v[3], { x: x - 0.1, y: yT + v[1] + 0.4, w: bw + 0.2, h: 0.35, fontSize: 14, bold: true, color: "111827", align: "center", isTextBox: true, margin: 0 }); });
  take(s, "Mixing helps.", "But can we do even better?");
  note(s, "First idea: don't read only German, mix all three newspapers. A balanced mix learns more facts than any single language and loses much less. Can we do even better?");
}

// ---------- 11 merge
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Way 2: genuinely new knowledge" });
  head(s, "Way 2 · even better", "Teach three students, then average their brains.", "");
  const cy = 3.0, d = 1.1;
  const circ = (x, color, label, fs) => { s.addShape(pres.ShapeType.ellipse, { x, y: cy, w: d, h: d, fill: { color }, line: { color, width: 0 } }); s.addText(label, { x, y: cy, w: d, h: d, fontSize: fs || 26, bold: true, color: "FFFFFF", align: "center", valign: "middle", isTextBox: true, margin: 0 }); };
  circ(1.4, "2563EB", "EN"); s.addText("+", { x: 2.6, y: cy, w: 0.5, h: d, fontSize: 36, bold: true, color: "9CA3AF", align: "center", valign: "middle", isTextBox: true, margin: 0 });
  circ(3.2, "D97706", "DE"); s.addText("+", { x: 4.4, y: cy, w: 0.5, h: d, fontSize: 36, bold: true, color: "9CA3AF", align: "center", valign: "middle", isTextBox: true, margin: 0 });
  circ(5.0, "7C3AED", "FR"); s.addText("÷ 3  =", { x: 6.2, y: cy, w: 1.6, h: d, fontSize: 36, bold: true, color: "9CA3AF", align: "center", valign: "middle", isTextBox: true, margin: 0 });
  s.addShape(pres.ShapeType.ellipse, { x: 8.0, y: cy - 0.2, w: 1.5, h: 1.5, fill: { color: "C2410C" }, line: { color: "C2410C", width: 0 } });
  s.addText("★", { x: 8.0, y: cy - 0.2, w: 1.5, h: 1.5, fontSize: 48, color: "FFFFFF", align: "center", valign: "middle", isTextBox: true, margin: 0 });
  take(s, "All the new facts, nothing lost, no extra training.", "“Model soups”, Wortsman et al. 2022: average the weights.");
  note(s, "Take the three single-language models and average their weights: add the numbers, divide by three. No training. Model soups, Wortsman et al. 2022. As many new facts as the mixture, plus 5.1, and zero skill loss. It beats every single-language model on both axes. Language-specific updates can be trained separately and merged.");
}

// ---------- 13 part 2 summary figure
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Way 2: genuinely new knowledge" });
  head(s, "Way 2 · the result", "Every update learns.", "Only the average learns without losing.");
  s.addImage({ path: __dirname + "/summary_part2.png", x: 2.55, y: 2.15, w: 8.2, h: 5.08 * 0.86 });
  take(s, "Right = more new facts. Up = nothing forgotten.", "Top right is where we want to be.");
  note(s, "Part two in one picture. Right means more new facts learned; up means general skills kept. Each single-language update learns but forgets. The mixture learns the most and forgets less. The average of the three single-language models, no extra training, sits top right: as many facts as the mixture and nothing lost.");
}

// ---------- ongoing
pres.addSection({ title: "Ongoing work and summary" });
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Ongoing work and summary" });
  head(s, "Ongoing · where does the new knowledge live?", "In the same place steering found.", "So do we even need to train three models?");
  const cols = ["E5E7EB", "E5E7EB", "FDBA74", "C2410C", "C2410C", "FDBA74"];
  cols.forEach((c, i) => s.addShape(pres.ShapeType.roundRect, { x: M, y: 2.45 + i * 0.5, w: 2.4, h: 0.42, rectRadius: 0.06, fill: { color: c }, line: { color: c, width: 0 } }));
  s.addText("MLP layers, first half", { x: M, y: 5.5, w: 2.4, h: 0.35, fontSize: 12, color: "6B7280", align: "center", isTextBox: true, margin: 0 });
  s.addText("≈95%", { x: 3.4, y: 2.6, w: 3.6, h: 1.5, fontSize: 84, bold: true, fontFace: "Cambria", color: "C2410C", isTextBox: true, margin: 0 });
  s.addText("of the new facts survive if we keep only the MLP changes", { x: 3.4, y: 4.2, w: 3.3, h: 0.9, fontSize: 16, color: "374151", isTextBox: true, margin: 0 });
  const bx = 8.0, by = 5.4;
  const arr = (x2, y2, color, w) => s.addShape(pres.ShapeType.line, { x: Math.min(bx, x2), y: Math.min(by, y2), w: Math.abs(x2 - bx), h: Math.abs(by - y2), flipV: true, line: { color, width: w, endArrowType: "triangle" } });
  arr(12.0, 4.5, "2563EB", 4); arr(9.2, 2.5, "D97706", 4); arr(11.3, 2.6, "7C3AED", 4); arr(10.4, 3.9, "C2410C", 7);
  s.addShape(pres.ShapeType.ellipse, { x: bx - 0.15, y: by - 0.15, w: 0.3, h: 0.3, fill: { color: "FFFFFF" }, line: { color: "111827", width: 3 } });
  s.addText("the good direction", { x: 10.5, y: 3.75, w: 2.2, h: 0.4, fontSize: 15, bold: true, color: "C2410C", isTextBox: true, margin: 0 });
  take(s, "If we know where and which way, maybe we nudge the MLPs there, like steering,", "instead of training three models.");
  note(s, "Where does the new knowledge live? In the same place steering found: keep only the MLP changes and about 95% of the new facts survive, mostly in the first half of the layers. And the three language updates point in different directions; the average is the good one. So: if we know where and which way, maybe we probe the MLPs, find that direction and nudge there directly, like steering, instead of training three models.");
}

// ---------- summary
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Ongoing work and summary" });
  head(s, "What we achieved", "Retrain or teach?", "Teach.");
  const col = (x, ic, eyebrow, big, body) => {
    card(s, x, 2.35, 3.8, 3.4);
    s.addImage({ data: ic, x: x + 1.9 - 0.35, y: 2.55, w: 0.7, h: 0.7 });
    s.addText(eyebrow.toUpperCase(), { x: x + 0.2, y: 3.35, w: 3.4, h: 0.3, fontSize: 10.5, bold: true, charSpacing: 2, color: "6B7280", align: "center", isTextBox: true, margin: 0 });
    s.addText(big, { x: x + 0.2, y: 3.7, w: 3.4, h: 0.9, fontSize: 22, bold: true, fontFace: "Cambria", color: "C2410C", align: "center", valign: "top", isTextBox: true, margin: 0 });
    s.addText(body, { x: x + 0.25, y: 4.6, w: 3.3, h: 1.0, fontSize: 13, color: "374151", align: "center", valign: "top", isTextBox: true, margin: 0 });
  };
  col(M, ICON.lock, "A local medical model", "Steer it.", "One nudge at the MLPs. No training, nothing forgotten.");
  col(M + 4.07, ICON.bookD, "Genuinely new knowledge", "Newspaper, then average.", "2,500× less text than from scratch, and the forgetting cancels out.");
  col(M + 8.13, ICON.globe, "Every language", "Train once, mostly.", "~70% of what it learns carries over. Test in every language.");
  take(s, "Knowledge has an address and a direction.", "Next: find the direction without training at all.");
  note(s, "Back to the three reasons this matters. A local medical model: steer it. Genuinely new knowledge: hand it the newspaper, then average the language versions. Every language: train once, mostly, and test in every language. The thread: knowledge has an address and a direction. Next step: find the direction without training at all.");
}

// ---------- thanks
{
  const s = pres.addSlide({ masterName: "TITLE", sectionTitle: "Ongoing work and summary" });
  s.addText([{ text: "Thank you ", options: { bold: true } }, { text: "for your attention.", options: { italic: true, bold: false, color: "6B7280" } }], { placeholder: "title", fontSize: 54 });
  s.addText("Questions?", { placeholder: "subtitle" });
  s.addShape(pres.ShapeType.line, { x: M, y: 5.35, w: W, h: 0, line: { color: "E5E7EB", width: 1 } });
  const who = (x, w, name, role, nameSize) => {
    s.addText(name, { x, y: 5.55, w, h: 0.4, fontSize: nameSize || 15, bold: true, color: "111827", isTextBox: true, margin: 0 });
    s.addText(role, { x, y: 5.95, w, h: 0.8, fontSize: 11.5, color: "6B7280", valign: "top", isTextBox: true, margin: 0 });
  };
  who(M, 2.6, "Nitin Sharma", "Research Assistant · UKT Tübingen\nnitinsharma3150@gmail.com", 17);
  who(M + 2.9, 3.4, "Prof. Dr. Thomas Wolfers", "Carl Zeiss Professor for AI in Neural Systems Imaging, FSU Jena");
  who(M + 6.6, 3.4, "Dr. Çağatay Yıldız", "Cluster of Excellence ML for Science, University of Tübingen");
  s.addText("MHM Lab", { x: 10.6, y: 5.55, w: 2.0, h: 0.4, fontSize: 15, bold: true, color: "111827", align: "right", isTextBox: true, margin: 0 });
  s.addText("Mental Health Mapping", { x: 10.0, y: 5.95, w: 2.6, h: 0.4, fontSize: 11.5, color: "6B7280", align: "right", isTextBox: true, margin: 0 });
  note(s, "Thank you. Happy to take questions.");
}

  const out = process.argv[2];
  await pres.writeFile({ fileName: out });
  await applyTheme(out, THEME);
  console.log("wrote", out);
}
main();
