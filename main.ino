
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

#define PIN2 2
#define PIN13 13

//Configuracion de Conexion WIFI
const char *ssid = "MOVISTAR_F5A0";
const char *password = "X2PUjHxU2UmjcY9XUr3H";

ESP8266WebServer server(80);

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
    digitalWrite(PIN2,HIGH); 
    server.send(202, "text/plane", "led encendido");
  }

  if(server.arg(0) == "0"){
    digitalWrite(PIN2,LOW); 
    server.send(202, "text/plane", "led apagado");
  }
  
}

void obtenerDatos(){
  server.send(202, "text/plane","Dato enviado :v");
}
 
void setup() {
  delay(1000);
  Serial.begin(9600);
  Serial.println();

  //Configuración  del GPIO2
  pinMode(2, OUTPUT);
  digitalWrite(2,LOW);

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
  server.onNotFound(noEncontrado);
  server.begin();
}

void loop() {
  server.handleClient();
}