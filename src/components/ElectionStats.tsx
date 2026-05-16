import { AppData, Candidate, Position } from "../types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface ElectionStatsProps {
  data: AppData;
  positionId: string;
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

export const ElectionStats = ({ data, positionId }: ElectionStatsProps) => {
  const position = data.positions.find((p) => p.id === positionId);
  const candidates = data.candidates.filter((c) => c.positionId === positionId);

  const chartData = candidates.map((c) => ({
    name: c.name,
    votes: c.votes,
  }));

  if (!position) return null;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{position.title} - Live Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 40, right: 40 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" hide />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={100} 
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="votes" radius={[0, 4, 4, 0]} barSize={32}>
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          {candidates.sort((a, b) => b.votes - a.votes).map((c, i) => (
            <div key={c.id} className="flex items-center justify-between text-sm">
              <span className="font-medium">{c.name}</span>
              <span className="text-muted-foreground">{c.votes} votes ({data.voters.length > 0 ? Math.round((c.votes / data.voters.reduce((acc, curr) => acc + curr.hasVoted.length, 1)) * 100) : 0}%)</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};