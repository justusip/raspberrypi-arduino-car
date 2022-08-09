package me.nozomi.car.cmd

class CmdManager {
    companion object {
        private val cmds = arrayOf(
            CmdMotor()
        )

        fun process(input: String) {
            val args = input.split(" ")
            for (cmd in cmds) {
                if (cmd.names.contains(args[0].toLowerCase())) {
                    if (!cmd.onExecute(args)) {
                        println("Usage: ${cmd.usage}")
                    }
                    return
                }
            }
            println("Unknown command.")
        }
    }
}