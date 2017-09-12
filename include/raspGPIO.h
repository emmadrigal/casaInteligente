#include <time.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <unistd.h>


void pinMode(unsigned char pin, char MODE);

void digitalWrite(unsigned char pin, char value);
 
char digitalRead(unsigned char pin);

void blink(unsigned char pin, unsigned short freq, unsigned short duration);
