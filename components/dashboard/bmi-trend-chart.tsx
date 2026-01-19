'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, CartesianGrid } from 'recharts';

interface ChartProps {
    data: {
        bmi: number;
        date: Date;
    }[];
}

export function BMITrendChart({ data }: ChartProps) {
    // Reverse data for chart (oldest to newest)
    const chartData = [...data].reverse().map(d => ({
        ...d,
        dateStr: new Date(d.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    }));

    if (data.length < 2) return null;

    return (
        <Card className="col-span-4 bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader>
                <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">BMI Trend</CardTitle>
            </CardHeader>
            <CardContent className="pl-0">
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.1} />
                            <XAxis
                                dataKey="dateStr"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                domain={['dataMin - 1', 'dataMax + 1']}
                            />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="rounded-lg border border-border/50 bg-background/80 p-2 shadow-sm backdrop-blur-sm">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="flex flex-col">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
                                                        <span className="font-bold text-muted-foreground">{payload[0].payload.dateStr}</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">BMI</span>
                                                        <span className="font-bold text-primary">{payload[0].value}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    return null
                                }}
                            />
                            {/* Reference Lines */}
                            <ReferenceLine y={18.5} stroke="hsl(var(--warning))" strokeDasharray="3 3" />
                            <ReferenceLine y={25} stroke="hsl(var(--success))" strokeDasharray="3 3" />
                            <ReferenceLine y={30} stroke="hsl(var(--danger))" strokeDasharray="3 3" />

                            <Line
                                type="monotone"
                                dataKey="bmi"
                                stroke="hsl(var(--primary))"
                                strokeWidth={3}
                                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
