import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    kotlin("jvm") version "1.4.10"
}
group = "me.nozomi"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}
dependencies {
    implementation("com.pi4j:pi4j-core:1.2")
    implementation("com.corundumstudio.socketio:netty-socketio:1.7.12")
    implementation("org.slf4j:slf4j-simple:2.0.0-alpha1")
    testImplementation(kotlin("test-junit"))
}
tasks.withType<KotlinCompile>() {
    kotlinOptions.jvmTarget = "1.8"
}