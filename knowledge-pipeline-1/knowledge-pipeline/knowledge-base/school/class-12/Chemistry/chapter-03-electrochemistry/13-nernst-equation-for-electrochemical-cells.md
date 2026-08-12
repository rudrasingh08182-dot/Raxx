---
type: concept
title: Nernst Equation for Electrochemical Cells
category: school
subject: Chemistry
level: class-12
chapter: 3
chapter_name: Electrochemistry
content_type: concept
tags:
- nernst-equation
- electrochemistry
- physical-chemistry
- redox-reactions
- Electrochemistry
- Chemistry
- cell-potential
- class12
---

In Daniell cell, the electrode potential for any given concentration of $Cu^{2+}$ and $Zn^{2+}$ ions, we write:

For Cathode:
$E_{Cu^{2+}/Cu} = E^{\ominus}_{Cu^{2+}/Cu} - \frac{RT}{2F} \ln \frac{1}{[Cu^{2+}_{(aq)}]}$
(3.9)

For Anode:
$E_{Zn^{2+}/Zn} = E^{\ominus}_{Zn^{2+}/Zn} - \frac{RT}{2F} \ln \frac{1}{[Zn^{2+}_{(aq)}]}$
(3.10)

The cell potential, $E_{(cell)} = E_{Cu^{2+}/Cu} - E_{Zn^{2+}/Zn}$
$= (E^{\ominus}_{Cu^{2+}/Cu} - \frac{RT}{2F} \ln \frac{1}{[Cu^{2+}_{(aq)}]}) - (E^{\ominus}_{Zn^{2+}/Zn} - \frac{RT}{2F} \ln \frac{1}{[Zn^{2+}_{(aq)}]})$
$= (E^{\ominus}_{Cu^{2+}/Cu} - E^{\ominus}_{Zn^{2+}/Zn}) - \frac{RT}{2F} (\ln \frac{1}{[Cu^{2+}_{(aq)}]} - \ln \frac{1}{[Zn^{2+}_{(aq)}]})$

$E_{(cell)} = E^{\ominus}_{(cell)} - \frac{RT}{2F} \ln \frac{[Zn^{2+}]}{[Cu^{2+}]}$
(3.11)

It can be seen that $E_{(cell)}$ depends on the concentration of both $Cu^{2+}$ and $Zn^{2+}$ ions. It increases with increase in the concentration of $Cu^{2+}$ ions and decrease in the concentration of $Zn^{2+}$ ions.

By converting the natural logarithm in Eq. (3.11) to the base 10 and substituting the values of $R$, $F$ and $T = 298 \text{ K}$, it reduces to:

$E_{(cell)} = E^{\ominus}_{(cell)} - \frac{0.059}{2} \log \frac{[Zn^{2+}]}{[Cu^{2+}]}$
(3.12)

We should use the same number of electrons ($n$) for both the electrodes and thus for the following cell:
$Ni(s) | Ni^{2+}(aq) || Ag^{+}(aq) | Ag(s)$

The cell reaction is $Ni(s) + 2Ag^{+}(aq) \rightarrow Ni^{2+}(aq) + 2Ag(s)$

The Nernst equation can be written as:
$E_{(cell)} = E^{\ominus}_{(cell)} - \frac{RT}{2F} \ln \frac{[Ni^{2+}]}{[Ag^{+}]^2}$

And for a general electrochemical reaction of the type:
$aA + bB \xrightarrow{ne^-} cC + dD$

Nernst equation can be written as:
$E_{(cell)} = E^{\ominus}_{(cell)} - \frac{RT}{nF} \ln Q$
$= E^{\ominus}_{(cell)} - \frac{RT}{nF} \ln \frac{[C]^c [D]^d}{[A]^a [B]^b}$
(3.13)
