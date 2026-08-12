---
type: concept
title: Independence of Events and Proof of Complementary Independence
category: school
subject: Maths
level: class-12
chapter: 13
chapter_name: PROBABILITY
content_type: solved-example
tags:
- PROBABILITY
- Maths
- class12
- mathematical-proof
- probability
- independent-events
- mutually-exclusive
---

and $G = \{HHT, HTH, THH, HTT, THT, TTH, TTT\}$
Also $E \cap F = \{HHH\}$, $E \cap G = \{TTT\}$, $F \cap G = \{HHT, HTH, THH\}$
Therefore $P(E) = \frac{1}{4}$, $P(F) = \frac{1}{2}$, $P(G) = \frac{7}{8}$
and $P(E \cap F) = \frac{1}{8}$, $P(E \cap G) = \frac{1}{8}$, $P(F \cap G) = \frac{3}{8}$
Also $P(E) \cdot P(F) = \frac{1}{4} \times \frac{1}{2} = \frac{1}{8}$, $P(E) \cdot P(G) = \frac{1}{4} \times \frac{7}{8} = \frac{7}{32}$
and $P(F) \cdot P(G) = \frac{1}{2} \times \frac{7}{8} = \frac{7}{16}$
Thus $P(E \cap F) = P(E) \cdot P(F)$
$P(E \cap G) \neq P(E) \cdot P(G)$
and $P(F \cap G) \neq P(F) \cdot P(G)$
Hence, the events (E and F) are independent, and the events (E and G) and (F and G) are dependent.

**Example 13** Prove that if E and F are independent events, then so are the events E and $F'$.

**Solution** Since E and F are independent, we have
$P(E \cap F) = P(E) \cdot P(F)$ ....(1)
From the venn diagram in Fig 13.3, it is clear that $E \cap F$ and $E \cap F'$ are mutually exclusive events and also $E = (E \cap F) \cup (E \cap F')$.
Therefore $P(E) = P(E \cap F) + P(E \cap F')$
or $P(E \cap F') = P(E) - P(E \cap F)$
$= P(E) - P(E) \cdot P(F)$ (by (1))
$= P(E) (1 - P(F))$
$= P(E) \cdot P(F')$
Hence, E and $F'$ are independent.

[Diagram Description: Venn diagram showing sets E and F, intersections $(E \cap F)$, $(E \cap F')$, $(E' \cap F)$, and $(E' \cap F')$ within sample space S]
Fig 13.3
