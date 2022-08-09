package me.nozomi.car.cmd

import me.nozomi.car.rpi.InfSpi
import kotlin.contracts.ReturnsNotNull
import kotlin.math.abs

class CmdMotor : Cmd(
    "motor",
    "motor [Left Speed] [Right Speed]",
    "m"
) {

    override fun onExecute(args: List<String>): Boolean {
        if (args.size != 3)
            return false

        val speeds = arrayOf(
            args[1].toIntOrNull(),
            args[2].toIntOrNull()
        )

        if (!speeds.all { o -> o != null })
            return false

        if (!speeds.all { o -> o!! > -256 && o < 256 }) {
            println("Speeds should be ranged within -255 - 255.")
            return true
        }

        InfSpi.send(
            0x01,
            abs(speeds[0]!!).toByte(),
            if (speeds[0]!! >= 0) 1 else 0,
            abs(speeds[1]!!).toByte(),
            if (speeds[1]!! >= 0) 1 else 0,
        )

        println("Invoked speed change to ${speeds[0]} and ${speeds[1]}")
        return true
    }

}