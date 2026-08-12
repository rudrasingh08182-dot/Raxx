---
type: concept
title: Series and Parallel Combination of Cells
category: school
subject: Physics
level: class-12
chapter: 3
chapter_name: CURRENT ELECTRICITY
content_type: concept
tags:
- class12
- electric-circuits
- internal-resistance
- physics
- emf
- Physics
- series-parallel-combination
- CURRENT ELECTRICITY
---

Eq. (3.42) would change to $V_{BC} = -\epsilon_2 - Ir_2$ and we will get
$\epsilon_{eq} = \epsilon_1 - \epsilon_2$ ($\epsilon_1 > \epsilon_2$) (3.47)

The rule for series combination clearly can be extended to any number of cells:
(i) The equivalent emf of a series combination of n cells is just the sum of their individual emf’s, and
(ii) The equivalent internal resistance of a series combination of n cells is just the sum of their internal resistances.

This is so, when the current leaves each cell from the positive electrode. If in the combination, the current leaves any cell from the negative electrode, the emf of the cell enters the expression for $\epsilon_{eq}$ with a negative sign, as in Eq. (3.47).

Next, consider a parallel combination of the cells (Fig. 3.14). $I_1$ and $I_2$ are the currents leaving the positive electrodes of the cells. At the point $B_1$, $I_1$ and $I_2$ flow in whereas the current $I$ flows out. Since as much charge flows in as out, we have
$I = I_1 + I_2$ (3.48)

Let $V(B_1)$ and $V(B_2)$ be the potentials at $B_1$ and $B_2$, respectively. Then, considering the first cell, the potential difference across its terminals is $V(B_1) - V(B_2)$. Hence, from Eq. (3.38)
$V(B_1) - V(B_2) = \epsilon_1 - I_1r_1$ (3.49)

Points $B_1$ and $B_2$ are connected exactly similarly to the second cell. Hence considering the second cell, we also have
$V(B_1) - V(B_2) = \epsilon_2 - I_2r_2$ (3.50)

Combining the last three equations
$I = I_1 + I_2 = \frac{\epsilon_1 - V}{r_1} + \frac{\epsilon_2 - V}{r_2} = \left( \frac{\epsilon_1}{r_1} + \frac{\epsilon_2}{r_2} \right) - V \left( \frac{1}{r_1} + \frac{1}{r_2} \right)$ (3.51)

Hence, $V$ is given by,
$V = \frac{\epsilon_1 r_2 + \epsilon_2 r_1}{r_1 + r_2} - I \frac{r_1 r_2}{r_1 + r_2}$ (3.52)

If we want to replace the combination by a single cell, between $B_1$ and $B_2$, of emf $\epsilon_{eq}$ and internal resistance $r_{eq}$, we would have
$V = \epsilon_{eq} - I r_{eq}$ (3.53)

The last two equations should be the same and hence
$\epsilon_{eq} = \frac{\epsilon_1 r_2 + \epsilon_2 r_1}{r_1 + r_2}$ (3.54)
$r_{eq} = \frac{r_1 r_2}{r_1 + r_2}$ (3.55)

We can put these equations in a simpler way,

**FIGURE 3.14** Two cells in parallel. For connections across A and C, the combination can be replaced by one cell of emf $\epsilon_{eq}$ and internal resistances $r_{eq}$ whose values are given in Eqs. (3.54) and (3.55).
