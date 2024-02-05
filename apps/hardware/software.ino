#define SENSOR_PIN A0     
#define SAMPLE_PERIOD 20  

int peak = 564;    
int trough = 500;  

unsigned long lastSampleTime = 0;
int lastSignal = 0;
bool ascending = true;
int beatThreshold = (peak + trough) / 2;
int beatDetected = false;
unsigned long lastBeatTime = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  unsigned long currentTime = millis();
  if (currentTime - lastSampleTime > SAMPLE_PERIOD) {
    lastSampleTime = currentTime;
    int signal = analogRead(SENSOR_PIN);

    // Simple peak/trough tracking
    if (signal > lastSignal && ascending) {
      if (signal > peak) {
        peak = signal;
      }
    } else if (signal < lastSignal && !ascending) {
      if (signal < trough) {
        trough = signal;
      }
    }

    if (ascending && signal < lastSignal) {
      ascending = false;
      beatThreshold = (peak + trough) / 2;
      peak = signal;
    } else if (!ascending && signal > lastSignal) {
      ascending = true;
      trough = signal;
      if (signal > beatThreshold) {
        // Beat detected
        if (!beatDetected) {
          beatDetected = true;
          unsigned long beatInterval = currentTime - lastBeatTime;
          lastBeatTime = currentTime;
          if (beatInterval > 0) {
            int bpm = 60000 / beatInterval;
            if (bpm < 153 && bpm > 60) { // filter outliner
              Serial.print("BPM: ");
              Serial.println(bpm);
            }
          }
        }
      }
    } else {
      beatDetected = false;
    }

    lastSignal = signal;
  }
}
