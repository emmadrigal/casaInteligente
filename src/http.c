#include <stdio.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <ctype.h>
#include <strings.h>
#include <string.h>
#include <sys/stat.h>
#include <pthread.h>
#include <sys/wait.h>
#include <stdlib.h>

#define ISspace(x) isspace((int)(x))

#define SERVER_STRING "Server: smartHouse\n"

void accept_request(int);
void cat(int, FILE *);
void error_die(const char *);
int get_line(int, char *, int);
void headers(int);
void not_found(int);
void serve_file(int, const char *);
int startup(u_short *);
void serveImage(int, const char *);

/**********************************************************************/
/* A request has caused a call to accept() on the server port to
 * return.  Process the request appropriately.
 * Parameters: the socket connected to the client */
/**********************************************************************/
void accept_request(int client) {

	char buf[1024];
	int numchars;
	char method[255];
	char url[255];
	char path[512];
	size_t i, j;
	struct stat st;
	int cgi = 0;      // becomes true if server decides this is a CGI program
	char *query_string = NULL;

	numchars = get_line(client, buf, sizeof(buf));
	i = 0; j = 0;
	while (!ISspace(buf[j]) && (i < sizeof(method) - 1)) {
		method[i] = buf[j];
		i++; j++;
	}
	method[i] = '\0';	

	i = 0;
	while (ISspace(buf[j]) && (j < sizeof(buf)))
		j++;
	while (!ISspace(buf[j]) && (i < sizeof(url) - 1) && (j < sizeof(buf))){
		url[i] = buf[j];
		i++; j++;
	}
	url[i] = '\0';
	
	if(strcmp(url, "/info") == 0){
		FILE *fp = fopen("leds.txt" ,"w");
		
		//TODO llamar los métodos de los GPIO aquí
		char ledsA = 0;
		char ledsB = 1;
		char ledsC = 0;
		char ledsD = 1;
		char ledsE = 0;
		
		char puertaA = 1;
		char puertaB = 12;
		
		fprintf(fp, "{\"ledsA\": %d, \"ledsB\": %d, \"ledsC\": %d, \"ledsD\": %d, \"ledsE\": %d, \"puertaA\": %d, \"puertaB\": %d}", ledsA, ledsB, ledsC, ledsD, ledsE, puertaA, puertaB);
		fclose(fp);
		
	
		serve_file(client, "leds.txt");
		printf("gettingInfo\n");
	}
	else if(strcmp(url, "/ledsA") == 0){
		okHeaders(client);
		//TODO cambiar el estado del led correspondiente
		printf("changing state of led A\n");
	}
	else if(strcmp(url, "/ledsB") == 0){
		okHeaders(client);
		//TODO cambiar el estado del led correspondiente
		printf("changing state of led B\n");
	}
	else if(strcmp(url, "/ledsC") == 0){
		okHeaders(client);
		//TODO cambiar el estado del led correspondiente
		printf("changing state of led C\n");
	}
	else if(strcmp(url, "/ledsD") == 0){
		okHeaders(client);
		//TODO cambiar el estado del led correspondiente
		printf("changing state of led D\n");
	}
	else if(strcmp(url, "/ledsE") == 0){
		okHeaders(client);
		//TODO cambiar el estado del led correspondiente
		printf("changing state of led E\n");
	}
	else if(strcmp(url, "/pic.png") == 0){
		//TODO llamar la imagen creada por fswebcam
		serveImage(client, "./Lenna.png");
		printf("serving image\n");
	}
	else{
		not_found(client);
		printf("What??\n");
	}

	close(client);
}


/**********************************************************************/
/* Put the entire contents of a file out on a socket.  This function
 * is named after the UNIX "cat" command, because it might have been
 * easier just to do something like pipe, fork, and exec("cat").
 * Parameters: the client socket descriptor
 *             FILE pointer for the file to cat */
