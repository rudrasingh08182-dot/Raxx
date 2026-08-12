---
type: concept
title: Evaluation of Integrals of the Type 1/(ax^2 + bx + c)
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
- integration-techniques
- integrals
- INTEGRALS
- quadratic-forms
- Maths
---

### INTEGRALS

(10) For the evaluation of the integral of the type $\int \frac{dx}{ax^2 + bx + c}$, we proceed as in (9) and transform the integral into known standard forms.

Let us illustrate the above methods by some examples.

**Example 8:** Find the following integrals:
(i) $\int \frac{dx}{x^2 - 16}$ (ii) $\int \frac{dx}{\sqrt{x^2 - 1}}$

**Solution:**
(i) We have $\int \frac{dx}{x^2 - 16} = \int \frac{dx}{x^2 - 4^2} = \frac{1}{8} \log |\frac{x-4}{x+4}| + C$ [by 7.4 (1)]

(ii) Put $x - 1 = t$. Then $dx = dt$.
Therefore, $\int \frac{dx}{\sqrt{x^2 - 1}} = \int \frac{dt}{\sqrt{t^2 - 1}} = \log |t + \sqrt{t^2 - 1}| + C$ [by 7.4 (5)]
$= \log |(x - 1) + \sqrt{(x - 1)^2 - 1}| + C$

**Example 9:** Find the following integrals:
(i) $\int \frac{dx}{x^2 - 6x + 13}$ (ii) $\int \frac{dx}{3x^2 + 13x - 10}$ (iii) $\int \frac{dx}{\sqrt{5x^2 - 2}}$

**Solution:**
(i) We have $x^2 - 6x + 13 = x^2 - 6x + 3^2 - 3^2 + 13 = (x - 3)^2 + 4$
So, $\int \frac{dx}{x^2 - 6x + 13} = \int \frac{dx}{(x - 3)^2 + 2^2}$
Let $x - 3 = t$. Then $dx = dt$
Therefore, $\int \frac{dx}{x^2 - 6x + 13} = \int \frac{dt}{t^2 + 2^2} = \frac{1}{2} \tan^{-1} \frac{t}{2} + C$ [by 7.4 (3)]
$= \frac{1}{2} \tan^{-1} \frac{x - 3}{2} + C$

(ii) The given integral is of the form 7.4 (7). We write the denominator of the integrand,
$3x^2 + 13x - 10 = 3(x^2 + \frac{13}{3}x - \frac{10}{3})$
$= 3[(x + \frac{13}{6})^2 - (\frac{13}{6})^2 - \frac{10}{3}] = 3[(x + \frac{13}{6})^2 - \frac{169}{36} - \frac{120}{36}] = 3[(x + \frac{13}{6})^2 - \frac{289}{36}]$
(completing the square)
Thus $\int \frac{dx}{3x^2 + 13x - 10} = \frac{1}{3} \int \frac{dx}{(x + \frac{13}{6})^2 - (\frac{17}{6})^2}$
Put $t = x + \frac{13}{6}$. Then $dx = dt$.
Therefore, $\int \frac{dx}{3x^2 + 13x - 10} = \frac{1}{3} \int \frac{dt}{t^2 - (\frac{17}{6})^2}$
$= \frac{1}{3} \times \frac{1}{2 \times \frac{17}{6}} \log |\frac{t - \frac{17}{6}}{t + \frac{17}{6}}| + C$ [by 7.4 (i)]
$= \frac{1}{17} \log |\frac{x + \frac{13}{6} - \frac{17}{6}}{x + \frac{13}{6} + \frac{17}{6}}| + C$
$= \frac{1}{17} \log |\frac{x - \frac{4}{6}}{x + \frac{30}{6}}| + C$
$= \frac{1}{17} \log |\frac{x - \frac{2}{3}}{x + 5}| + C = \frac{1}{17} \log |\frac{3x - 2}{3(x + 5)}| + C$
$= \frac{1}{17} \log |\frac{3x - 2}{x + 5}| + C$, where $C = C_1 - \frac{1}{17} \log 3$
