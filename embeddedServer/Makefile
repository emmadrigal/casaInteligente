all: app
		echo "Ejecutable creado"

app: biblioteca
	cd src && make

biblioteca:
	cd lib && make

clean:
	cd lib && make clean && cd ../src && make clean && echo "Archivos eliminados correctamente"
