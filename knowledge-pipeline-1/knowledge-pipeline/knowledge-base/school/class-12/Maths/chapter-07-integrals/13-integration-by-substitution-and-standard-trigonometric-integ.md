---
type: concept
title: Integration by Substitution and Standard Trigonometric Integrals
category: school
subject: Maths
level: class-12
chapter: 7
chapter_name: INTEGRALS
content_type: concept
tags:
- calculus
- mathematics
- class12
- integration
- trigonometric-integrals
- INTEGRALS
- substitution-method
- Maths
---

### INTEGRALS

(ii) Derivative of $x^2 + 1$ is $2x$. Thus, we use the substitution $x^2 + 1 = t$ so that $2x dx = dt$.
Therefore,
$\int 2x \sin(x^2 + 1) dx = \int \sin(t) dt = -\cos(t) + C = -\cos(x^2 + 1) + C$

(iii) Derivative of $\sqrt{x}$ is $\frac{1}{2\sqrt{x}}$. Thus, we use the substitution $\sqrt{x} = t$ so that $\frac{1}{2\sqrt{x}} dx = dt$, giving $dx = 2\sqrt{x} dt = 2t dt$.
Thus,
$\int \tan^4(\sqrt{x}) \sec^2(\sqrt{x}) \frac{dx}{\sqrt{x}} = \int \tan^4(t) \sec^2(t) 2t dt = 2 \int t \tan^4(t) \sec^2(t) dt$
Again, we make another substitution $\tan(t) = u$ so that $\sec^2(t) dt = du$.
Therefore,
$2 \int t \tan^4(t) \sec^2(t) dt = 2 \int u^4 du = 2 \frac{u^5}{5} + C = \frac{2}{5} \tan^5(t) + C$ (since $u = \tan(t)$)
$= \frac{2}{5} \tan^5(\sqrt{x}) + C$ (since $t = \sqrt{x}$)
Hence,
$\int \frac{\tan^4(\sqrt{x}) \sec^2(\sqrt{x})}{\sqrt{x}} dx = \frac{2}{5} \tan^5(\sqrt{x}) + C$
Alternatively, make the substitution $\tan(\sqrt{x}) = t$.

(iv) Derivative of $\tan^{-1}(x) = \frac{1}{1+x^2}$. Thus, we use the substitution $\tan^{-1}(x) = t$ so that $\frac{1}{1+x^2} dx = dt$.
Therefore,
$\int \frac{\sin(\tan^{-1}(x))}{1+x^2} dx = \int \sin(t) dt = -\cos(t) + C = -\cos(\tan^{-1}(x)) + C$

Now, we discuss some important integrals involving trigonometric functions and their standard integrals using substitution technique. These will be used later without reference.

(i) $\int \tan(x) dx = \log |\sec(x)| + C$
We have $\int \tan(x) dx = \int \frac{\sin(x)}{\cos(x)} dx$
Put $\cos(x) = t$ so that $\sin(x) dx = -dt$
Then $\int \tan(x) dx = -\int \frac{dt}{t} = -\log |t| + C = -\log |\cos(x)| + C$
or $\int \tan(x) dx = \log |\sec(x)| + C$

(ii) $\int \cot(x) dx = \log |\sin(x)| + C$
We have $\int \cot(x) dx = \int \frac{\cos(x)}{\sin(x)} dx$
Put $\sin(x) = t$ so that $\cos(x) dx = dt$
Then $\int \cot(x) dx = \int \frac{dt}{t} = \log |t| + C = \log |\sin(x)| + C$

(iii) $\int \sec(x) dx = \log |\sec(x) + \tan(x)| + C$
We have $\int \sec(x) dx = \int \frac{\sec(x)(\sec(x) + \tan(x))}{\sec(x) + \tan(x)} dx$
Put $\sec(x) + \tan(x) = t$ so that $\sec(x)(\tan(x) + \sec(x)) dx = dt$
Therefore, $\int \sec(x) dx = \int \frac{dt}{t} = \log |t| + C = \log |\sec(x) + \tan(x)| + C$

(iv) $\int \text{cosec}(x) dx = \log |\text{cosec}(x) - \cot(x)| + C$
We have $\int \text{cosec}(x) dx = \int \frac{\text{cosec}(x)(\text{cosec}(x) + \cot(x))}{(\text{cosec}(x) + \cot(x))} dx$
Put $\text{cosec}(x) + \cot(x) = t$ so that $-\text{cosec}(x)(\text{cosec}(x) + \cot(x)) dx = dt$
So $\int \text{cosec}(x) dx = -\int \frac{dt}{t} = -\log |t| + C = -\log |\text{cosec}(x) + \cot(x)| + C$
$= -\log |\frac{\text{cosec}^2(x) - \cot^2(x)}{\text{cosec}(x) - \cot(x)}| + C = \log |\text{cosec}(x) - \cot(x)| + C$

**Example 6** Find the following integrals:
(i) $\int \sin^3(x) \cos^2(x) dx$ (ii) $\int \frac{\sin(x)}{\sin(x+a)} dx$ (iii) $\int \frac{1}{1+\tan(x)} dx$
