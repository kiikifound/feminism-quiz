import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function TopBarChart({ labels, values }: { labels: string[]; values: number[] }) {
  const data = { labels, datasets: [{ label: "接近度", data: values }] };
  return (
    <Bar
      data={data}
      options={{
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { min: 0, max: 100 } }
      }}
    />
  );
}
