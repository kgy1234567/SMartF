#include "DHT.h"
#include <ArduinoJson.h>

#define LED_PIN    13
#define RED_LED   3
#define GREEN_LED 6
#define BLUE_LED  5
#define DHT_PIN   8
#define ECHO_PIN  10
#define TRIG_PIN  11
#define RELAY_PIN  4

#define CDS_PIN   A0


DHT dht(DHT_PIN, DHT11);
void readSensors();
float uitraSonic();
void blinkLED(int);
void doParseJson(char *);
 StaticJsonDocument<80> doc;
 StaticJsonDocument<80> pDoc;
void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(CDS_PIN, INPUT);
  pinMode(RED_LED, OUTPUT);
  pinMode(GREEN_LED, OUTPUT);
  pinMode(BLUE_LED, OUTPUT);
  pinMode(RELAY_PIN, OUTPUT);
  dht.begin();
  delay(3000);

}

void loop() {
  // put your main code here, to run repeatedly:
  char buf[80];
  byte len;
  String cmd;
  digitalWrite(LED_PIN, HIGH);
  Serial.println("Ready");

  
if (Serial.available() > 0){
    len = Serial.readBytes(buf,80);
    buf[len-1] =0;
    cmd = (String)buf;
    //Serial.println(buf);

    if (cmd.indexOf("GET") == 0){   // 센서를 읽어서 json 형태로 전송
      serializeJson(doc,Serial);
      Serial.print("\n");
    } else if(cmd.indexOf("PUT") == 0){ // JSON 메세지를 읽어서 엑츄에이터 구동
      char *jsonStr=&(buf[4]);
      
      doParseJson(jsonStr);
    }

    //doParseJson(buf);
    readSensors();
    //serializeJson(doc,Serial);
    //Serial.println("\n");
  }
  delay(1000);
}


    void readSensors(){
    float humidity= dht.readHumidity();
    float temperature= dht.readTemperature();
    doc["humidity"]=humidity;
    doc["temperature"]=temperature;
   
    doc["distance"]= uitraSonic();
    doc["cds"]=analogRead(CDS_PIN);
}     

    void doParseJson(char *jsonStr){
    DeserializationError error = deserializeJson(pDoc, jsonStr);
    if(error){
      Serial.print(F("deserializeJson() failed: "));
      Serial.println(error.c_str());
      blinkLED(100);  
    }
    int red = pDoc["red"];
    int green = pDoc["green"];
    int blue = pDoc["blue"];
    int relay = pDoc["relay"];
    analogWrite(RED_LED, red);
    analogWrite(GREEN_LED, green);
    analogWrite(BLUE_LED, blue);
    digitalWrite(RELAY_PIN, relay);
}
float uitraSonic(){
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  unsigned long duration = pulseIn(ECHO_PIN, HIGH);
  float distance = ((float)(340 * duration) / 10000) / 2;
  //return (float)pulseIn(ECHO_PIN, HIGH) / 58;
  return distance;
  }
  void blinkLED(int interval) {
    for (int i=0; i<10; i++) {
    digitalWrite(LED_PIN, digitalRead(LED_PIN)^1);
    delay(interval);
  }
}
