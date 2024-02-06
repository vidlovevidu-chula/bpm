#define SENSOR_PIN A0
#define SAMPLE_PERIOD 20

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

const char *ssid = "meen_iot";
const char *password = "meenmeenmeen";

int peak = 564;
int trough = 500;

unsigned long lastSampleTime = 0;
int lastSignal = 0;
bool ascending = true;
int beatThreshold = (peak + trough) / 2;
int beatDetected = false;
unsigned long lastBeatTime = 0;

void setup()
{
    Serial.begin(9600);
    pinMode(LED_BUILTIN, OUTPUT);
    WiFi.begin(ssid, password);
    Serial.println("Connecting");
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
    Serial.println("");
    Serial.print("Connected to WiFi network with IP Address: ");
    Serial.println(WiFi.localIP());

    Serial.println("Timer set to 5 seconds (timerDelay variable), it will take 5 seconds before publishing the first reading.");
    delay(5000);
}

WiFiClient client;
HTTPClient http;

bool sent = false;

void loop()
{
    unsigned long currentTime = millis();
    if (currentTime - lastSampleTime > SAMPLE_PERIOD)
    {
        if (sent)
        {
            digitalWrite(LED_BUILTIN, HIGH);
        }
        else
        {
            digitalWrite(LED_BUILTIN, LOW);
        }
        lastSampleTime = currentTime;
        int signal = analogRead(SENSOR_PIN);

        if (abs(signal - lastSignal) < 1 && signal < 8)
        {
            sent = false;
        }

        Serial.println(sent);

        // Simple peak/trough tracking
        if (signal > lastSignal && ascending)
        {
            if (signal > peak)
            {
                peak = signal;
            }
        }
        else if (signal < lastSignal && !ascending)
        {
            if (signal < trough)
            {
                trough = signal;
            }
        }

        if (ascending && signal < lastSignal)
        {
            ascending = false;
            beatThreshold = (peak + trough) / 2;
            peak = signal;
        }
        else if (!ascending && signal > lastSignal)
        {
            ascending = true;
            trough = signal;
            if (signal > beatThreshold)
            {
                // Beat detected
                if (!beatDetected)
                {
                    beatDetected = true;
                    unsigned long beatInterval = currentTime - lastBeatTime;
                    lastBeatTime = currentTime;
                    if (beatInterval > 0)
                    {
                        int bpm = 60000 / beatInterval;
                        if (bpm < 149 && bpm > 60)
                        { // filter outliner
                            if (!sent)
                            {
                                http.begin(client, "http://192.168.1.22:4000/register/1?bpm=" + String(bpm));
                                int httpResponseCode = http.GET();
                                sent = true;
                            }
                            Serial.println(bpm);
                        }
                    }
                }
            }
        }
        else
        {
            beatDetected = false;
        }

        lastSignal = signal;
    }
}
