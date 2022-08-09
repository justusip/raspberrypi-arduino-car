# RaspberryPi-Arduino-Car

A 3-parted system of my RC Car project.

The `raspberrypi` folder contains a Kotlin program which communicates with Arduino through SPI via `Pi4J`.

The `arduino` folder fetches SPI messages and sends PWM signal to the pair of motors.

The `electron-remote` contains an electron project for controlling the car from a computer through Wi-Fi via `Socket.IO`.
