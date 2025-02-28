import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const response = await fetch(
      "https://spicy-back-6c864f36267f.herokuapp.com/status",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to check status");
    }

    const data = await response.json();
    const status = data.status;

    return NextResponse.json({ status });
  } catch (error) {
    console.error("Error during Python processing:", error); // 추가적인 에러 로그
    return NextResponse.json({
      error: "Error processing similarity calculation",
    });
  }
}