/**********************************************************************/
void cat(int client, FILE *resource) {
	fseek (resource, 0, SEEK_END);
	int fileLength = ftell(resource);
	rewind(resource);

	char* sendbuf = (char*) malloc (sizeof(char)*fileLength);
	size_t result = fread(sendbuf, 1, fileLength, resource);

	if (result > 0) {
		send(client, sendbuf, result, 0);		
	}
	
	free(sendbuf);
}

/**********************************************************************/
/* Print out an error message with perror() (for system errors; based
 * on value of errno, which indicates system call errors) and exit the
 * program indicating an error. */
/**********************************************************************/
void error_die(const char *sc) {
	perror(sc);
	exit(1);
}


/**********************************************************************/
/* Get a line from a socket, whether the line ends in a newline,
 * carriage return, or a CRLF combination.  Terminates the string read
 * with a null character.  If no newline indicator is found before the
 * end of the buffer, the string is terminated with a null.  If any of
 * the above three line terminators is read, the last character of the
 * string will be a linefeed and the string will be terminated with a
 * null character.
 * Parameters: the socket descriptor
 *             the buffer to save the data in
 *             the size of the buffer
 * Returns: the number of bytes stored (excluding null) */
/**********************************************************************/
int get_line(int sock, char *buf, int size) {
	int i = 0;
	char c = '\0';
	int n;

	while ((i < size - 1) && (c != '\n'))
	{
		n = recv(sock, &c, 1, 0);
		/* DEBUG printf("%02X\n", c); */
		if (n > 0)
		{
			if (c == '\r')
			{
				n = recv(sock, &c, 1, MSG_PEEK);
				/* DEBUG printf("%02X\n", c); */
				if ((n > 0) && (c == '\n'))
					recv(sock, &c, 1, 0);
				else
					c = '\n';
			}
			buf[i] = c;
			i++;
		}
		else
		c = '\n';
	}
	buf[i] = '\0';

	return(i);
}

/**********************************************************************/
/* Return the informational HTTP headers about a file. */
/* Parameters: the socket to print the headers on
 *             the name of the file */
/**********************************************************************/
void okHeaders(int client) {
	char buf[1024];

	strcpy(buf, "HTTP/1.0 200 OK\r\n");
	send(client, buf, strlen(buf), 0);
	
	strcpy(buf, SERVER_STRING);
	send(client, buf, strlen(buf), 0);
	
	strcpy(buf, "\r\n");
	send(client, buf, strlen(buf), 0);
}

/**********************************************************************/
/* Return the informational HTTP headers about a file. */
/* Parameters: the socket to print the headers on
 *             the name of the file */
/**********************************************************************/
void resposeHeaders(int client) {
	char buf[1024];

	strcpy(buf, "HTTP/1.0 200 OK\r\n");
	send(client, buf, strlen(buf), 0);
	
	strcpy(buf, SERVER_STRING);
	send(client, buf, strlen(buf), 0);
	
	strcpy(buf, "Content-Type: application/json\r\n");
	send(client, buf, strlen(buf), 0);
	
	strcpy(buf, "\r\n");
	send(client, buf, strlen(buf), 0);
}

/**********************************************************************/
/* Return the informational HTTP headers about a file. */
/* Parameters: the socket to print the headers on
 *             the name of the file */
/**********************************************************************/
void imgHeaders(int client) {
	char buf[1024];

	strcpy(buf, "HTTP/1.0 200 OK\r\n");
	send(client, buf, strlen(buf), 0);
	
	strcpy(buf, SERVER_STRING);
	send(client, buf, strlen(buf), 0);
	
	strcpy(buf, "Content-Type: image/png\r\n");
	send(client, buf, strlen(buf), 0);
	
	strcpy(buf, "\r\n");
	send(client, buf, strlen(buf), 0);
}



