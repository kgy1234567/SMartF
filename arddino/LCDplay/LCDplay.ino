#include "DHT.h"
#include <Wire.h> 
#include <LiquidCrystal_I2C.h>

#define DHT_PIN   8
#define CDS_PIN   A0
#define ECHO_PIN  10
#define TRIG_PIN  11

DHT dht(DHT_PIN, DHT11);
float uitraSonic();
void readSensor();
void lcdwrite ();
LiquidCrystal_I2C lcd(0x27,16,2);  

void setup() {
  // put your setup code here, to run once:
    Serial.begin(115200);
    pinMode(CDS_PIN, INPUT);
    pinMode(TRIG_PIN, OUTPUT);
    pinMode(ECHO_PIN, INPUT);
    
    lcd.begin();
    lcd.backlight();
    dht.begin();
    delay(2000);
}

void loop() {
  
  readSensor();

  
  

   //DHT11 sampling rate is 1HZ.
  delay(1500);
   
  
  
  
}
void readSensor(){
  int humidity= dht.readHumidity();
  int temperature= dht.readTemperature();
  int cds =analogRead(CDS_PIN);
  int dis=uitraSonic();
  lcdwrite(temperature, dis, humidity, cds);
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

 void lcdwrite (int temperature,int dis,int humidity, int cds){
  lcd.setCursor(0,0);
  lcd.print("TMP=");
  lcd.print(temperature);
  lcd.print("C");
  lcd.print(" dis=");
  lcd.print(dis);
  lcd.setCursor(0,1);
  lcd.print("HUM=");
  lcd.print(humidity);
  lcd.print("%H");
  lcd.print(" cds=");
  lcd.print(cds);
  }
