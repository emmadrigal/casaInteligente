APP=http
SRC = $(APP).c
COMPILER=$(CC)
LIB=raspGPIO
LD_FLAGS= -pthread -I../include -L../lib -l$(LIB)
CFLAGS = -W

all: http


http:
		$(COMPILER) -o ../bin/$(APP) $(SRC) $(LD_FLAGS) $(CFLAGS)

clean:
	rm ../bin/$(APP)
