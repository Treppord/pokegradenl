import { NextRequest, NextResponse } from "next/server";
import MollieService from "@/services/mollieService";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get("id");

    if (!paymentId) {
      return NextResponse.json(
        { error: "Payment ID is required" },
        { status: 400 }
      );
    }

    const mollieService = new MollieService();
    const payment = await mollieService.getPayment(paymentId);

    return NextResponse.json({
      success: true,
      payment: {
        id: payment.id,
        status: payment.status,
        amount: payment.amount,
        description: payment.description,
        metadata: payment.metadata,
        isPaid: payment.status === "paid",
        isCanceled: payment.status === "canceled",
        isExpired: payment.status === "expired",
        isFailed: payment.status === "failed",
      },
    });
  } catch (error) {
    console.error("Payment status error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to get payment status",
      },
      { status: 500 }
    );
  }
}
