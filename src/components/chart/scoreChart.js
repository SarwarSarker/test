import { ArcElement, CategoryScale, Chart, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const ScoreChart = ({ stats }) => {
  // Default values in case stats is undefined or null
  const defaultStats = {
    totalPlayed: 0,
    totalCorrect: 0,
    totalWrong: 0,
    totalSkipped: 0,
    totalSubmitted: 0,
  };

  // Use stats or fallback to defaultStats
  const report = stats || defaultStats;

  // Check if all stats are 0
  const allStatsZero =
    report.totalPlayed === 0 &&
    report.totalCorrect === 0 &&
    report.totalWrong === 0 &&
    report.totalSkipped === 0 &&
    report.totalSubmitted === 0;

  // Transform the stats into the data array for the chart
  const Data = [
    { type: "Correct", score: report.totalCorrect },
    { type: "Wrong", score: report.totalWrong },
    { type: "Skipped", score: report.totalSkipped },
    { type: "Total Played", score: report.totalPlayed },
  ];

  // Chart data
  const chartData = {
    labels: Data.map((data) => data.type),
    datasets: [
      {
        label: "Score",
        data: Data.map((data) => data.score),
        backgroundColor: ["#344BFD", "#F4A79D", "#F68D2B", "#FFD200"],
        cutout: "80%",
      },
    ],
  };

  // Custom Plugin to Add Text in the Center of Doughnut Chart
  const centerTextPlugin = {
    id: "centerText",
    afterDraw(chart) {
      const { ctx, chartArea } = chart;
      const { width, height, top, left } = chartArea;

      ctx.save();

      // Set font for the total score number
      ctx.font = `2em Poppins, sans-serif`;
      ctx.font = `bold ${ctx.font}`;
      ctx.fillStyle = "#00000066";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Display totalSubmitted in the center
      const totalSubmitted = report.totalPlayed;
      const text = `${totalSubmitted}`;

      // Draw the number (first line)
      const numberY = top + height / 2 - 10;
      ctx.fillText(text, left + width / 2, numberY);

      // Set smaller font for the label "Total Played"
      ctx.font = `1em Poppins, sans-serif`;
      ctx.font = `bold ${ctx.font}`;
      const label = "Total Played";

      // Draw the label (second line) below the total number
      const labelY = top + height / 2 + 20;
      ctx.fillText(label, left + width / 2, labelY);

      ctx.restore();
    },
  };

  // Register the necessary components and the custom plugin
  Chart.register(CategoryScale, ArcElement, Tooltip, Legend, centerTextPlugin);

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Usage History",
      },
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 14,
            family: "Inter, sans-serif",
            weight: "bold",
            color: "#767676",
            textAlign: "center",
          },
          boxWidth: 10,
          boxHeight: 10,
          align: "center",

          generateLabels(chart) {
            const originalLabels =
              Chart.overrides.doughnut.plugins.legend.labels.generateLabels(
                chart
              );

            return originalLabels.map((label, index) => {
              const score = Data[index].score;
              label.text = `${label.text} ${score}`;
              return label;
            });
          },
        },
      },
    },
  };

  // If all stats are zero, show a message
  if (allStatsZero) {
    return (
      <div className="chart-container text-center mt-6">
        <h2 className="text-[#2E2E30] font-passionOne text-[18px]/5 font-bold mb-9">
          You have not played any quiz
        </h2>
      </div>
    );
  }

  // If stats are available, render the chart
  return (
    <div className="chart-container">
      <h2 className="text-center font-bold text-[18px]/5 font-passionOne text-[#2E2E30] mb-9">
        Usage History
      </h2>
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
};

export default ScoreChart;
