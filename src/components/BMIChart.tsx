
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ReferenceLine, ResponsiveContainer } from "recharts";
import { Scale } from "lucide-react";

interface BMIChartProps {
  bmi: number;
  currentWeight: number;
  idealWeightMin: number;
  idealWeightMax: number;
}

const BMIChart = ({ bmi, currentWeight, idealWeightMin, idealWeightMax }: BMIChartProps) => {
  // Create data for the BMI categories
  const data = [
    { name: "Abaixo do peso", range: "< 18.5", value: 18.5, color: "#3b82f6" },
    { name: "Peso normal", range: "18.5-24.9", value: 24.9 - 18.5, color: "#22c55e" },
    { name: "Sobrepeso", range: "25-29.9", value: 29.9 - 25, color: "#eab308" },
    { name: "Obesidade I", range: "30-34.9", value: 34.9 - 30, color: "#f97316" },
    { name: "Obesidade II", range: "35-39.9", value: 39.9 - 35, color: "#ef4444" },
    { name: "Obesidade III", range: "> 40", value: 10, color: "#b91c1c" },
  ];

  // Calculate the position for the marker
  const calculateMarkerPosition = () => {
    if (bmi < 18.5) return 18.5 / 2;
    if (bmi < 25) return 18.5 + (bmi - 18.5) / 2;
    if (bmi < 30) return 25 + (bmi - 25) / 2;
    if (bmi < 35) return 30 + (bmi - 30) / 2;
    if (bmi < 40) return 35 + (bmi - 35) / 2;
    return 45; // For BMI >= 40
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="p-2 bg-zinc-800 border border-zinc-700 rounded-md text-white text-xs">
          <p className="font-bold">{data.name}</p>
          <p>IMC: {data.range}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-zinc-900 p-4 rounded-lg border border-zinc-800 my-4">
      <div className="flex items-center mb-3 text-primary">
        <Scale className="mr-2 h-5 w-5" />
        <h3 className="font-semibold">Seu IMC: {bmi}</h3>
      </div>
      
      <div className="h-[180px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            barCategoryGap={1}
            margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis type="number" hide domain={[0, 50]} />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              axisLine={false}
              width={100}
              tick={{ fill: "white", fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="value"
              isAnimationActive={true}
              animationDuration={1000}
              barSize={20}
              radius={[0, 4, 4, 0]}
            >
              {data.map((entry, index) => (
                <rect key={`rect-${index}`} fill={entry.color} />
              ))}
            </Bar>
            <ReferenceLine
              x={calculateMarkerPosition()}
              stroke="#ffffff"
              strokeWidth={2}
              strokeDasharray="3 3"
              isFront={true}
              label={{
                value: "Você",
                fill: "#ffffff",
                position: "top",
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-3 p-3 bg-zinc-800 rounded border border-zinc-700 text-sm">
        <p className="text-white mb-2">
          <span className="font-semibold">Seu peso atual:</span> {currentWeight} kg
        </p>
        <p className="text-primary">
          <span className="font-semibold">Peso ideal:</span> {idealWeightMin}-{idealWeightMax} kg
        </p>
      </div>
    </div>
  );
};

export default BMIChart;
