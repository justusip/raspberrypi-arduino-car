package me.nozomi.car.cmd

abstract class Cmd(val name: String, val usage: String, vararg aliases: String) {

    val names = arrayOf(
        name,
        *aliases
    )

    abstract fun onExecute(args: List<String>): Boolean;

}