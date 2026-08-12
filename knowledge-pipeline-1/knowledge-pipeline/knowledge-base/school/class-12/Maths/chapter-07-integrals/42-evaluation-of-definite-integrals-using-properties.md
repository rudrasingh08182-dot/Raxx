---
type: concept
title: Evaluation of Definite Integrals Using Properties
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
- integration-properties
- INTEGRALS
- definite-integrals
- Maths
---

### Example 34
Evaluate $\int_{0}^{\pi/2} \frac{\sin x}{\sin x + \cos x} dx$

**Solution:**
Let $I = \int_{0}^{\pi/2} \frac{\sin x}{\sin x + \cos x} dx$ ... (1)
Then, by property $P_4$:
$I = \int_{0}^{\pi/2} \frac{\sin(\pi/2 - x)}{\sin(\pi/2 - x) + \cos(\pi/2 - x)} dx = \int_{0}^{\pi/2} \frac{\cos x}{\cos x + \sin x} dx$ ... (2)
Adding (1) and (2), we get:
$2I = \int_{0}^{\pi/2} \frac{\sin x + \cos x}{\sin x + \cos x} dx = \int_{0}^{\pi/2} 1 dx = [x]_{0}^{\pi/2} = \frac{\pi}{2}$
Hence $I = \frac{\pi}{4}$.

### Example 35
Evaluate $\int_{\pi/6}^{\pi/3} \frac{1}{1 + \tan x} dx$

**Solution:**
Let $I = \int_{\pi/6}^{\pi/3} \frac{1}{1 + \tan x} dx = \int_{\pi/6}^{\pi/3} \frac{\cos x}{\cos x + \sin x} dx$ ... (1)
Then, by property $P_3$:
$I = \int_{\pi/6}^{\pi/3} \frac{\cos(\pi/6 + \pi/3 - x)}{\cos(\pi/6 + \pi/3 - x) + \sin(\pi/6 + \pi/3 - x)} dx = \int_{\pi/6}^{\pi/3} \frac{\sin x}{\sin x + \cos x} dx$ ... (2)
Adding (1) and (2), we get:
$2I = \int_{\pi/6}^{\pi/3} 1 dx = [x]_{\pi/6}^{\pi/3} = \frac{\pi}{3} - \frac{\pi}{6} = \frac{\pi}{6}$. Hence $I = \frac{\pi}{12}$.

### Example 36
Evaluate $\int_{0}^{\pi/2} \log \sin x dx$

**Solution:**
Let $I = \int_{0}^{\pi/2} \log \sin x dx$
Then, by property $P_4$:
$I = \int_{0}^{\pi/2} \log \sin(\pi/2 - x) dx = \int_{0}^{\pi/2} \log \cos x dx$
Adding the two values of $I$, we get:
$2I = \int_{0}^{\pi/2} (\log \sin x + \log \cos x) dx$
$= \int_{0}^{\pi/2} (\log(\sin x \cos x) + \log 2 - \log 2) dx$ (by adding and subtracting $\log 2$)
$= \int_{0}^{\pi/2} \log(\sin 2x) dx - \int_{0}^{\pi/2} \log 2 dx$ (Why?)
Put $2x = t$ in the first integral. Then $2dx = dt$, when $x = 0, t = 0$ and when $x = \pi/2, t = \pi$.
Therefore $2I = \frac{1}{2} \int_{0}^{\pi} \log \sin t dt - \frac{\pi}{2} \log 2$
$= \frac{2}{2} \int_{0}^{\pi/2} \log \sin t dt - \frac{\pi}{2} \log 2$ [by $P_6$ as $\sin(\pi - t) = \sin t$]
$= \int_{0}^{\pi/2} \log \sin x dx - \frac{\pi}{2} \log 2$ (by changing variable $t$ to $x$)
$= I - \frac{\pi}{2} \log 2$
Hence $\int_{0}^{\pi/2} \log \sin x dx = -\frac{\pi}{2} \log 2$.
