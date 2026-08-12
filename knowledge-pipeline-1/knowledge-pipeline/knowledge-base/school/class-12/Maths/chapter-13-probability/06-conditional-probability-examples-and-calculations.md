---
type: concept
title: Conditional Probability Examples and Calculations
category: school
subject: Maths
level: class-12
chapter: 13
chapter_name: PROBABILITY
content_type: solved-example
tags:
- PROBABILITY
- Maths
- die-toss-problems
- class12
- conditional-probability
- probability
- mathematics
---

Now $P(F) = \frac{430}{1000} = 0.43$ and $P(E \cap F) = \frac{0.043}{1000} = 0.043$ (Why?)
Then $P(E|F) = \frac{P(E \cap F)}{P(F)} = \frac{0.043}{0.43} = 0.1$

**Example 5** A die is thrown three times. Events A and B are defined as below:
A : 4 on the third throw
B : 6 on the first and 5 on the second throw
Find the probability of A given that B has already occurred.

**Solution** The sample space has 216 outcomes.
Now $A = \{(1,1,4), (1,2,4), \dots, (1,6,4), (2,1,4), (2,2,4), \dots, (2,6,4), (3,1,4), (3,2,4), \dots, (3,6,4), (4,1,4), (4,2,4), \dots, (4,6,4), (5,1,4), (5,2,4), \dots, (5,6,4), (6,1,4), (6,2,4), \dots, (6,6,4)\}$
$B = \{(6,5,1), (6,5,2), (6,5,3), (6,5,4), (6,5,5), (6,5,6)\}$
and $A \cap B = \{(6,5,4)\}$.
Now $P(B) = \frac{6}{216}$ and $P(A \cap B) = \frac{1}{216}$
Then $P(A|B) = \frac{P(A \cap B)}{P(B)} = \frac{1/216}{6/216} = \frac{1}{6}$

**Example 6** A die is thrown twice and the sum of the numbers appearing is observed to be 6. What is the conditional probability that the number 4 has appeared at least once?

**Solution** Let E be the event that ‘number 4 appears at least once’ and F be the event that ‘the sum of the numbers appearing is 6’.
Then, $E = \{(4,1), (4,2), (4,3), (4,4), (4,5), (4,6), (1,4), (2,4), (3,4), (5,4), (6,4)\}$
and $F = \{(1,5), (2,4), (3,3), (4,2), (5,1)\}$
We have $P(E) = \frac{11}{36}$ and $P(F) = \frac{5}{36}$
Also $E \cap F = \{(2,4), (4,2)\}$
