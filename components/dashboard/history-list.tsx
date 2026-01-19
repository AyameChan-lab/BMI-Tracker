import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BMIRecord {
    id: string;
    date: Date;
    weight: number;
    height: number;
    bmi: number;
    result: string;
}

export function HistoryList({ history }: { history: BMIRecord[] }) {
    if (history.length === 0) {
        return (
            <Card className="h-full bg-white/5 backdrop-blur-xl border-white/10 flex items-center justify-center p-6 text-center text-muted-foreground">
                <div className="space-y-2">
                    <p className="text-xl font-medium">No records yet</p>
                    <p className="text-sm">Calculate your BMI to start tracking.</p>
                </div>
            </Card>
        );
    }

    return (
        <Card className="h-full bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden">
            <CardHeader className="pb-3 border-b border-white/10">
                <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">History</CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-y-auto max-h-[500px]">
                <table className="w-full text-sm">
                    <thead className="bg-white/5 text-muted-foreground font-medium">
                        <tr>
                            <th className="px-4 py-3 text-left">Date</th>
                            <th className="px-4 py-3 text-right">BMI</th>
                            <th className="px-4 py-3 text-right">Weight</th>
                            <th className="px-4 py-3 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {history.map((record) => (
                            <tr key={record.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-4 py-3">{new Date(record.date).toLocaleDateString()}</td>
                                <td className="px-4 py-3 text-right font-semibold">{record.bmi}</td>
                                <td className="px-4 py-3 text-right text-muted-foreground">{record.weight}kg</td>
                                <td className="px-4 py-3">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                                        ${record.result === "Normal weight" ? "bg-success/20 text-success" :
                                            record.result === "Overweight" ? "bg-warning/20 text-warning" :
                                                record.result === "Obesity" || record.result === "Underweight" ? "bg-danger/20 text-danger" : "bg-primary/20 text-primary"}`}>
                                        {record.result}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    );
}
