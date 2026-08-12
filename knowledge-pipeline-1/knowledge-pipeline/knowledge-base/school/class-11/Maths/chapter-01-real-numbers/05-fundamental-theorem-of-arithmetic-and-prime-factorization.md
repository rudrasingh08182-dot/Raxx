---
type: concept
title: Fundamental Theorem of Arithmetic and Prime Factorization
category: school
subject: Maths
level: class-11
chapter: 1
chapter_name: REAL NUMBERS
content_type: concept
tags:
- REAL NUMBERS
- Maths
- hcf-and-lcm
- prime-factorization
- class12
- fundamental-theorem-of-arithmetic
- number-theory
---

In general, given a composite number $x$, we factorise it as $x = p_1 p_2 \dots p_n$, where $p_1, p_2, \dots, p_n$ are primes and written in ascending order, i.e., $p_1 \le p_2 \le \dots \le p_n$. If we combine the same primes, we will get powers of primes. For example, $32760 = 2 \times 2 \times 2 \times 3 \times 3 \times 5 \times 7 \times 13 = 2^3 \times 3^2 \times 5 \times 7 \times 13$. Once we have decided that the order will be ascending, then the way the number is factorised is unique. The Fundamental Theorem of Arithmetic has many applications, both within mathematics and in other fields. Let us look at some examples.

**Example 1:** Consider the numbers $4^n$, where $n$ is a natural number. Check whether there is any value of $n$ for which $4^n$ ends with the digit zero.

**Solution:** If the number $4^n$, for any $n$, were to end with the digit zero, then it would be divisible by 5. That is, the prime factorisation of $4^n$ would contain the prime 5. This is not possible because $4^n = (2^2)^n = 2^{2n}$; so the only prime in the factorisation of $4^n$ is 2. So, the uniqueness of the Fundamental Theorem of Arithmetic guarantees that there are no other primes in the factorisation of $4^n$. So, there is no natural number $n$ for which $4^n$ ends with the digit zero.

You have already learnt how to find the HCF and LCM of two positive integers using the Fundamental Theorem of Arithmetic in earlier classes, without realising it! This method is also called the prime factorisation method. Let us recall this method through an example.

**Example 2:** Find the LCM and HCF of 6 and 20 by the prime factorisation method.

**Solution:** We have: $6 = 2^1 \times 3^1$ and $20 = 2 \times 2 \times 5 = 2^2 \times 5^1$. You can find $HCF(6, 20) = 2$ and $LCM(6, 20) = 2^2 \times 3^1 \times 5^1 = 60$, as done in your earlier classes.

Note that:
$HCF(6, 20) = 2^1 = \text{Product of the smallest power of each common prime factor in the numbers.}$
$LCM(6, 20) = 2^2 \times 3^1 \times 5^1 = \text{Product of the greatest power of each prime factor, involved in the numbers.}$

From the example above, you might have noticed that $HCF(6, 20) \times LCM(6, 20) = 6 \times 20$. In fact, we can verify that for any two positive integers $a$ and $b$, $HCF(a, b) \times LCM(a, b) = a \times b$. We can use this result to find the LCM of two positive integers, if we have already found the HCF of the two positive integers.
