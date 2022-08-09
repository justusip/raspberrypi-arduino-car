package me.nozomi.car.rpi

import com.pi4j.wiringpi.Spi

class InfSpi {
    companion object {
        var native = false

        init {
            if (System.getProperty("os.name").toLowerCase().contains("nux"))
                native = true

            if (native) {
                Spi.wiringPiSPISetup(0, 500000)
            }
        }

        fun send(cmd: Byte, vararg args: Byte): ByteArray? {
            val data = byteArrayOf(
                cmd,
                *args
            )
            if (!native) {
                println("[SIM][SPI] Sent ${
                    data.asUByteArray().joinToString(" ") {
                        "0x" + it.toString(16).padStart(2, '0')
                    }
                }")
                return null
            }
            Spi.wiringPiSPIDataRW(0, data)
            return data
        }
    }
}