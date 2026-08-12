---
type: concept
title: Application of Kirchhoff's Rules in Complex Resistor Networks
category: school
subject: Physics
level: class-12
chapter: 3
chapter_name: CURRENT ELECTRICITY
content_type: solved-example
tags:
- circuit-analysis
- class12
- equivalent-resistance
- physics-electricity
- Physics
- CURRENT ELECTRICITY
- network-symmetry
- kirchhoffs-rules
---

### Example 3.6

**Solution:** The network is not reducible to a simple series and parallel combinations of resistors. There is, however, a clear symmetry in the problem which we can exploit to obtain the equivalent resistance of the network.

The paths $AA'$, $AD$ and $AB$ are obviously symmetrically placed in the network. Thus, the current in each must be the same, say, $I$. Further, at the corners $A'$, $B$ and $D$, the incoming current $I$ must split equally into the two outgoing branches. In this manner, the current in all the 12 edges of the cube are easily written down in terms of $I$, using Kirchhoff’s first rule and the symmetry in the problem.

Next take a closed loop, say, $ABCC'EA$, and apply Kirchhoff’s second rule:

$-IR - (1/2)IR - IR + \varepsilon = 0$

where $R$ is the resistance of each edge and $\varepsilon$ the emf of battery. Thus,

$\varepsilon = \frac{5}{2} IR$

The equivalent resistance $R_{eq}$ of the network is

$R_{eq} = \frac{\varepsilon}{3I} = \frac{5}{6} R$

For $R = 1 \Omega$, $R_{eq} = (5/6) \Omega$ and for $\varepsilon = 10 \text{ V}$, the total current ($= 3I$) in the network is

$3I = 10 \text{ V} / (5/6) \Omega = 12 \text{ A}$, i.e., $I = 4 \text{ A}$

The current flowing in each edge can now be read off from the Fig. 3.16.

It should be noted that because of the symmetry of the network, the great power of Kirchhoff’s rules has not been very apparent in Example 3.5. In a general network, there will be no such simplification due to symmetry, and only by application of Kirchhoff’s rules to junctions and closed loops (as many as necessary to solve the unknowns in the network) can we handle the problem. This will be illustrated in Example 3.6.

**Example 3.6** Determine the current in each branch of the network shown in Fig. 3.17.

**FIGURE 3.17**
