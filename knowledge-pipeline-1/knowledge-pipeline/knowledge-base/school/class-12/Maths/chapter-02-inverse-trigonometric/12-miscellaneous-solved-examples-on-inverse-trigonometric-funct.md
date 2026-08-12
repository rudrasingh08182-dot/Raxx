---
type: concept
title: Miscellaneous Solved Examples on Inverse Trigonometric Functions
category: school
subject: Maths
level: class-12
chapter: 2
chapter_name: INVERSE TRIGONOMETRIC
content_type: solved-example
tags:
- INVERSE TRIGONOMETRIC
- trigonometry
- inverse-trigonometric-functions
- class12
- solved-examples
- mathematics
- Maths
---

### Miscellaneous Examples

**Example 9:** Find the value of $\sin^{-1}(\sin \frac{3\pi}{5})$

**Solution:** We know that $\sin^{-1}(\sin x) = x$. Therefore, $\sin^{-1}(\sin \frac{3\pi}{5}) = \frac{3\pi}{5}$.
But $\frac{3\pi}{5} \notin [-\frac{\pi}{2}, \frac{\pi}{2}]$, which is the principal branch of $\sin^{-1} x$.
However, $\sin(\frac{3\pi}{5}) = \sin(\pi - \frac{3\pi}{5}) = \sin(\frac{2\pi}{5})$ and $\frac{2\pi}{5} \in [-\frac{\pi}{2}, \frac{\pi}{2}]$.
Therefore, $\sin^{-1}(\sin \frac{3\pi}{5}) = \sin^{-1}(\sin \frac{2\pi}{5}) = \frac{2\pi}{5}$.

**Example 10:** Show that $\sin^{-1} \frac{3}{5} + \sin^{-1} \frac{8}{17} = \cos^{-1} \frac{84}{85}$

**Solution:** Let $x = \sin^{-1} \frac{3}{5}$ and $y = \sin^{-1} \frac{8}{17}$.
Therefore, $\sin x = \frac{3}{5}$ and $\sin y = \frac{8}{17}$.
Now, $\cos x = \sqrt{1 - \sin^2 x} = \sqrt{1 - \frac{9}{25}} = \frac{4}{5}$ (Why?) and $\cos y = \sqrt{1 - \sin^2 y} = \sqrt{1 - \frac{64}{289}} = \frac{15}{17}$.
We have $\cos(x - y) = \cos x \cos y + \sin x \sin y = \frac{4}{5} \times \frac{15}{17} + \frac{3}{5} \times \frac{8}{17} = \frac{84}{85}$.
Therefore, $x - y = \cos^{-1} \frac{84}{85}$.
Hence, $\sin^{-1} \frac{3}{5} + \sin^{-1} \frac{8}{17} = \cos^{-1} \frac{84}{85}$.

**Example 11:** Show that $\sin^{-1} \frac{12}{13} + \cos^{-1} \frac{4}{5} + \tan^{-1} \frac{63}{16} = \pi$

**Solution:** Let $x = \sin^{-1} \frac{12}{13}$, $y = \cos^{-1} \frac{4}{5}$, $z = \tan^{-1} \frac{63}{16}$.
Then $\sin x = \frac{12}{13}$, $\cos y = \frac{4}{5}$, $\tan z = \frac{63}{16}$.
Therefore, $\cos x = \frac{5}{13}$, $\sin y = \frac{3}{5}$, $\tan x = \frac{12}{5}$, and $\tan y = \frac{3}{4}$.
We have $\tan(x + y) = \frac{\tan x + \tan y}{1 - \tan x \tan y} = \frac{\frac{12}{5} + \frac{3}{4}}{1 - \frac{12}{5} \times \frac{3}{4}} = \frac{63}{16} = -\tan z$.
Hence, $\tan(x + y) = -\tan z$, i.e., $\tan(x + y) = \tan(-z)$ or $\tan(x + y) = \tan(\pi - z)$.
Therefore, $x + y = -z$ or $x + y = \pi - z$.
Since $x, y$ and $z$ are positive, $x + y \neq -z$ (Why?).
Hence, $x + y + z = \pi$ or $\sin^{-1} \frac{12}{13} + \cos^{-1} \frac{4}{5} + \tan^{-1} \frac{63}{16} = \pi$.

**Example 12:** Simplify $\tan^{-1} \left[ \frac{a \cos x - b \sin x}{b \cos x + a \sin x} \right]$, if $\frac{a}{b} \tan x > -1$.

**Solution:** We have, $\tan^{-1} \left[ \frac{a \cos x - b \sin x}{b \cos x + a \sin x} \right] = \tan^{-1} \left[ \frac{\frac{a \cos x}{b \cos x} - \frac{b \sin x}{b \cos x}}{\frac{b \cos x}{b \cos x} + \frac{a \sin x}{b \cos x}} \right] = \tan^{-1} \left[ \frac{\frac{a}{b} - \tan x}{1 + \frac{a}{b} \tan x} \right] = \tan^{-1}(\frac{a}{b}) - \tan^{-1}(\tan x) = \tan^{-1}(\frac{a}{b}) - x$.
