---
type: concept
title: Kirchhoff's Rules Application and Wheatstone Bridge
category: school
subject: Physics
level: class-12
chapter: 3
chapter_name: CURRENT ELECTRICITY
content_type: solved-example
tags:
- circuit-analysis
- class12
- electrical-circuits
- physics
- Physics
- CURRENT ELECTRICITY
- wheatstone-bridge
- kirchhoffs-rules
---

### EXAMPLE 3.6

**Solution:** Each branch of the network is assigned an unknown current to be determined by the application of Kirchhoff’s rules. To reduce the number of unknowns at the outset, the first rule of Kirchhoff is used at every junction to assign the unknown current in each branch. We then have three unknowns $I_1$, $I_2$ and $I_3$ which can be found by applying the second rule of Kirchhoff to three different closed loops. 

Kirchhoff’s second rule for the closed loop ADCA gives,
$10 - 4(I_1 - I_2) + 2(I_2 + I_3 - I_1) - I_1 = 0$ [3.61(a)]
that is, $7I_1 - 6I_2 - 2I_3 = 10$

For the closed loop ABCA, we get
$10 - 4I_2 - 2(I_2 + I_3) - I_1 = 0$
that is, $I_1 + 6I_2 + 2I_3 = 10$ [3.61(b)]

For the closed loop BCDEB, we get
$5 - 2(I_2 + I_3) - 2(I_2 + I_3 - I_1) = 0$
that is, $2I_1 - 4I_2 - 4I_3 = -5$ [3.61(c)]

Equations (3.61 a, b, c) are three simultaneous equations in three unknowns. These can be solved by the usual method to give:
$I_1 = 2.5 A$, $I_2 = 5/8 A$, $I_3 = 7/8 A$

The currents in the various branches of the network are:
AB : $5/8 A$, CA : $12/2 A$, DEB : $7/8 A$
AD : $7/8 A$, CD : $0 A$, BC : $12/2 A$

It is easily verified that Kirchhoff’s second rule applied to the remaining closed loops does not provide any additional independent equation, that is, the above values of currents satisfy the second rule for every closed loop of the network. For example, the total voltage drop over the closed loop BADEB is equal to zero, as required by Kirchhoff’s second rule.

### 3.13 WHEATSTONE BRIDGE

As an application of Kirchhoff’s rules consider the circuit shown in Fig. 3.18, which is called the Wheatstone bridge. The bridge has four resistors $R_1$, $R_2$, $R_3$ and $R_4$. Across one pair of diagonally opposite points (A and C in the figure) a source is connected. This (i.e., AC) is called the battery arm. Between the other two vertices, B and D, a galvanometer G (which is a device to detect currents) is connected. This line, shown as BD in the figure, is called the galvanometer arm. For simplicity, we assume that the cell has no internal resistance. In general there will be currents flowing across all the resistors as well as a current $I_g$ through G.
