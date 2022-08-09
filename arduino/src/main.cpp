#define F_CPU 16000000

#include <avr/io.h>
#include <util/delay.h>
#include <avr/interrupt.h>

volatile int8_t cmdCursor = 0;
volatile uint8_t cmdBuffer[16];

bool onCmd(uint8_t *args, int8_t len) {
    switch (cmdBuffer[0]) {
        case 0x00:
            return true;
        case 0x01:
            if (cmdCursor != 5)
                return false;

            PORTD &= ~(1 << PD2 | 1 << PD3 | 1 << PD4 | 1 << PD7);

            OCR0B = cmdBuffer[1];
            PORTD |= 1 << (cmdBuffer[2] ? PD2 : PD3);

            OCR0A = cmdBuffer[3];
            PORTD |= 1 << (cmdBuffer[4] ? PD4 : PD7);

            return true;
    }
    return true;
}

int main() {
    DDRB = 1 << PB4;
    DDRD = 1 << PD2 | 1 << PD3 | 1 << PD4 | 1 << PD5 | 1 << PD6 | 1 << PD7;

    TCCR0A = 0b10100011;
    TCCR0B = 0b00000001;

    SPCR = 0b11000000;
    sei();

    while (1);
}

ISR(SPI_STC_vect) {
    while ((SPSR & (1 << SPIF)) != 0);
    cmdCursor++;
    cmdBuffer[cmdCursor - 1] = SPDR;
    if (onCmd(reinterpret_cast<uint8_t *>(*cmdBuffer), cmdCursor)) {
        cmdCursor = 0;
    }
}