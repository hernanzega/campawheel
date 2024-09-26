const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

// Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 30, value:  "2" },
  { minDegree: 31, maxDegree: 90, value: "1" },
  { minDegree: 91, maxDegree: 150, value: "3" },
  { minDegree: 151, maxDegree: 210, value: "2" },
  { minDegree: 211, maxDegree: 270, value: "1" },
  { minDegree: 271, maxDegree: 330, value: "3" },
  { minDegree: 331, maxDegree: 360, value: "2" },
];

// Size of each piece
const data = [16, 16, 16, 16, 16, 16];

// Background color for each piece
var pieColors = [
  "#e81f76",
  "#417099",
  "#00AEC3",
  "#e81f76",
  "#417099",
  "#00AEC3",
];

// Create chart
let myChart = new Chart(wheel, {
  // Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  // Chart Type Pie
  type: "pie",
  data: {
    // Labels (values which are to be displayed on chart)
    labels: ["I", "II", "III", "I", "II", "III"],
    // Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    // Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      // Hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      // Display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 22 },
      },
    },
  },
});

// Display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    // If the angleValue is between min and max, then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p style="font-weight: bold;">🏕️ CAMPAMENTO TECNOLÓGICO 2024</p><p>Resultado: 👏 GRUPO N° ${i.value} 🥳</p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};

// Spinner count
let count = 0;
// 100 rotations for animation and last rotation for result
let resultValue = 101;

// Function to start spinning (used for both button click and key press)
const startSpinning = () => {
  spinBtn.disabled = true;
  // Empty final value
  finalValue.innerHTML = `<p style="font-size: x-large;" > Buena suerte! 🍀</p>`;
  // Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  // Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    // Set rotation for piechart
    myChart.options.rotation = myChart.options.rotation + resultValue;
    // Update chart with new value;
    myChart.update();
    // If rotation > 360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
};

// Add event listener for the spin button
spinBtn.addEventListener("click", startSpinning);

// Add event listener for the "g" key press
document.addEventListener("keydown", (event) => {
  if (event.key === "g") {
    startSpinning();
  }
});
