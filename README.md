# RaspberryPi-Arduino-Car

A 3-parted system of my RC Car project.

`raspberrypi` contains a Kotlin program which communicates with Arduino through SPI via `Pi4J`.

`arduino` contains an Arduino program (via `Platform.IO`) that fetches SPI messages and sends PWM signal to the pair of motors.

`electron-remote` contains an electron project for controlling the car from a computer through Wi-Fi via `Socket.IO`.
