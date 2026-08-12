---
type: concept
title: Derivation of the Sum of First n Terms of an Arithmetic Progression
category: school
subject: Maths
level: class-11
chapter: 5
chapter_name: ARITHMETIC PROGRESSIONS
content_type: concept
tags:
- series-and-sequences
- arithmetic-progression
- Maths
- sum-of-n-terms
- ARITHMETIC PROGRESSIONS
- class12
- algebra
- mathematics
---

We will now use the same technique to find the sum of the first $n$ terms of an AP: $a, a + d, a + 2d, \dots$

The $n$th term of this AP is $a + (n - 1)d$. Let $S$ denote the sum of the first $n$ terms of the AP. We have:
$S = a + (a + d) + (a + 2d) + \dots + [a + (n - 1)d]$ (1)

Rewriting the terms in reverse order, we have:
$S = [a + (n - 1)d] + [a + (n - 2)d] + \dots + (a + d) + a$ (2)

On adding (1) and (2), term-wise, we get:
$2S = [2a + (n - 1)d] + [2a + (n - 1)d] + \dots + [2a + (n - 1)d]$ ($n$ times)

Or, $2S = n[2a + (n - 1)d]$ (Since, there are $n$ terms)

Or, $S = \frac{n}{2} [2a + (n - 1)d]$

So, the sum of the first $n$ terms of an AP is given by:
$S = \frac{n}{2} [2a + (n - 1)d]$

We can also write this as $S = \frac{n}{2} [a + a + (n - 1)d]$

i.e., $S = \frac{n}{2} (a + a_n)$ (3)

Now, if there are only $n$ terms in an AP, then $a_n = l$, the last term.
From (3), we see that:
$S = \frac{n}{2} (a + l)$ (4)

This form of the result is useful when the first and the last terms of an AP are given and the common difference is not given.

Now we return to the question that was posed to us in the beginning. The amount of money (in Rs) in the money box of Shakila’s daughter on 1st, 2nd, 3rd, 4th birthday, ..., were 100, 150, 200, 250, ..., respectively.

This is an AP. We have to find the total money collected on her 21st birthday, i.e., the sum of the first 21 terms of this AP.
