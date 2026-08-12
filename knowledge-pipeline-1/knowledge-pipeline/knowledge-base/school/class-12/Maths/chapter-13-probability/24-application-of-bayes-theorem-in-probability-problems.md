---
type: concept
title: Application of Bayes' Theorem in Probability Problems
category: school
subject: Maths
level: class-12
chapter: 13
chapter_name: PROBABILITY
content_type: solved-example
tags:
- PROBABILITY
- Maths
- class12
- bayes-theorem
- conditional-probability
- probability
- mathematics
---

Hence, by Bayes' Theorem, we have

$P(B_2|E) = \frac{P(B_2)P(E|B_2)}{P(B_1)P(E|B_1) + P(B_2)P(E|B_2) + P(B_3)P(E|B_3)}$

$= \frac{0.35 \times 0.04}{0.25 \times 0.05 + 0.35 \times 0.04 + 0.40 \times 0.02}$

$= \frac{0.0140}{0.0345} = \frac{28}{69}$

**Example 20:** A doctor is to visit a patient. From the past experience, it is known that the probabilities that he will come by train, bus, scooter or by other means of transport are respectively $\frac{3}{10}, \frac{1}{5}, \frac{1}{10}$ and $\frac{2}{5}$. The probabilities that he will be late are $\frac{1}{4}, \frac{1}{3}$ and $\frac{1}{12}$, if he comes by train, bus and scooter respectively, but if he comes by other means of transport, then he will not be late. When he arrives, he is late. What is the probability that he comes by train?

**Solution:** Let $E$ be the event that the doctor visits the patient late and let $T_1, T_2, T_3, T_4$ be the events that the doctor comes by train, bus, scooter, and other means of transport respectively.

Then $P(T_1) = \frac{3}{10}, P(T_2) = \frac{1}{5}, P(T_3) = \frac{1}{10}$ and $P(T_4) = \frac{2}{5}$ (given).

$P(E|T_1) = \text{Probability that the doctor arriving late comes by train} = \frac{1}{4}$

Similarly, $P(E|T_2) = \frac{1}{3}, P(E|T_3) = \frac{1}{12}$ and $P(E|T_4) = 0$, since he is not late if he comes by other means of transport.

Therefore, by Bayes' Theorem, we have

$P(T_1|E) = \text{Probability that the doctor arriving late comes by train}$

$= \frac{P(T_1)P(E|T_1)}{P(T_1)P(E|T_1) + P(T_2)P(E|T_2) + P(T_3)P(E|T_3) + P(T_4)P(E|T_4)}$

$= \frac{\frac{3}{10} \times \frac{1}{4}}{\frac{3}{10} \times \frac{1}{4} + \frac{1}{5} \times \frac{1}{3} + \frac{1}{10} \times \frac{1}{12} + \frac{2}{5} \times 0}$

$= \frac{\frac{3}{40}}{\frac{3}{40} + \frac{1}{15} + \frac{1}{120}} = \frac{\frac{3}{40}}{\frac{9+8+1}{120}} = \frac{3}{40} \times \frac{120}{18} = \frac{1}{2}$

Hence, the required probability is $\frac{1}{2}$.
