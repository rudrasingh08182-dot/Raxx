---
type: concept
title: Working Principle of Full-Wave Rectifier and Capacitor Filtering
category: school
subject: Physics
level: class-12
chapter: 14
chapter_name: 'SEMICONDUCTOR ELECTRONICS: MATERIALS, DEVICES AND SIMPLE CIRCUITS'
content_type: concept
tags:
- Physics
- full-wave-rectifier
- dc-output
- 'SEMICONDUCTOR ELECTRONICS: MATERIALS, DEVICES AND SIMPLE CIRCUITS'
- class12
- semiconductor-electronics
- capacitor-filter
- rectification
---

339
Semiconductor Electronics: Materials, Devices and Simple Circuits

With respect to the centre tap at any instant is positive. It is clear that, at that instant, voltage at B being out of phase will be negative as shown in Fig. 14.19(b). So, diode D1 gets forward biased and conducts (while D2 being reverse biased is not conducting). Hence, during this positive half cycle we get an output current (and an output voltage across the load resistor $R_L$) as shown in Fig. 14.19(c). In the course of the ac cycle when the voltage at A becomes negative with respect to centre tap, the voltage at B would be positive. In this part of the cycle diode D1 would not conduct but diode D2 would, giving an output current and output voltage (across $R_L$) during the negative half cycle of the input ac. Thus, we get output voltage during both the positive as well as the negative half of the cycle. Obviously, this is a more efficient circuit for getting rectified voltage or current than the half-wave rectifier. The rectified voltage is in the form of pulses of the shape of half sinusoids. Though it is unidirectional it does not have a steady value. To get steady dc output from the pulsating voltage normally a capacitor is connected across the output terminals (parallel to the load $R_L$). One can also use an inductor in series with $R_L$ for the same purpose. Since these additional circuits appear to filter out the ac ripple and give a pure dc voltage, so they are called filters. Now we shall discuss the role of capacitor in filtering. When the voltage across the capacitor is rising, it gets charged. If there is no external load, it remains charged to the peak voltage of the rectified output. When there is a load, it gets discharged through the load and the voltage across it begins to fall. In the next half-cycle of rectified output it again gets charged to the peak value (Fig. 14.20). The rate of fall of the voltage across the capacitor depends inversely upon the product of capacitance $C$ and the effective resistance $R_L$ used in the circuit and is called the time constant. To make the time constant large, the value of $C$ should be large. So capacitor input filters use large capacitors.
