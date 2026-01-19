import { prisma } from "@/lib/db";
import { RegisterSchema } from "@/lib/definitions";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("Register API called");
    console.log("Env DB URL:", process.env.DATABASE_URL);

    const body = await req.json();
    console.log("Body:", body);

    const validatedFields = RegisterSchema.safeParse(body);

    if (!validatedFields.success) {
      console.log("Validation failed:", validatedFields.error);
      return NextResponse.json(
        { errors: validatedFields.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { username, password, displayName } = validatedFields.data;

    console.log("Checking existing user at " + new Date().toISOString());
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
    console.log("Existing user checked");

    if (existingUser) {
      return NextResponse.json(
        { message: "Username already taken." },
        { status: 409 },
      );
    }

    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed");

    console.log("Creating user...");
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        displayName: displayName || username,
      },
    });
    console.log("User created:", user.id);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error("Registration Error Detailed:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
