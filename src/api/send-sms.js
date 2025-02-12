import twilio from "twilio";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { carNumber, ownerName, contact } = req.body;
  const MY_PHONE_NUMBERS = ["+821022269964"]; // 한국 번호는 +82 필수 "+821054388080", "+821069759357"

  const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

  const message = `🚜 경기종합중기 소개 신청 🚜
- 차량번호: ${carNumber}
- 소유자명: ${ownerName}
- 연락처: ${contact}`;

  try {
    await Promise.all(
      MY_PHONE_NUMBERS.map((number) =>
        client.messages.create({
          body: message,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: number,
        })
      )
    );
    return res.status(200).json({ success: true, message: "SMS 전송 완료" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "SMS 전송 실패", error });
  }
}
