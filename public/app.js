const ws = new WebSocket('ws://localhost:3000');

// Assuming Chart.js is included in your HTML, initialize charts for analog sensors
const charts = {
  ldr: new Chart(document.getElementById('ldrChart').getContext('2d'), createChartConfig('Light Intensity')),
  mq5: new Chart(document.getElementById('mq5Chart').getContext('2d'), createChartConfig('MQ5 Gas Level')),
  mq2: new Chart(document.getElementById('mq2Chart').getContext('2d'), createChartConfig('MQ2 Gas Level')),
  sound: new Chart(document.getElementById('soundChart').getContext('2d'), createChartConfig('Sound Intensity')),
  temperature: new Chart(document.getElementById('temperatureChart').getContext('2d'), createChartConfig('Temperature')),
  humidity: new Chart(document.getElementById('humidityChart').getContext('2d'), createChartConfig('Humidity'))
};
const thresholds = {
  ldr: 200, // Example LDR threshold
  mq5: 300, // Example MQ5 threshold
  mq2: 300, // Example MQ2 threshold
  sound: 300, // Example Sound threshold
  temperature: 30, // Example Temperature threshold
  humidity: 60 // Example Humidity threshold
};


// Handle incoming WebSocket messages
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  // Update charts for analog sensors with threshold checks
  updateChart(charts.ldr, data.ldr, thresholds.ldr);
  updateChart(charts.mq5, data.mq5, thresholds.mq5);
  updateChart(charts.mq2, data.mq2, thresholds.mq2);
  updateChart(charts.sound, data.sound, thresholds.sound);
  updateChart(charts.temperature, data.temperature, thresholds.temperature);
  updateChart(charts.humidity, data.humidity, thresholds.humidity);

  // Update status indicators for digital sensors
  updateStatusIndicator('pirStatus', data.pir, 'Motion Detected', 'No Motion');
  updateStatusIndicator('proximityStatus', data.proximity, 'No Object', 'Object Detected');
};

function createChartConfig(label) {
  return {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: label,
        borderColor: 'rgb(75, 192, 192)',
        data: []
      }]
    },
    options: {
      scales: {
        xAxes: [{
          type: 'time',
          distribution: 'linear',
          time: {
            displayFormats: {
              second: 'h:mm:ss a'
            }
          }
        }],
        y: {
          beginAtZero: true
        }
      }
    }
  };
}

// Updated updateChart function with units for each sensor

function updateChart(chart, value, threshold) {
  // Initialize the color based on the generic condition (for non-LDR sensors)
  let color = value > threshold ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)'; // Red if above threshold, blue otherwise
  let textColor = value > threshold ? 'red' : 'green'; // Text color logic

  // If the chart is for the LDR, reverse the color coding logic
  if (chart === charts.ldr) {
    color = value > threshold ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)'; // Blue if above threshold, red otherwise
    textColor = value > threshold ? 'green' : 'red'; // Adjust text color logic for LDR
  }

  // Update chart dataset color
  chart.data.datasets[0].borderColor = color;

  // Add the new value
  if (chart.data.labels.length > 20) { // Keep the chart from getting too crowded
    chart.data.labels.shift();
    chart.data.datasets.forEach((dataset) => {
      dataset.data.shift();
    });
  }

  const timeNow = new Date();
  chart.data.labels.push(timeNow.toLocaleTimeString());
  chart.data.datasets[0].data.push(value);

  chart.update();

  // Define sensor units
  const sensorUnits = {
    ldr: 'lux', // Unit for light intensity
    mq5: 'ppm', // Unit for gas level
    mq2: 'ppm', // Unit for smoke level
    sound: 'dB', // Unit for sound intensity
    temperature: '°C', // Unit for temperature
    humidity: '%' // Unit for humidity
  };

  // Update the real-time value display next to the sensor heading
  const sensorName = chart.canvas.id.replace('Chart', ''); // Identifies the sensor
  const valueElement = document.getElementById(sensorName + 'Value');
  if (valueElement) {
    const unit = sensorUnits[sensorName]; // Get the unit for this sensor
    valueElement.textContent = `: ${value} ${unit}`; // Display value with unit
    valueElement.style.color = textColor; // Update text color based on the threshold
  }
}

function updateStatusIndicator(elementId, value, trueText, falseText) {
  const element = document.getElementById(elementId);
  element.textContent = value ? trueText : falseText;
  element.className = value ? 'status-true' : 'status-false';
}
