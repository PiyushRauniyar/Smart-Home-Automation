#include <DHT.h>

// Sensor Pins
#define DHTPIN 4
#define LDR_PIN A1
#define MQ5_PIN A4
#define MQ2_PIN A5
#define SOUND_PIN A3
#define PIR_PIN 2
#define PROXIMITY_PIN 6

// Relay Pins
#define RELAY_LDR 9
#define RELAY_MQ5 7
#define RELAY_MQ2 11
#define RELAY_DHT 13
#define RELAY_SOUND 12
#define RELAY_PIR 8
#define RELAY_PROXIMITY A0

// Sensor Thresholds
const int LDR_THRESHOLD = 200;
const int MQ5_THRESHOLD = 300;
const int MQ2_THRESHOLD = 300;
const int SOUND_THRESHOLD = 300;
const float TEMP_THRESHOLD = 30.0; // Temperature in Celsius

DHT dht(DHTPIN, DHT11); // Initialize DHT sensor for temperature and humidity

void setup() {
  Serial.begin(9600);
  dht.begin();
  
  // Initialize sensor pins
  pinMode(LDR_PIN, INPUT);
  pinMode(MQ5_PIN, INPUT);
  pinMode(MQ2_PIN, INPUT);
  pinMode(SOUND_PIN, INPUT);
  pinMode(PIR_PIN, INPUT);
  pinMode(PROXIMITY_PIN, INPUT);
  
  // Initialize relay pins
  pinMode(RELAY_LDR, OUTPUT);
  pinMode(RELAY_MQ5, OUTPUT);
  pinMode(RELAY_MQ2, OUTPUT);
  pinMode(RELAY_DHT, OUTPUT);
  pinMode(RELAY_SOUND, OUTPUT);
  pinMode(RELAY_PIR, OUTPUT);
  pinMode(RELAY_PROXIMITY, OUTPUT);
}

void loop() {
  // Read sensor values
  int ldrValue = analogRead(LDR_PIN);
  int mq5Value = analogRead(MQ5_PIN);
  int mq2Value = analogRead(MQ2_PIN);
  int soundValue = analogRead(SOUND_PIN);
  int pirValue = digitalRead(PIR_PIN);
  int proximityValue = digitalRead(PROXIMITY_PIN);
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  // Control relays based on thresholds
  digitalWrite(RELAY_LDR, ldrValue < LDR_THRESHOLD ? HIGH : LOW);
  digitalWrite(RELAY_MQ5, mq5Value > MQ5_THRESHOLD ? LOW : HIGH);
  digitalWrite(RELAY_MQ2, mq2Value > MQ2_THRESHOLD ? LOW : HIGH);
  digitalWrite(RELAY_SOUND, soundValue > SOUND_THRESHOLD ? LOW : HIGH);
  digitalWrite(RELAY_DHT, temperature > TEMP_THRESHOLD ? HIGH : LOW);
  digitalWrite(RELAY_PIR, pirValue == HIGH ? HIGH : LOW); // Assuming HIGH means detected
  digitalWrite(RELAY_PROXIMITY, proximityValue == LOW ? HIGH : LOW);


  // Create and send JSON string
  Serial.print("{\"ldr\":");
  Serial.print(ldrValue);
  Serial.print(",\"mq5\":");
  Serial.print(mq5Value);
  Serial.print(",\"mq2\":");
  Serial.print(mq2Value);
  Serial.print(",\"sound\":");
  Serial.print(soundValue);
  Serial.print(",\"pir\":");
  Serial.print(pirValue);
  Serial.print(",\"proximity\":");
  Serial.print(proximityValue);
  Serial.print(",\"temperature\":");
  Serial.print(temperature);
  Serial.print(",\"humidity\":");
  Serial.print(humidity);
  Serial.println("}");

  delay(2000); // Delay before the next reading
}
