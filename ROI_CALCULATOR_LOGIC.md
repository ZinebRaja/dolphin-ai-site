# ROI Calculator — Logic & Formulas

## Inputs

| Input | What it represents |
|---|---|
| Annual addressable spend | Total $ value of spend the client wants to classify |
| Number of suppliers | How many unique supplier records they have |
| Expected savings rate | What % of spend they expect to recover through better sourcing (industry avg: 2–4%) |
| Hours on data cleaning / month | How many hours their team spends manually cleaning, mapping, or fixing spend data |
| Labor cost per hour | Fully-loaded hourly cost of the people doing that work |
| Do you classify spend today? | Whether they already have a classification process |
| Classification depth | How many levels their taxonomy goes (Level 1–4) |
| Current accuracy | How accurate their existing classification is (%) |
| Supplier normalization in place? | Whether they already have a process to deduplicate supplier names |

---

## Calculation 1 — Labor Savings

> How much time (= money) Dolphin AI saves the team each year.

```
Annual labor cost = monthly hours × hourly rate × 12
Labor savings     = annual labor cost × labor reduction rate
```

**Labor reduction rate** depends on their current situation:

| Current state | Reduction rate | Reasoning |
|---|---|---|
| No classification at all | **80%** | Starting from scratch — Dolphin AI handles almost everything |
| Classifying at Level 1 only | **65%** | Basic classification exists, still a lot of manual work |
| Classifying at Level 1–2 | **55%** | Partial process, Dolphin AI accelerates and deepens it |
| Classifying at Level 3–4 | **40%** | More mature process, Dolphin AI improves accuracy and removes validation effort |

---

## Calculation 2 — Spend Savings

> How much spend savings become visible once data is properly classified.

```
Effective savings rate = base savings rate + accuracy bonus
Spend savings         = annual spend × effective savings rate
```

**Accuracy bonus** applies when the client has no classification or low accuracy:

```
If no classification:  +1.5% bonus on top of their savings rate input
If has classification: bonus = max(0, (80 - current accuracy) / 80 × 1.5%)
```

*Rationale: poor classification means hidden tail spend, off-contract purchasing, and missed consolidation opportunities. Better visibility unlocks more savings.*

---

## Calculation 3 — Supplier Normalization Value

> The value of having clean, deduplicated supplier records.

```
If NO normalization in place:   value = suppliers × $90 per supplier
If normalization already exists: value = suppliers × $35 per supplier
```

*Rationale: duplicate supplier records cause overpayment, missed volume discounts, and poor contract coverage tracking. The $90/$35 per supplier estimates the cost of manual deduplication work avoided plus contract compliance improvement.*

---

## Total Benefit (Year 1)

```
Total benefit = Labor savings + Spend savings + Supplier normalization value
```

---

## Dolphin AI Annual Fee (auto-selected by spend tier)

| Spend tier | Annual spend | Monthly price | Annual fee |
|---|---|---|---|
| Coastal | < $200M | $699 | $8,388 |
| Reef | $200M – $400M | $999 | $11,988 |
| Navigator | $400M – $750M | $1,399 | $16,788 |
| Horizon | $750M – $1.5B | $1,699 | $20,388 |
| Apex | $1.5B+ | Custom | $30,000 est. |

---

## ROI & Payback

```
Net benefit     = Total benefit − Annual fee
ROI (Year 1)    = (Net benefit / Annual fee) × 100
Payback period  = (Annual fee / Total benefit) × 365  → displayed in days or months
```

ROI is capped at **>9,999%** in the display to avoid unrealistic-looking numbers for very large organizations.

---

## Example (default values)

| Input | Value |
|---|---|
| Annual spend | $200M |
| Suppliers | 500 |
| Monthly hours | 160h |
| Hourly rate | $75 |
| Savings rate | 3.5% |
| Classification | No |
| Normalization | No |

| Output | Value | Formula |
|---|---|---|
| Labor savings | $115,200 | 160 × $75 × 12 × 80% |
| Spend savings | $10,000,000 | $200M × (3.5% + 1.5%) |
| Normalization value | $45,000 | 500 × $90 |
| **Total benefit** | **$10,160,200** | Sum |
| Dolphin AI fee | $8,388 / yr | Coastal plan |
| **Net benefit** | **$10,151,812** | Benefit − Fee |
| **ROI** | **>9,999%** | Net / Fee × 100 |
| **Payback** | **< 1 day** | Fee / Benefit × 365 |
