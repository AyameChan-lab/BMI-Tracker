import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import BMICalculator from "@/components/dashboard/bmi-calculator";
import { HistoryList } from "@/components/dashboard/history-list";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { BMITrendChart } from "@/components/dashboard/bmi-trend-chart";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await auth();
    if (!session?.user?.id) {
        redirect("/login");
    }

    // Fetch more records for meaningful stats and charts
    const history = await prisma.bMIRecord.findMany({
        where: { userId: session.user.id },
        orderBy: { date: 'desc' },
        take: 100,
    });

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            {/* Stats Section */}
            <StatsCards data={history} />

            <div className="grid gap-6 md:grid-cols-3">
                {/* Calculator Section */}
                <div className="md:col-span-1 h-full">
                    <BMICalculator />
                </div>

                {/* Chart Section */}
                <div className="md:col-span-2 h-full">
                    <BMITrendChart data={history} />
                </div>
            </div>

            {/* History List Section */}
            <div className="w-full">
                <HistoryList history={history.slice(0, 20)} />
            </div>
        </div>
    );
}
