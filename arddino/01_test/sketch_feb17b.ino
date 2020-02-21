#include "DHT.h"

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
float uitraSonic();
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
  digitalWrite(LED_PIN, HIGH);
  float humidity= dht.readHumidity();
  float temperature= dht.readTemperature();
  Serial.print("humidity: ");
  Serial.println(humidity);
  Serial.print("Temperature: ");
  Serial.println(temperature);
  int cds= analogRead(CDS_PIN);
  Serial.print("CDS: ");
  Serial.println(cds);
  float distance=uitraSonic();
  Serial.print("Distance: ");
  Serial.println(distance);

  int red = random(0,255);
  int green = random(0,255);
  int blue = random(0,255);
  analogWrite(RED_LED,red);
  analogWrite(GREEN_LED,green);
  analogWrite(BLUE_LED,blue);
  char buffer[80];
  sprintf(buffer,"Red: %d,Green: %d,Blue: %d",red,green,blue);
  Serial.println(buffer);
  digitalWrite(RELAY_PIN,digitalRead(RELAY_PIN)^1);
  delay(10000);
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
