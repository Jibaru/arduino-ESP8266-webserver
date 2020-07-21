#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include "Volumetro.h"

//Configuracion de Conexion WIFI
const char *ssid = "MOVISTAR_F5A0";
const char *password = "X2PUjHxU2UmjcY9XUr3H";

ESP8266WebServer server(80);
Volumetro vol(16, 5, 4, 0, 2, 14, 12, 13, 1, 0);

void rutaInicio(){
  server.send(202, "text/plane","");
}

void noEncontrado(){
  server.send(404, "text/plain", "Ruta no válida");
}

void enviarDatos(){
  
  if(server.argName(0) != "parametro"){
    server.send(400, "text/plane", "Parámetro incorrecto");
  }
  
  if(server.arg(0) == "1"){
    digitalWrite(1,HIGH); 
    server.send(202, "text/plane", "led encendido");
  }

  if(server.arg(0) == "0"){
    digitalWrite(1,LOW); 
    server.send(202, "text/plane", "led apagado");
  }
  
}

void obtenerDatos(){
  server.send(202, "text/plane","Dato enviado :v");
}

void cambiarMaximo(){
	if(server.arg(0)){
	    vol.setMax(server.arg(0).toInt()); 
	    server.send(202, "text/plane", "Se cambio");
	}
}

void obtenerMusica() {
  server.send(200, "text/plane",(String) vol.musica());
}
 
void setup() {
  delay(1000);
  Serial.begin(9600);
  Serial.println();

  //Configuración  del GPIO2
  pinMode(2, OUTPUT);
  digitalWrite(2,LOW);
  
  // Inicializar volumetro
  vol.inicializar();
  vol.setUsaPotenciometro(false);
  vol.setMax(30);

  //Conexion a WIFI
  WiFi.begin(ssid, password);     //Connect to your WiFi router
  Serial.println("");

  // Tiempo de espera
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  // Datos de conexión 
  Serial.println("");
  Serial.print("Conectado a ");
  Serial.println(ssid);
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());

  // Servicios
  server.on("/", rutaInicio);
  server.on("/enviar-datos", enviarDatos);
  server.on("/obtener-datos", obtenerDatos);
  server.on("/cambiar-maximo", cambiarMaximo);
  server.on("/obtener-musica", obtenerMusica);
  server.onNotFound(noEncontrado);
  server.begin();
}

void loop() {
  
  server.handleClient();
  vol.ejecutar();
  delay(10);
}
