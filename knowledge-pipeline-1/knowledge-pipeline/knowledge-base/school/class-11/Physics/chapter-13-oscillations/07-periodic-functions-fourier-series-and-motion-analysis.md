---
type: concept
title: Periodic Functions, Fourier Series, and Motion Analysis
category: school
subject: Physics
level: class-11
chapter: 13
chapter_name: OSCILLATIONS
content_type: concept
tags:
- physics-oscillations
- Physics
- fourier-series
- OSCILLATIONS
- periodic-functions
- simple-harmonic-motion
- angular-frequency
- class12
---

The function $f(t)$ is then periodic and its period, $T$, is given by:

$\omega = \frac{2\pi}{T}$ (13.3b)

Thus, the function $f(t)$ is periodic with period $T$,
$f(t) = f(t+T)$

The same result is obviously correct if we consider a sine function, $f(t) = A \sin \omega t$. Further, a linear combination of sine and cosine functions like,

$f(t) = A \sin \omega t + B \cos \omega t$ (13.3c)

is also a periodic function with the same period $T$. Taking,
$A = D \cos \phi$ and $B = D \sin \phi$

Eq. (13.3c) can be written as,
$f(t) = D \sin (\omega t + \phi)$ (13.3d)

Here $D$ and $\phi$ are constants given by:
$D = \sqrt{A^2 + B^2}$ and $\tan \phi = \frac{B}{A}$

The great importance of periodic sine and cosine functions is due to a remarkable result proved by the French mathematician, Jean Baptiste Joseph Fourier (1768–1830): Any periodic function can be expressed as a superposition of sine and cosine functions of different time periods with suitable coefficients.

**Example 13.2** Which of the following functions of time represent (a) periodic and (b) non-periodic motion? Give the period for each case of periodic motion [$\omega$ is any positive constant].
(i) $\sin \omega t + \cos \omega t$
(ii) $\sin \omega t + \cos 2\omega t + \sin 4\omega t$
(iii) $e^{-\omega t}$
(iv) $\log (\omega t)$

**Answer**
(i) $\sin \omega t + \cos \omega t$ is a periodic function, it can also be written as $\sqrt{2} \sin (\omega t + \pi/4)$. Now $\sqrt{2} \sin (\omega t + \pi/4) = \sqrt{2} \sin (\omega t + \pi/4 + 2\pi) = \sqrt{2} \sin [\omega (t + 2\pi/\omega) + \pi/4]$. The periodic time of the function is $2\pi/\omega$.

(ii) This is an example of a periodic motion. It can be noted that each term represents a periodic function with a different angular frequency. Since period is the least interval of time after which a function repeats its value, $\sin \omega t$ has a period $T_0 = 2\pi/\omega$; $\cos 2\omega t$ has a period $\pi/\omega = T_0/2$; and $\sin 4\omega t$ has a period $2\pi/4\omega = T_0/4$. The period of the first term is a multiple of the periods of the last two terms. Therefore, the smallest interval of time after which the sum of the three terms repeats is $T_0$, and thus, the sum is a periodic function with a period $2\pi/\omega$.

(iii) The function $e^{-\omega t}$ is not periodic, it decreases monotonically with increasing time and tends to zero as $t \to \infty$ and thus, never repeats its value.
