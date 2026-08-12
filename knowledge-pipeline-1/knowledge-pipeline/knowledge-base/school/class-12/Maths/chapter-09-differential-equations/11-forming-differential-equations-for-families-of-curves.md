---
type: concept
title: Forming Differential Equations for Families of Curves
category: school
subject: Maths
level: class-12
chapter: 9
chapter_name: DIFFERENTIAL  EQUATIONS
content_type: solved-example
tags:
- mathematics
- calculus
- differential-equations
- DIFFERENTIAL  EQUATIONS
- family-of-curves
- class12
- Maths
---

### Example 6
Form the differential equation representing the family of ellipses having foci on x-axis and centre at the origin.

**Solution:** We know that the equation of said family of ellipses is:
$$\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1 \quad \dots (1)$$

Differentiating equation (1) with respect to $x$, we get:
$$\frac{2x}{a^2} + \frac{2y}{b^2} \frac{dy}{dx} = 0$$
or
$$\frac{y}{x} \frac{dy}{dx} = -\frac{b^2}{a^2} \quad \dots (2)$$

Differentiating both sides of equation (2) with respect to $x$, we get:
$$\frac{x \frac{d^2y}{dx^2} + \frac{dy}{dx} - y \frac{dy}{dx}}{x^2} = 0$$
or
$$x \frac{d^2y}{dx^2} + \frac{dy}{dx} - y = 0 \quad \dots (3)$$
which is the required differential equation.

### Example 7
Form the differential equation of the family of circles touching the x-axis at origin.

**Solution:** Let $C$ denote the family of circles touching x-axis at origin. Let $(0, a)$ be the coordinates of the centre of any member of the family. Therefore, equation of family $C$ is:
$$x^2 + (y - a)^2 = a^2 \quad \text{or} \quad x^2 + y^2 = 2ay \quad \dots (1)$$
where $a$ is an arbitrary constant. Differentiating both sides of equation (1) with respect to $x$, we get:
$$2x + 2y \frac{dy}{dx} = 2a \frac{dy}{dx}$$
or
$$x + y \frac{dy}{dx} = a \frac{dy}{dx} \quad \text{or} \quad a = \frac{x + y \frac{dy}{dx}}{\frac{dy}{dx}} \quad \dots (2)$$

Substituting the value of $a$ from equation (2) in equation (1), we get:
$$x^2 + y^2 = 2y \left[ \frac{x + y \frac{dy}{dx}}{\frac{dy}{dx}} \right]$$
or
$$(x^2 + y^2) \frac{dy}{dx} = 2xy + 2y^2 \frac{dy}{dx}$$
or
$$\frac{dy}{dx} = \frac{2xy}{x^2 - y^2}$$
This is the required differential equation of the given family of circles.

### Example 8
Form the differential equation representing the family of parabolas having vertex at origin and axis along positive direction of x-axis.

**Solution:** Let $P$ denote the family of above said parabolas and let $(a, 0)$ be the focus of a member of the given family, where $a$ is an arbitrary constant. Therefore, equation of family $P$ is:
$$y^2 = 4ax \quad \dots (1)$$

Differentiating both sides of equation (1) with respect to $x$, we get:
$$2y \frac{dy}{dx} = 4a \quad \dots (2)$$

Substituting the value of $4a$ from equation (2) in equation (1), we get:
$$y^2 = 2y \frac{dy}{dx} x$$
or
$$y^2 - 2xy \frac{dy}{dx} = 0$$
which is the differential equation of the given family of parabolas.
