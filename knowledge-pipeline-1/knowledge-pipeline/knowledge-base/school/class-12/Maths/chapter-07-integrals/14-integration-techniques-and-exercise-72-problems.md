---
type: concept
title: Integration Techniques and Exercise 7.2 Problems
category: school
subject: Maths
level: class-12
chapter: 7
chapter_name: INTEGRALS
content_type: solved-example
tags:
- calculus
- mathematics
- class12
- integration
- trigonometric-integrals
- exercise-7.2
- INTEGRALS
- Maths
---

### Solution

(i) We have
$\int \sin^3 x \cos^2 x dx = \int \sin^2 x \cos^2 x (\sin x) dx$
$= \int (1 - \cos^2 x) \cos^2 x (\sin x) dx$
Put $t = \cos x$ so that $dt = -\sin x dx$
Therefore,
$\int \sin^3 x \cos^2 x dx = -\int (1 - t^2) t^2 dt$
$= -\int (t^2 - t^4) dt = -\left( \frac{t^3}{3} - \frac{t^5}{5} \right) + C$
$= -\frac{1}{3} \cos^3 x + \frac{1}{5} \cos^5 x + C$

(ii) Put $x + a = t$. Then $dx = dt$. Therefore
$\int \frac{\sin x}{\sin(x + a)} dx = \int \frac{\sin(t - a)}{\sin t} dt$
$= \int \frac{\sin t \cos a - \cos t \sin a}{\sin t} dt$
$= \int \cos a dt - \int \sin a \cot t dt$
$= [(\cos a) t - (\sin a) \log |\sin t|] + C_1$
$= [(\cos a) (x + a) - (\sin a) \log |\sin(x + a)|] + C_1$
$= x \cos a + a \cos a - \sin a \log |\sin(x + a)| + C_1$
Hence,
$\int \frac{\sin x}{\sin(x + a)} dx = x \cos a - \sin a \log |\sin(x + a)| + C$,
where, $C = C_1 + a \cos a$, is another arbitrary constant.

(iii)
$\int \frac{1}{1 + \tan x} dx = \int \frac{\cos x}{\cos x + \sin x} dx$
$= \frac{1}{2} \int \frac{(\cos x + \sin x) + (\cos x - \sin x)}{\cos x + \sin x} dx$
$= \frac{1}{2} \int 1 dx + \frac{1}{2} \int \frac{\cos x - \sin x}{\cos x + \sin x} dx \dots (1)$
Now, consider $I = \int \frac{\cos x - \sin x}{\cos x + \sin x} dx$
Put $\cos x + \sin x = t$ so that $(\cos x - \sin x) dx = dt$
Therefore $I = \int \frac{dt}{t} = \log |t| + C_1 = \log |\cos x + \sin x| + C_1$
Putting it in (1), we get
$\int \frac{1}{1 + \tan x} dx = \frac{1}{2} x + \frac{1}{2} \log |\cos x + \sin x| + C$

### EXERCISE 7.2
Integrate the functions in Exercises 1 to 37:
1. $\frac{2x}{1 + x^2}$
2. $\frac{(\log x)^2}{x}$
3. $\frac{1}{x + x \log x}$
4. $\sin x \sin(\cos x)$
5. $\sin(ax + b) \cos(ax + b)$
6. $\sqrt{ax + b}$
7. $x \sqrt{x + 2}$
8. $x \sqrt{1 + 2x^2}$
9. $(4x + 2) \sqrt{x^2 + x + 1}$
10. $\frac{1}{x - \sqrt{x}}$
11. $\frac{x}{\sqrt{x + 4}}$, $x > 0$
12. $(x^3 - 1)^{1/3} x^5$
13. $\frac{x^2}{(2 + 3x^3)^3}$
14. $\frac{1}{x(\log x)^m}$, $x > 0, m \neq 1$
15. $\frac{x}{9 - 4x^2}$
16. $e^{3x + 2}$
17. $\frac{x}{e^{x^2}}$
