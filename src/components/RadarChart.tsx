import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { DIMENSIONS } from "../data/dimensions";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function RadarChart({
  userVec,
  mainVec,
  secondVec,
  mainName,
  secondName
}: {
  userVec: number[];
  mainVec: number[];
  secondVec?: number[];
  mainName: string;
  secondName?: string;
}) {
  const labels = DIMENSIONS.map((d) => d.name);

  const data = {
    labels,
    datasets: [
      { label: "你", data: userVec, borderWidth: 2, pointRadius: 2 },
      { label: mainName, data: mainVec, borderDash: [6, 6], borderWidth: 2, pointRadius: 0 },
      ...(secondVec && secondName
        ? [{ label: secondName, data: secondVec, borderDash: [3, 6], borderWidth: 2, pointRadius: 0 }]
        : [])
    ]
  };

  return (
    <Radar
      data={data}
      options={{
        responsive: true,
        scales: { r: { min: 0, max: 100, ticks: { display: false } } }
      }}
    />
  );
}
