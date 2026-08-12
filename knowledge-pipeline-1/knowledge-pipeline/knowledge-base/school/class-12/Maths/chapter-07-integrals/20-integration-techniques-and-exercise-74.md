---
type: concept
title: Integration Techniques and Exercise 7.4
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
- exercise-solutions
- INTEGRALS
- Maths
- partial-fractions
---

### INTEGRALS

Therefore, $\int \frac{x+2}{x^2+5x+4} dx = \int \frac{\frac{1}{2}(2x+5)-1}{x^2+5x+4} dx = \frac{1}{2} \int \frac{2x+5}{x^2+5x+4} dx - \int \frac{1}{x^2+5x+4} dx = \frac{1}{2} I_1 - I_2$ ... (1)

In $I_1$, put $5+4x+x^2 = t$, so that $(4+2x) dx = dt$. 
Therefore, $I_1 = \int \frac{dt}{t} = 2\sqrt{t} + C_1 = 2\sqrt{x^2+4x+5} + C_1$ ... (2)

Now consider $I_2 = \int \frac{dx}{x^2+4x+5} = \int \frac{dx}{(x+2)^2+1^2}$.
Put $x+2 = t$, so that $dx = dt$.
Therefore, $I_2 = \int \frac{dt}{t^2+1^2} = \tan^{-1}(t) + C_2 = \tan^{-1}(x+2) + C_2$ ... (3)

Substituting (2) and (3) in (1), we obtain $\int \frac{x+2}{x^2+5x+4} dx = \sqrt{x^2+4x+5} - \tan^{-1}(x+2) + C$, where $C = \frac{1}{2}C_1 - C_2$.

### EXERCISE 7.4
Integrate the functions in Exercises 1 to 23.
1. $\frac{3x^2}{x^6+1}$ 
2. $\frac{1}{\sqrt{1+4x^2}}$ 
3. $\frac{1}{\sqrt{(2-x)^2+1}}$ 
4. $\frac{1}{\sqrt{9-25x^2}}$ 
5. $\frac{3x}{1+2x^4}$ 
6. $\frac{x^2}{1-x^6}$ 
7. $\frac{x-1}{\sqrt{x^2-1}}$ 
8. $\frac{x^2}{\sqrt{x^6+a^6}}$ 
9. $\frac{\sec^2 x}{\sqrt{\tan^2 x+4}}$
10. $\frac{1}{\sqrt{x^2+2x+2}}$ 
11. $\frac{1}{\sqrt{9x^2+6x+5}}$ 
12. $\frac{1}{\sqrt{7-6x-x^2}}$ 
13. $\frac{1}{\sqrt{(x-1)(x-2)}}$ 
14. $\frac{1}{\sqrt{8+3x-x^2}}$ 
15. $\frac{1}{\sqrt{(x-a)(x-b)}}$ 
16. $\frac{4x+1}{\sqrt{2x^2+x-3}}$ 
17. $\frac{x+2}{\sqrt{x^2-1}}$ 
18. $\frac{5x-2}{1+2x+3x^2}$ 
19. $\frac{6x+7}{\sqrt{(x-5)(x-4)}}$ 
20. $\frac{x+2}{\sqrt{4x-x^2}}$ 
21. $\frac{x+2}{\sqrt{x^2+2x+3}}$ 
22. $\frac{x+3}{x^2-2x-5}$ 
23. $\frac{5x+3}{\sqrt{x^2+4x+10}}$

Choose the correct answer in Exercises 24 and 25.
24. $\int \frac{dx}{x^2+2x+2}$ equals
(A) $x \tan^{-1}(x+1) + C$ (B) $\tan^{-1}(x+1) + C$ (C) $(x+1) \tan^{-1} x + C$ (D) $\tan^{-1} x + C$

25. $\int \frac{dx}{\sqrt{9x-4x^2}}$ equals
(A) $\frac{1}{9} \sin^{-1} \frac{9x}{8} + C$ (B) $\frac{1}{2} \sin^{-1} \frac{8x}{9} + C$ (C) $\frac{1}{3} \sin^{-1} \frac{9x}{8} + C$ (D) $\frac{1}{2} \sin^{-1} \frac{9x}{8} + C$

### 7.5 Integration by Partial Fractions
Recall that a rational function is defined as the ratio of two polynomials in the form $\frac{P(x)}{Q(x)}$, where $P(x)$ and $Q(x)$ are polynomials in $x$ and $Q(x) \neq 0$. If the degree of $P(x)$ is less than the degree of $Q(x)$, then the rational function is called proper, otherwise, it is called improper. The improper rational functions can be reduced to the proper rational.
