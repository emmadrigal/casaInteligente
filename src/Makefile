APP=http
SRC = $(APP).c
COMPILER=$(CC)
LD_FLAGS= -pthread
CFLAGS = -W

all: http


http:
		$(COMPILER) -o ../bin/$(APP) $(SRC) $(LD_FLAGS) $(CFLAGS)

clean:
	rm ../bin/$(APP)
