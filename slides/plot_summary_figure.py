"""Re-plot of the multilingual paper's Fig. 1 without confidence intervals, in the deck's palette.
Values are the five-model means from the paper: (net new-fact gain, downstream change), in points vs. base.
Run: python3 plot_summary_figure.py  ->  summary_part2.png
"""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

plt.rcParams.update({"font.family": "DejaVu Sans", "font.size": 16})
fig, ax = plt.subplots(figsize=(10, 6.2), dpi=200)
fig.patch.set_facecolor("white"); ax.set_facecolor("white")
pts = {"base": (0, 0, "#111827", "o"), "EN": (3.4, -0.5, "#2563EB", "o"), "DE": (2.6, -1.3, "#D97706", "o"),
       "FR": (3.3, -1.2, "#7C3AED", "o"), "Mixture": (5.0, -0.3, "#374151", "s"), "Average": (5.1, 0.2, "#C2410C", "*")}
for k in ["EN", "DE", "FR"]:
    x, y, _, _ = pts[k]
    ax.plot([x, 5.1], [y, 0.2], ls="--", color="#C2410C", alpha=0.35, lw=1.6, zorder=1)
for k, (x, y, c, m) in pts.items():
    if k == "base":
        ax.scatter(x, y, s=180, facecolor="white", edgecolor="#111827", linewidth=2.5, zorder=3)
    elif k == "Average":
        ax.scatter(x, y, s=520, marker="*", color=c, zorder=4)
    else:
        ax.scatter(x, y, s=180, marker=m, color=c, zorder=3)
lab = {"base": (0.18, 0.08, "left", "#111827"), "EN": (0.0, 0.17, "center", "#2563EB"), "DE": (-0.17, -0.05, "right", "#D97706"),
       "FR": (0.17, -0.05, "left", "#7C3AED"), "Mixture": (0.0, -0.3, "center", "#374151"), "Average": (-0.15, 0.22, "right", "#C2410C")}
names = {"base": "base model", "EN": "English news", "DE": "German news", "FR": "French news",
         "Mixture": "Mix of all three", "Average": "Average of the three ★"}
for k, (dx, dy, ha, c) in lab.items():
    x, y, _, _ = pts[k]
    ax.text(x + dx, y + dy, names[k], ha=ha, va="center", color=c, fontsize=16, fontweight="bold" if k == "Average" else "normal")
ax.axhline(0, color="#E5E7EB", lw=1.5, zorder=0)
ax.set_xlim(-0.4, 6.0); ax.set_ylim(-1.75, 0.7)
ax.set_xlabel("new facts learned  →   (points vs. base model)", fontsize=17, labelpad=10)
ax.set_ylabel("general skills kept  →   (points vs. base model)", fontsize=17, labelpad=10)
ax.set_xticks([0, 1, 2, 3, 4, 5]); ax.set_yticks([-1.5, -1.0, -0.5, 0, 0.5])
ax.tick_params(colors="#6B7280", labelsize=14)
for s in ["top", "right"]: ax.spines[s].set_visible(False)
for s in ["left", "bottom"]: ax.spines[s].set_color("#9CA3AF")
ax.text(5.9, 0.62, "better ↗", ha="right", va="top", color="#9CA3AF", fontsize=14, style="italic")
fig.tight_layout(); fig.savefig("summary_part2.png", facecolor="white")
