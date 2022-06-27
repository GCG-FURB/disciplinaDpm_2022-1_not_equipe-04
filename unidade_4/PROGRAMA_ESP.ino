#include<ESP8266WiFi.h> //Biblioteca para funcionamento do WiFi do ESP
#include<ESP8266WebServer.h> //Biblioteca para o ESP funcionar como servidor
#include <DHT.h> //Biblioteca para funcionamento do sensor de temperatura e umidade DHT11

const char* ssid = "aquario";  // Rede WiFi
const char* password = "aquario_virtual";  //Senha da Rede WiFi

ESP8266WebServer server(80); //server na porta 80

#define DHTPIN 4 //Pino digital D2 (GPIO5) conectado ao DHT11
#define DHTTYPE DHT11 //Tipo do sensor DHT11

DHT dht(DHTPIN, DHTTYPE); //Inicializando o objeto dht do tipo DHT passando como parâmetro o pino (DHTPIN) e o tipo do sensor (DHTTYPE)

float temperatura; //variável para armazenar a temperatura
float umidade; //Variável para armazenar a umidade


uint8_t LED1pin = D7;
bool LED1status = LOW;

void setup() {
  Serial.begin(115200); //Inicializa a comunicação serial
  delay(50); // ?Intervalo para aguardar a estabilização do sistema

  pinMode(LED1pin, OUTPUT);
  
  dht.begin(); //Inicializa o sensor DHT11

  Serial.println("Conectando a Rede: "); //Imprime na serial a mensagem
  Serial.println(ssid); //Imprime na serial o nome da Rede Wi-Fi

  WiFi.begin(ssid, password); //Inicialização da comunicação Wi-Fi

  //Verificação da conexão
  while (WiFi.status() != WL_CONNECTED) { //Enquanto estiver aguardando status da conexão
    delay(1000);
    Serial.print("."); //Imprime pontos
  }
  Serial.println("");
  Serial.println("WiFi Conectado");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP()); //Função para exibir o IP da ESP

  server.on("/", HTTP_GET, handle_OnConnect); //Servidor recebe uma solicitação HTTP - chama a função handle_OnConnect
  server.onNotFound(handle_NotFound); //Servidor recebe uma solicitação HTTP não especificada - chama a função handle_NotFound


  server.on("/led1on", handle_led1on); //liga led 1
  server.on("/led1off", handle_led1off); //desliga led 1
  server.enableCORS(true);
  server.begin(); //Inicializa o servidor
  Serial.println("Servidor HTTP inicializado");

}

void loop() {
  server.handleClient(); //Chama o método handleClient()
}

void handle_OnConnect() {
  temperatura = dht.readTemperature();  //Realiza a leitura da temperatura
  umidade = dht.readHumidity(); //Realiza a leitura da umidade
  Serial.print("Temperatura: ");
  Serial.print(temperatura); //Imprime no monitor serial o valor da temperatura lida
  Serial.println(" ºC");
  Serial.print("Umidade: ");
  Serial.print(umidade); //Imprime no monitor serial o valor da umidade lida
  Serial.println(" %");
  server.send(200, "text/html", EnvioHTML(temperatura, umidade)); //Envia as informações usando o código 200, especifica o conteúdo como "text/html" e chama a função EnvioHTML

}

void handle_NotFound() { //Função para lidar com o erro 404
  server.send(404, "text/plain", "Não encontrado"); //Envia o código 404, especifica o conteúdo como "text/pain" e envia a mensagem "Não encontrado"

}

String EnvioHTML(float Temperaturastat, float Umidadestat) { //Exibindo a página da web em HTML
  
  String ptr = "";
  ptr += (float)Temperaturastat;
  ptr += " | ";
  ptr += (float)Umidadestat;

  return ptr;

}

void handle_led1on() {
  digitalWrite(LED1pin, HIGH);
  Serial.println("GPIO7 Status: ON");
}

void handle_led1off() {
  digitalWrite(LED1pin, LOW);
  Serial.println("GPIO7 Status: OFF");
}
