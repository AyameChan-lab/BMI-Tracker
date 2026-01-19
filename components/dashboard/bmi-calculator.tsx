'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function BMICalculator({ onSave }: { onSave?: () => void }) {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [result, setResult] = useState<{ bmi: number; status: string } | null>(null);
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    const calculateBMI = (e: React.FormEvent) => {
        e.preventDefault();
        const w = parseFloat(weight);
        const h = parseFloat(height);

        if (w > 0 && h > 0) {
            const hM = h / 100;
            const bmiValue = w / (hM * hM);
            let status = "Normal";
            if (bmiValue < 18.5) status = "Underweight";
            else if (bmiValue < 25) status = "Normal weight";
            else if (bmiValue < 30) status = "Overweight";
            else status = "Obesity";

            setResult({ bmi: parseFloat(bmiValue.toFixed(2)), status });
        }
    };

    const saveRecord = async () => {
        if (!result) return;
        setSaving(true);
        try {
            const res = await fetch('/api/bmi', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    weight: parseFloat(weight),
                    height: parseFloat(height),
                }),
            });
            if (res.ok) {
                setWeight('');
                setHeight('');
                setResult(null);
                if (onSave) onSave();
                router.refresh();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const getStatusColor = (status: string) => {
        if (status === "Normal weight") return "text-success";
        if (status === "Overweight") return "text-warning";
        return "text-danger";
    };

    return (
        <Card className="h-full bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader>
                <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    BMI Calculator
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <form onSubmit={calculateBMI} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Weight (kg)"
                            type="number"
                            placeholder="0"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="bg-background/20"
                            required
                        />
                        <Input
                            label="Height (cm)"
                            type="number"
                            placeholder="0"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="bg-background/20"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                        Calculate
                    </Button>
                </form>

                {result && (
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-background/50 to-background/20 border border-border animate-fade-in text-center space-y-2 relative overflow-hidden">
                        <div className={`absolute inset-0 opacity-10 ${result.status === "Normal weight" ? "bg-success" : result.status === "Overweight" ? "bg-warning" : "bg-danger"}`}></div>
                        <p className="text-muted-foreground font-medium relative z-10">Your BMI is</p>
                        <h3 className="text-5xl font-bold relative z-10">{result.bmi}</h3>
                        <p className={`text-lg font-semibold relative z-10 ${getStatusColor(result.status)}`}>
                            {result.status}
                        </p>
                        <Button
                            onClick={saveRecord}
                            disabled={saving}
                            variant="secondary"
                            className="mt-4 w-full relative z-10"
                        >
                            {saving ? 'Saving...' : 'Save Record'}
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
