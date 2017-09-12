#include <raspGPIO.h>

void pinMode(unsigned char pin, char MODE){
	const char* command = "echo \"";
	
	const char* addressPIN = "\" > /sys/class/gpio/";
	const char* addressMode1 = "\" > /sys/class/gpio/gpio";
	const char* addressMode2 = "/direction";
	
	char* pChar;
	if(pin/10 == 0){
		pChar = (char*) malloc(1);
	} else {
		pChar = (char*) malloc(2);
	}
	sprintf(pChar, "%d", pin);
	
	char* pinCommand = (char*) malloc(32 + pin/10 );
	strcpy(pinCommand, command);
	strcat(pinCommand, pChar	);
	strcat(pinCommand, addressPIN);
	
	system(pinCommand);
	
	char* modeCommand;
	if(MODE){
		modeCommand = (char*)malloc(43 + pin/10);
		strcpy(modeCommand, command);
		strcat(modeCommand, "in");
	} else {
		modeCommand = (char*)malloc(43 + 1 + pin/10);
		strcpy(modeCommand, command);
		strcat(modeCommand, "out");
	}
	strcat(modeCommand, addressMode1);
	strcat(modeCommand, pChar);
	strcat(modeCommand, addressMode2);
	
	system(modeCommand);
	
	free(pChar);
	free(pinCommand);
	free(modeCommand);
}

void digitalWrite(unsigned char pin, char value){
	const char* command = "echo \"";
	
	const char* addressValue1 = "\" > /sys/class/gpio/gpio";
	const char* addressValue2 = "/value";
	
	char* pChar = (char*) malloc(1);
	//TODO check if value is not 0 or 1
	sprintf(pChar, "%d", pin);
	
	char* pinCommand = (char*) malloc(32 + pin/10 );
	strcpy(pinCommand, command);
	if(value){
		strcat(pinCommand, "1");	
	}else{
		strcat(pinCommand, "0");	
	}
	strcat(pinCommand, addressValue1);
	strcat(pinCommand, pChar	);
	strcat(pinCommand, addressValue2);
	
	system(pinCommand);
}

char digitalRead(unsigned char pin){
	const char* addressValue1 = "/sys/class/gpio/gpio";
	const char* addressValue2 = "/value";
	
	char* pChar = (char*) malloc(1);
	//TODO check if value is not 0 or 1
	sprintf(pChar, "%d", pin);
	
	char* address = (char*) malloc(32 + pin/10 );
	strcat(address, addressValue1);
	strcat(address, pChar	);
	strcat(address, addressValue2);
	
	FILE *fp;
	char buff[1];
	
	fp = fopen(address, "r");	
	fscanf(fp, "%s", buff);
	
	return buff[0];

}

void blink(unsigned char pin, unsigned short freq, unsigned short duration){
	const char* command = "echo \"";
	
	const char* addressValue1 = "\" > /sys/class/gpio/gpio";
	const char* addressValue2 = "/value";
	
	char* pChar = (char*) malloc(1);
	//TODO check if value is not 0 or 1
	sprintf(pChar, "%d", pin);
	
	char* pinCommand = (char*) malloc(32 + pin/10 );
	
	
	unsigned char state = 0;
	clock_t start = clock();
	unsigned char finished = 0;
	while(finished){
		strcpy(pinCommand, command);
		if(state){
			strcat(pinCommand, "1");
			state = 0;
		}else{
			strcat(pinCommand, "0");
			state = 1;
		}
		strcat(pinCommand, addressValue1);
		strcat(pinCommand, pChar	);
		strcat(pinCommand, addressValue2);
	
		system(pinCommand);
		usleep(freq);
		finished = (clock() - start)/CLOCKS_PER_SEC > duration ? 1 : 0;
	}	
}












