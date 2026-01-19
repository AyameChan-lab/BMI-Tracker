import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const BMISchema = z.object({
  weight: z.number().positive(),
  height: z.number().positive(), // in cm
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const json = await req.json();
    const { weight, height } = BMISchema.parse(json);

    // Calculate BMI
    // BMI = weight (kg) / (height (m))^2
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    const bmi = parseFloat(bmiValue.toFixed(2));

    let result = "Normal";
    if (bmi < 18.5) result = "Underweight";
    else if (bmi >= 18.5 && bmi < 25) result = "Normal weight";
    else if (bmi >= 25 && bmi < 30) result = "Overweight";
    else result = "Obesity";

    const record = await prisma.bMIRecord.create({
      data: {
        userId: session.user.id,
        weight,
        height,
        bmi,
        result,
      },
    });

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    console.error("BMI Save Error:", error);
    return NextResponse.json(
      { message: "Invalid input or server error" },
      { status: 400 },
    );
  }
}

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const history = await prisma.bMIRecord.findMany({
      where: { userId: session.user.id },
      orderBy: { date: "desc" },
      take: 20, // Limit to recent 20 for history view
    });
    return NextResponse.json(history);
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
