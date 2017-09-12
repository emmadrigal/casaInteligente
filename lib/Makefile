

LIB=raspGPIO
SRC=$(LIB).c
OBJ=$(LIB).o
STATIC=lib$(LIB).a
DINAMIC=lib$(LIB).so
LDi=$(LD) -shared -o
AR=ar rv
COMPILER=$(CC)
CFLAGS= -c -I../include/ -fPIC


all: $(DINAMIC) 
#$(STATIC)

$(DINAMIC) : $(OBJ)
		$(LDi) $(DINAMIC) $(OBJ)

#$(STATIC) : $(OBJ)
#		$(AR) $(STATIC) $(OBJ)

$(OBJ) :
		$(COMPILER) $(CFLAGS) $(SRC)


clean:
		rm $(DINAMIC) $(OBJ)

