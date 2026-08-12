---
type: concept
title: Integration of Rational Functions and Quadratic Expressions
category: school
subject: Maths
level: class-12
chapter: 7
chapter_name: INTEGRALS
content_type: solved-example
tags:
- calculus
- rational-functions
- class12
- mathematics
- integration
- quadratic-equations
- INTEGRALS
- Maths
---

### Integration of Rational Functions

(iii) We have
$$\int \frac{dx}{2x^2 - 5x + 2} = \int \frac{dx}{2(x^2 - \frac{5}{2}x + 1)} = \frac{1}{2} \int \frac{dx}{(x - \frac{5}{4})^2 - (\frac{3}{4})^2}$$
(completing the square)

Put $x - \frac{5}{4} = t$. Then $dx = dt$.
Therefore,
$$\int \frac{dx}{2x^2 - 5x + 2} = \frac{1}{2} \int \frac{dt}{t^2 - (\frac{3}{4})^2} = \frac{1}{2} \cdot \frac{1}{2(\frac{3}{4})} \log |\frac{t - \frac{3}{4}}{t + \frac{3}{4}}| + C = \frac{1}{3} \log |\frac{4x - 5 - 3}{4x - 5 + 3}| + C = \frac{1}{3} \log |\frac{4x - 8}{4x - 2}| + C$$

---

**Example 10:** Find the following integrals:
(i) $\int \frac{x + 2}{2x^2 + 6x + 5} dx$ 
(ii) $\int \frac{x + 3}{\sqrt{5 - 4x - x^2}} dx$

**Solution:**

(i) Using the formula 7.4 (9), we express
$x + 2 = A \frac{d}{dx} (2x^2 + 6x + 5) + B = A(4x + 6) + B$

Equating the coefficients of $x$ and the constant terms from both sides, we get
$4A = 1$ and $6A + B = 2$, or $A = \frac{1}{4}$ and $B = \frac{1}{2}$.

Therefore,
$$\int \frac{x + 2}{2x^2 + 6x + 5} dx = \frac{1}{4} \int \frac{4x + 6}{2x^2 + 6x + 5} dx + \frac{1}{2} \int \frac{dx}{2x^2 + 6x + 5} = \frac{1}{4} I_1 + \frac{1}{2} I_2 \text{ (say)} \dots (1)$$

In $I_1$, put $2x^2 + 6x + 5 = t$, so that $(4x + 6) dx = dt$
Therefore, $I_1 = \int \frac{dt}{t} = \log |t| + C = \log |2x^2 + 6x + 5| + C \dots (2)$

And $I_2 = \int \frac{dx}{2x^2 + 6x + 5} = \int \frac{dx}{2(x^2 + 3x + \frac{5}{2})} = \int \frac{dx}{2((x + \frac{3}{2})^2 + (\frac{1}{2})^2)}$

Put $x + \frac{3}{2} = t$, so that $dx = dt$, we get
$I_2 = \frac{1}{2} \int \frac{dt}{t^2 + (\frac{1}{2})^2} = \frac{1}{2} \cdot \frac{1}{1/2} \tan^{-1} (\frac{t}{1/2}) + C = \tan^{-1} (2t) + C = \tan^{-1} (2x + 3) + C \dots (3)$

Using (2) and (3) in (1), we get
$$\int \frac{x + 2}{2x^2 + 6x + 5} dx = \frac{1}{4} \log |2x^2 + 6x + 5| + \frac{1}{2} \tan^{-1} (2x + 3) + C$$
where $C = \frac{1}{4}C_1 + \frac{1}{2}C_2$.

(ii) This integral is of the form given in 7.4 (10). Let us express
$x + 3 = A \frac{d}{dx} (5 - 4x - x^2) + B = A(-4 - 2x) + B$

Equating the coefficients of $x$ and the constant terms from both sides, we get
$-2A = 1$ and $-4A + B = 3$, i.e., $A = -\frac{1}{2}$ and $B = 1$.
