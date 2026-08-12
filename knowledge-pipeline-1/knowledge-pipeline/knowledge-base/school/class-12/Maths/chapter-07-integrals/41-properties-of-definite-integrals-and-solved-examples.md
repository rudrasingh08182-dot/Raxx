---
type: concept
title: Properties of Definite Integrals and Solved Examples
category: school
subject: Maths
level: class-12
chapter: 7
chapter_name: INTEGRALS
content_type: concept
tags:
- definite-integrals
- calculus
- mathematics
- class12
- INTEGRALS
- even-odd-functions
- Maths
---

### Integrals

Therefore, $\int_{-a}^{a} f(x) dx = \int_{0}^{a} f(x) dx + \int_{-a}^{0} f(x) dx$. Let $t = -x$ in the second integral on the right hand side. When $x = -a, t = a$ and when $x = 0, t = 0$. Also $dx = -dt$.

$\int_{-a}^{0} f(x) dx = \int_{a}^{0} f(-t) (-dt) = \int_{0}^{a} f(-t) dt = \int_{0}^{a} f(-x) dx$

Therefore, $\int_{-a}^{a} f(x) dx = \int_{0}^{a} f(x) dx + \int_{0}^{a} f(-x) dx = \int_{0}^{a} [f(x) + f(-x)] dx$ ... (1)

(i) Now, if $f$ is an even function, then $f(-x) = f(x)$ and so (1) becomes
$\int_{-a}^{a} f(x) dx = \int_{0}^{a} [f(x) + f(x)] dx = 2 \int_{0}^{a} f(x) dx$

(ii) If $f$ is an odd function, then $f(-x) = -f(x)$ and so (1) becomes
$\int_{-a}^{a} f(x) dx = \int_{0}^{a} [f(x) - f(x)] dx = 0$

**Example 30:** Evaluate $\int_{-1}^{2} |x^3 - x| dx$

**Solution:** We note that $x^3 - x \geq 0$ on $[-1, 0]$ and $x^3 - x \leq 0$ on $[0, 1]$ and that $x^3 - x \geq 0$ on $[1, 2]$. So by $P_2$ we write:
$\int_{-1}^{2} |x^3 - x| dx = \int_{-1}^{0} (x^3 - x) dx + \int_{0}^{1} -(x^3 - x) dx + \int_{1}^{2} (x^3 - x) dx$
$= \int_{-1}^{0} (x^3 - x) dx + \int_{0}^{1} (x - x^3) dx + \int_{1}^{2} (x^3 - x) dx$
$= \left[ \frac{x^4}{4} - \frac{x^2}{2} \right]_{-1}^{0} + \left[ \frac{x^2}{2} - \frac{x^4}{4} \right]_{0}^{1} + \left[ \frac{x^4}{4} - \frac{x^2}{2} \right]_{1}^{2}$
$= (0 - (\frac{1}{4} - \frac{1}{2})) + ((\frac{1}{2} - \frac{1}{4}) - 0) + ((\frac{16}{4} - \frac{4}{2}) - (\frac{1}{4} - \frac{1}{2}))$
$= \frac{1}{4} + \frac{1}{4} + (2 - (-\frac{1}{4})) = \frac{1}{2} + 2 + \frac{1}{4} = \frac{11}{4}$

**Example 31:** Evaluate $\int_{-\pi/4}^{\pi/4} \sin^2 x dx$

**Solution:** We observe that $\sin^2 x$ is an even function. Therefore, by $P_7$ (i), we get:
$\int_{-\pi/4}^{\pi/4} \sin^2 x dx = 2 \int_{0}^{\pi/4} \sin^2 x dx$
$= 2 \int_{0}^{\pi/4} \frac{1 - \cos 2x}{2} dx = \int_{0}^{\pi/4} (1 - \cos 2x) dx$
$= \left[ x - \frac{\sin 2x}{2} \right]_{0}^{\pi/4} = (\frac{\pi}{4} - \frac{\sin(\pi/2)}{2}) - (0 - 0) = \frac{\pi}{4} - \frac{1}{2}$

**Example 32:** Evaluate $\int_{0}^{\pi} \frac{x \sin x}{1 + \cos^2 x} dx$

**Solution:** Let $I = \int_{0}^{\pi} \frac{x \sin x}{1 + \cos^2 x} dx$. Then, by $P_4$, we have:
$I = \int_{0}^{\pi} \frac{(\pi - x) \sin(\pi - x)}{1 + \cos^2(\pi - x)} dx = \int_{0}^{\pi} \frac{(\pi - x) \sin x}{1 + \cos^2 x} dx = \pi \int_{0}^{\pi} \frac{\sin x}{1 + \cos^2 x} dx - I$
$2I = \pi \int_{0}^{\pi} \frac{\sin x}{1 + \cos^2 x} dx$ or $I = \frac{\pi}{2} \int_{0}^{\pi} \frac{\sin x}{1 + \cos^2 x} dx$
Put $\cos x = t$ so that $-\sin x dx = dt$. When $x = 0, t = 1$ and when $x = \pi, t = -1$.
Therefore, (by $P_1$) we get:
$I = \frac{\pi}{2} \int_{1}^{-1} \frac{-dt}{1 + t^2} = \frac{\pi}{2} \int_{-1}^{1} \frac{dt}{1 + t^2} = \pi \int_{0}^{1} \frac{dt}{1 + t^2}$ (by $P_7$, since $\frac{1}{1+t^2}$ is even function)
$= \pi [\tan^{-1} t]_{0}^{1} = \pi (\tan^{-1} 1 - \tan^{-1} 0) = \pi (\frac{\pi}{4}) = \frac{\pi^2}{4}$

**Example 33:** Evaluate $\int_{-1}^{1} \sin^5 x \cos^4 x dx$

**Solution:** Let $I = \int_{-1}^{1} \sin^5 x \cos^4 x dx$. Let $f(x) = \sin^5 x \cos^4 x$. Then
$f(-x) = \sin^5(-x) \cos^4(-x) = -\sin^5 x \cos^4 x = -f(x)$, i.e., $f$ is an odd function.
Therefore, by $P_7$ (ii), $I = 0$.
