package me.nozomi.car.network

import com.corundumstudio.socketio.Configuration
import com.corundumstudio.socketio.SocketIOServer
import me.nozomi.car.rpi.InfSpi
import kotlin.math.abs

class Server : Thread() {

    companion object {
        var io: SocketIOServer? = null
    }

    override fun run() {
        val config = Configuration()
        config.port = 3000
        val io = SocketIOServer(config)
        Server.io = io

        io.addConnectListener { client ->
            println("A client from ${client.remoteAddress} has connected.")
        };

        io.addDisconnectListener { client ->
            println("A client from ${client.remoteAddress} has disconnected.")
        };

        io.addEventListener(
            "motor", Array<Int>::
            class.java
        )
        { _, data, _ ->
            InfSpi.send(
                0x01,
                abs(data[0]).toByte(),
                if (data[0] >= 0) 1 else 0,
                abs(data[1]).toByte(),
                if (data[1] >= 0) 1 else 0,
            )
        }
        io.start()
    }
}