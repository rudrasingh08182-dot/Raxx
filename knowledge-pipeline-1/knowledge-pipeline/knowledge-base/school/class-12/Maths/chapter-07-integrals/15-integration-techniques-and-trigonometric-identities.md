---
type: concept
title: Integration Techniques and Trigonometric Identities
category: school
subject: Maths
level: class-12
chapter: 7
chapter_name: INTEGRALS
content_type: concept
tags:
- calculus
- indefinite-integrals
- mathematics
- class12
- integration
- trigonometric-identities
- INTEGRALS
- Maths
---

### INTEGRALS

18. $\int \frac{e^{\tan^{-1}x}}{1+x^2} dx$ 
19. $\int \frac{e^{2x}-1}{e^{2x}+1} dx$ 
20. $\int \frac{e^{2x}-e^{-2x}}{e^{2x}+e^{-2x}} dx$ 
21. $\int \tan^2(2x-3) dx$ 
22. $\int \sec^2(7-4x) dx$ 
23. $\int \frac{\sin^{-1}x}{\sqrt{1-x^2}} dx$ 
24. $\int \frac{2\cos x - 3\sin x}{6\cos x + 4\sin x} dx$ 
25. $\int \frac{1}{\cos^2x(1-\tan x)^2} dx$ 
26. $\int \frac{\cos\sqrt{x}}{\sqrt{x}} dx$ 
27. $\int \sqrt{\sin 2x} \cos 2x dx$ 
28. $\int \frac{\cos x}{\sqrt{1+\sin x}} dx$ 
29. $\int \cot x \log(\sin x) dx$ 
30. $\int \frac{\sin x}{1+\cos x} dx$ 
31. $\int \frac{\sin x}{(1+\cos x)^2} dx$ 
32. $\int \frac{1}{1+\cot x} dx$ 
33. $\int \frac{1}{1-\tan x} dx$ 
34. $\int \frac{\sqrt{\tan x}}{\sin x \cos x} dx$ 
35. $\int \frac{(1+\log x)^2}{x} dx$ 
36. $\int \frac{(x+1)(x+\log x)^2}{x} dx$ 
37. $\int \frac{x^3 \sin(\tan^{-1}x^4)}{1+x^8} dx$

Choose the correct answer in Exercises 38 and 39.

38. $\int \frac{10^x + x^{10}}{10^x + x^{10}} dx$ equals
(A) $10^x - x^{10} + C$
(B) $10^x + x^{10} + C$
(C) $(10^x - x^{10})^{-1} + C$
(D) $\log(10^x + x^{10}) + C$

39. $\int \frac{dx}{\sin^2x \cos^2x}$ equals
(A) $\tan x + \cot x + C$
(B) $\tan x - \cot x + C$
(C) $\tan x \cot x + C$
(D) $\tan x - \cot^2 x + C$

### 7.3.2 Integration using trigonometric identities
When the integrand involves some trigonometric functions, we use some known identities to find the integral as illustrated through the following example.

**Example 7** Find (i) $\int \cos^2 x dx$ (ii) $\int \sin 2x \cos 3x dx$ (iii) $\int \sin^3 x dx$

**Solution**
(i) Recall the identity $\cos 2x = 2 \cos^2 x - 1$, which gives $\cos^2 x = \frac{1+\cos 2x}{2}$.
Therefore, $\int \cos^2 x dx = \int \frac{1+\cos 2x}{2} dx = \frac{1}{2} \int 1 dx + \frac{1}{2} \int \cos 2x dx = \frac{1}{2}x + \frac{\sin 2x}{4} + C$

(ii) Recall the identity $\sin x \cos y = \frac{1}{2} [\sin(x+y) + \sin(x-y)]$ (Why?)
Then $\int \sin 2x \cos 3x dx = \frac{1}{2} \int [\sin(5x) + \sin(-x)] dx = \frac{1}{2} \int \sin 5x dx - \frac{1}{2} \int \sin x dx = -\frac{\cos 5x}{10} + \frac{\cos x}{2} + C$

(iii) From the identity $\sin 3x = 3 \sin x - 4 \sin^3 x$, we find that $\sin^3 x = \frac{3\sin x - \sin 3x}{4}$.
Therefore, $\int \sin^3 x dx = \frac{3}{4} \int \sin x dx - \frac{1}{4} \int \sin 3x dx = -\frac{3}{4} \cos x + \frac{\cos 3x}{12} + C$

Alternatively, $\int \sin^3 x dx = \int \sin^2 x \sin x dx = \int (1 - \cos^2 x) \sin x dx$
Put $\cos x = t$ so that $-\sin x dx = dt$
Therefore, $\int \sin^3 x dx = -\int (1 - t^2) dt = -t + \frac{t^3}{3} + C = -\cos x + \frac{\cos^3 x}{3} + C$

**Remark** It can be shown using trigonometric identities that both answers are equivalent.
