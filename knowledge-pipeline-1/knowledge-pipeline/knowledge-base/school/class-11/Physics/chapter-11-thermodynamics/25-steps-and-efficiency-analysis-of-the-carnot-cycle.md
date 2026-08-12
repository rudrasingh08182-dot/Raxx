---
type: concept
title: Steps and Efficiency Analysis of the Carnot Cycle
category: school
subject: Physics
level: class-11
chapter: 11
chapter_name: THERMODYNAMICS
content_type: concept
tags:
- class12
- adiabatic-process
- isothermal-process
- efficiency
- thermodynamics
- heat-engine
- THERMODYNAMICS
- Physics
- carnot-cycle
---

The Carnot cycle is shown in Fig. 11.9. We have taken the working substance of the Carnot engine to be an ideal gas.

(a) Step 1 → 2: Isothermal expansion of the gas taking its state from $(P_1, V_1, T_1)$ to $(P_2, V_2, T_1)$. The heat absorbed by the gas ($Q_1$) from the reservoir at temperature $T_1$ is given by Eq. (11.12). This is also the work done ($W_{1→2}$) by the gas on the environment:
$W_{1→2} = Q_1 = \mu R T_1 \ln \left( \frac{V_2}{V_1} \right)$ (11.18)

(b) Step 2 → 3: Adiabatic expansion of the gas from $(P_2, V_2, T_1)$ to $(P_3, V_3, T_2)$. Work done by the gas, using Eq. (11.16), is:
$W_{2→3} = \frac{\mu R (T_1 - T_2)}{\gamma - 1}$ (11.19)

(c) Step 3 → 4: Isothermal compression of the gas from $(P_3, V_3, T_2)$ to $(P_4, V_4, T_2)$. Heat released ($Q_2$) by the gas to the reservoir at temperature $T_2$ is given by Eq. (11.12). This is also the work done ($W_{3→4}$) on the gas by the environment:
$W_{3→4} = Q_2 = \mu R T_2 \ln \left( \frac{V_3}{V_4} \right)$ (11.20)

(d) Step 4 → 1: Adiabatic compression of the gas from $(P_4, V_4, T_2)$ to $(P_1, V_1, T_1)$. Work done on the gas, using Eq. (11.16), is:
$W_{4→1} = \frac{\mu R (T_1 - T_2)}{\gamma - 1}$ (11.21)

From Eqs. (11.18) to (11.21), total work done by the gas in one complete cycle is:
$W = W_{1→2} + W_{2→3} - W_{3→4} - W_{4→1}$
$W = \mu R T_1 \ln \left( \frac{V_2}{V_1} \right) - \mu R T_2 \ln \left( \frac{V_3}{V_4} \right)$ (11.22)

The efficiency $\eta$ of the Carnot engine is:
$\eta = \frac{W}{Q_1} = 1 - \frac{Q_2}{Q_1} = 1 - \frac{T_2 \ln(V_3/V_4)}{T_1 \ln(V_2/V_1)}$ (11.23)

Now since step 2 → 3 is an adiabatic process:
$T_1 V_2^{\gamma-1} = T_2 V_3^{\gamma-1}$
i.e., $\frac{V_3}{V_2} = \left( \frac{T_1}{T_2} \right)^{1/(\gamma-1)}$ (11.24)

Similarly, since step 4 → 1 is an adiabatic process:
$T_2 V_4^{\gamma-1} = T_1 V_1^{\gamma-1}$
i.e., $\frac{V_4}{V_1} = \left( \frac{T_1}{T_2} \right)^{1/(\gamma-1)}$ (11.25)

From Eqs. (11.24) and (11.25):
$\frac{V_3}{V_4} = \frac{V_2}{V_1}$ (11.26)

Using Eq. (11.26) in Eq. (11.23), we get:
$\eta = 1 - \frac{T_2}{T_1}$ (Carnot engine) (11.27)

We have already seen that a Carnot engine is a reversible engine. Indeed it is the only reversible engine possible that works between two reservoirs at different temperatures. Each step of the Carnot cycle given in Fig. 11.9 can be reversed.
