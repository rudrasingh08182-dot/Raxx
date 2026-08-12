---
type: concept
title: Kinematic Equations of Motion and Calculus Derivations
category: school
subject: Physics
level: class-11
chapter: 2
chapter_name: MOTION IN A STRAIGHT LINE
content_type: concept
tags:
- Physics
- equations-of-motion
- rectilinear-motion
- kinematics
- physics-problems
- ' MOTION IN A STRAIGHT LINE'
- calculus-derivation
- class12
---

The kinematic equations of rectilinear motion for constant acceleration are:

$v = v_0 + at$
$x = v_0 t + \frac{1}{2} a t^2$ (2.9a)
$v^2 = v_0^2 + 2ax$

These connect five quantities: $v_0, v, a, t,$ and $x$. The set of Eq. (2.9a) were obtained by assuming that at $t = 0$, the position of the particle, $x$ is 0. We can obtain a more general equation if we take the position coordinate at $t = 0$ as non-zero, say $x_0$. Then Eqs. (2.9a) are modified (replacing $x$ by $x - x_0$) to:

$v = v_0 + at$
$x = x_0 + v_0 t + \frac{1}{2} a t^2$ (2.9b)
$v^2 = v_0^2 + 2a(x - x_0)$ (2.9c)

**Example 2.2** Obtain equations of motion for constant acceleration using method of calculus.

**Answer** By definition
$v = \frac{dv}{dt}$
$dv = a dt$
Integrating both sides
$\int_{v_0}^{v} dv = \int_{0}^{t} a dt$ (a is constant)
$v - v_0 = at$
$v = v_0 + at$

Further, $v = \frac{dx}{dt}$
$dx = v dt$
Integrating both sides
$\int_{x_0}^{x} dx = \int_{0}^{t} v dt$
$x - x_0 = \int_{0}^{t} (v_0 + at) dt$
$x - x_0 = v_0 t + \frac{1}{2} a t^2$
$x = x_0 + v_0 t + \frac{1}{2} a t^2$

We can write
$a = \frac{dv}{dt} = \frac{dv}{dx} \frac{dx}{dt} = v \frac{dv}{dx}$
$v dv = a dx$
Integrating both sides,
$\int_{v_0}^{v} v dv = \int_{x_0}^{x} a dx$
$\frac{v^2 - v_0^2}{2} = a(x - x_0)$
$v^2 = v_0^2 + 2a(x - x_0)$

The advantage of this method is that it can be used for motion with non-uniform acceleration also. Now, we shall use these equations to some important cases.

**Example 2.3** A ball is thrown vertically upwards with a velocity of $20 \text{ m s}^{-1}$ from the top of a multistorey building. The height of the point from where the ball is thrown is $25.0 \text{ m}$ from the ground. (a) How high will the ball rise? and (b) how long will it be before the ball hits the ground? Take $g = 10 \text{ m s}^{-2}$.

**Answer** (a) Let us take the y-axis in the vertically upward direction with zero at the ground, as shown in Fig. 2.6.
Now $v_0 = + 20 \text{ m s}^{-1}$,
$a = -g = -10 \text{ m s}^{-2}$,
$v = 0 \text{ m s}^{-1}$
If the ball rises to height $y$ from the point of launch, then using the equation
$v^2 = v_0^2 + 2a(y - y_0)$
we get
$0 = (20)^2 + 2(-10)(y - y_0)$
Solving, we get, $(y - y_0) = 20 \text{ m}$.

(b) We can solve this part of the problem in two ways. Note carefully the methods used.
