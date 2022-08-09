package me.nozomi.car

import me.nozomi.car.cmd.CmdManager
import me.nozomi.car.network.Server

fun main(args: Array<String>) {
    println("Initialized.")

    val server = Server()
    server.start()

    while (true) {
        print("> ")
        val input: String = readLine()!!.trim()
        CmdManager.process(input)
    }
}