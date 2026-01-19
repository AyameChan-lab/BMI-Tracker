import { Card, CardContent } from "@/components/ui/card";
import { Activity, Scale, TrendingDown, TrendingUp, Calendar } from "lucide-react";

interface StatsProps {
    data: {
        bmi: number;
        weight: number;
        date: Date;
    }[];
}

export function StatsCards({ data }: StatsProps) {
    if (data.length === 0) return null;

    const current = data[0]; // Assuming sorted desc
    const previous = data.length > 1 ? data[1] : current;

    const bmiDiff = current.bmi - previous.bmi;
    const weightDiff = current.weight - previous.weight;

    const avgBMI = (data.reduce((acc, curr) => acc + curr.bmi, 0) / data.length).toFixed(1);
    const minBMI = Math.min(...data.map(d => d.bmi));
    const maxBMI = Math.max(...data.map(d => d.bmi));

    interface StatItem {
        title: string;
        value: string | number;
        change?: number;
        icon: React.ElementType;
        color: string;
    }

    const items: StatItem[] = [
        {
            title: "Current BMI",
            value: current.bmi,
            change: bmiDiff,
            icon: Activity,
            color: "text-primary"
        },
        {
            title: "Current Weight",
            value: `${current.weight}kg`,
            change: weightDiff,
            icon: Scale,
            color: "text-secondary"
        },
        {
            title: "Average BMI",
            value: avgBMI,
            icon: Calendar,
            color: "text-warning"
        },
        {
            title: "Range",
            value: `${minBMI} - ${maxBMI}`,
            icon: TrendingUp,
            color: "text-success"
        }
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {items.map((item, index) => (
                <Card key={index} className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-colors">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between space-y-0 pb-2">
                            <p className="text-sm font-medium text-muted-foreground">{item.title}</p>
                            <item.icon className={`h-4 w-4 ${item.color}`} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="text-2xl font-bold">{item.value}</div>
                            {item.change !== undefined && (
                                <p className={`text-xs ${item.change > 0 ? "text-danger" : item.change < 0 ? "text-success" : "text-muted-foreground"}`}>
                                    {item.change > 0 && item.title.includes("Weight") ? "+" : item.change > 0 ? "+" : ""}
                                    {typeof item.change === 'number' ? item.change.toFixed(1) : item.change}
                                    {item.change !== 0 && " from last"}
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
