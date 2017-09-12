APP=http
SRC = $(APP).c
COMPILER=$(CC)
LD_FLAGS= -pthread
CFLAGS = -W

all: http


http:
		$(COMPILER) -o $(APP) $(SRC) $(LD_FLAGS) $(CFLAGS)

clean:
	rm $(APP)