/**********************************************************************/
/* Give a client a 404 not found status message. */
/**********************************************************************/
void not_found(int client) {
	char buf[1024];

	sprintf(buf, "HTTP/1.0 404 NOT FOUND\r\n");
	send(client, buf, strlen(buf), 0);
	sprintf(buf, SERVER_STRING);
	send(client, buf, strlen(buf), 0);
	sprintf(buf, "Content-Type: text/html\r\n");
	send(client, buf, strlen(buf), 0);
	sprintf(buf, "\r\n");
	send(client, buf, strlen(buf), 0);
	sprintf(buf, "<HTML><TITLE>Not Found</TITLE>\r\n");
	send(client, buf, strlen(buf), 0);
	sprintf(buf, "<BODY><P>The server could not fulfill\r\n");
	send(client, buf, strlen(buf), 0);
	sprintf(buf, "your request because the resource specified\r\n");
	send(client, buf, strlen(buf), 0);
	sprintf(buf, "is unavailable or nonexistent.\r\n");
	send(client, buf, strlen(buf), 0);
	sprintf(buf, "</BODY></HTML>\r\n");
	send(client, buf, strlen(buf), 0);
}

/**********************************************************************/
/* Send a regular file to the client.  Use headers, and report
 * errors to client if they occur.
 * Parameters: a pointer to a file structure produced from the socket
 *              file descriptor
 *             the name of the file to serve */
/**********************************************************************/
void serve_file(int client, const char *filename) {
	FILE *resource = NULL;
	int numchars = 1;
	char buf[1024];

	buf[0] = 'A'; buf[1] = '\0';
	while ((numchars > 0) && strcmp("\n", buf))  /* read & discard headers */
	numchars = get_line(client, buf, sizeof(buf));

	resource = fopen(filename, "r");
	if (resource == NULL)
		not_found(client);
	else {
		resposeHeaders(client);
		cat(client, resource);
	}
	fclose(resource);
}


void serveImage(int client, const char *filename) {
	FILE *resource = NULL;
	int numchars = 1;
	char buf[1024];

	buf[0] = 'A'; buf[1] = '\0';
	while ((numchars > 0) && strcmp("\n", buf))  /* read & discard headers */
		numchars = get_line(client, buf, sizeof(buf));

	resource = fopen(filename, "rb");
	if (resource == NULL)
		not_found(client);
	else {
		imgHeaders(client);
		cat(client, resource);
	}
	fclose(resource);
}

/**********************************************************************/
/* This function starts the process of listening for web connections
 * on a specified port.  If the port is 0, then dynamically allocate a
 * port and modify the original port variable to reflect the actual
 * port.
 * Parameters: pointer to variable containing the port to connect on
 * Returns: the socket */
/**********************************************************************/
int startup(u_short *port) {
	int httpd = 0;
	struct sockaddr_in name;

	httpd = socket(PF_INET, SOCK_STREAM, 0);
	if (httpd == -1)
		error_die("socket");
	memset(&name, 0, sizeof(name));
	name.sin_family = AF_INET;
	name.sin_port = htons(*port);
	name.sin_addr.s_addr = htonl(INADDR_ANY);
	if (bind(httpd, (struct sockaddr *)&name, sizeof(name)) < 0)
		error_die("bind");
	if (*port == 0)  /* if dynamically allocating a port */
	{
		int namelen = sizeof(name);
		if (getsockname(httpd, (struct sockaddr *)&name, &namelen) == -1)
		error_die("getsockname");
		*port = ntohs(name.sin_port);
	}
	if (listen(httpd, 5) < 0)
		error_die("listen");
	return(httpd);
}


/**********************************************************************/

int main(void) {
	int server_sock = -1;
	u_short port = 0;
	int client_sock = -1;
	struct sockaddr_in client_name;
	int client_name_len = sizeof(client_name);
	pthread_t newthread;

	server_sock = startup(&port);
	printf("httpd running on port %d\n", port);

	while (1)
	{
		client_sock = accept(server_sock,
				           (struct sockaddr *)&client_name,
				           &client_name_len);
		if (client_sock == -1)
			error_die("accept");
		/* accept_request(client_sock); */
		if (pthread_create(&newthread , NULL, accept_request, client_sock) != 0)
			perror("pthread_create");
	}

	close(server_sock);

	return(0);
}
