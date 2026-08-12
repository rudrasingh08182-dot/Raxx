---
type: concept
title: Mathematical Analysis of Sound Beats and Pipe Resonance
category: school
subject: Physics
level: class-11
chapter: 14
chapter_name: WAVES
content_type: concept
tags:
- beat-frequency
- superposition-principle
- class12
- WAVES
- Physics
- harmonic-modes
- wave-mechanics
- pipe-resonance
---

WAVES 293

While tuning their instruments with each other, they go on tuning until their sensitive ears do not detect any beats. To see this mathematically, let us consider two harmonic sound waves of nearly equal angular frequency $\omega_1$ and $\omega_2$ and fix the location to be $x = 0$ for convenience. Eq. (14.2) with a suitable choice of phase ($\phi = \pi/2$ for each) and, assuming equal amplitudes, gives:

$s_1 = a \cos \omega_1 t$ and $s_2 = a \cos \omega_2 t$ (14.45)

Here we have replaced the symbol $y$ by $s$, since we are referring to longitudinal not transverse displacement. Let $\omega_1$ be the (slightly) greater of the two frequencies. The resultant displacement is, by the principle of superposition:

$s = s_1 + s_2 = a (\cos \omega_1 t + \cos \omega_2 t)$

Using the familiar trigonometric identity for $\cos A + \cos B$, we get:

$s = 2a \cos \left( \frac{\omega_1 - \omega_2}{2} t \right) \cos \left( \frac{\omega_1 + \omega_2}{2} t \right)$ (14.46)

Which may be written as:

$s = [2a \cos \omega_b t] \cos \omega_a t$ (14.47)

Where:

$\omega_b = \frac{\omega_1 - \omega_2}{2}$ and $\omega_a = \frac{\omega_1 + \omega_2}{2}$

Now if we assume $|\omega_1 - \omega_2| << \omega_1$, which means $\omega_a >> \omega_b$, we can interpret Eq. (14.47) as follows. The resultant wave is oscillating with the average angular frequency $\omega_a$; however its amplitude is not constant in time, unlike a pure harmonic wave. The amplitude is the largest when the term $\cos \omega_b t$ takes its limit $+1$ or $-1$. In other words, the intensity of the resultant wave waxes and wanes with a frequency which is $2\omega_b = \omega_1 - \omega_2$.

**Fig. 14.14** Normal modes of an air column open at one end and closed at the other end. Only the odd harmonics are seen to be possible. (seventh harmonic, ninth harmonic, eleventh harmonic).

Now if one end of the pipe is closed (Fig. 14.15), it follows from Eq. (14.15) that the fundamental frequency is:

$n_1 = \frac{v}{4L}$ (pipe closed at one end)

And only the odd numbered harmonics are present:

$n_3 = 3 \frac{v}{4L}$, $n_5 = 5 \frac{v}{4L}$, and so on. For $L = 30$ cm and $v = 330$ m s$^{-1}$, the fundamental frequency of the pipe closed at one end is 275 Hz and the source frequency corresponds to its fourth harmonic. Since this harmonic is not a possible mode, no resonance will be observed with the source, the moment one end is closed.
