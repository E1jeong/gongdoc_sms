import coolsms from "coolsms-node-sdk";

// 환경 변수에서 API Key & Secret 가져오기
const messageService = new coolsms.default(
  process.env.COOLSMS_API_KEY,
  process.env.COOLSMS_API_SECRET
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { carNumber, ownerName, contact } = req.body;

  try {
    // CoolSMS API 호출하여 SMS 전송
    const response = await messageService.sendOne({
      to: "01022269964", // 수신자 번호
      from: process.env.COOLSMS_SENDER_PHONE, // 발신번호 (CoolSMS에서 등록한 번호)
      text: `🚜 경기종합중기 소개 신청 🚜\n- 차량번호: ${carNumber}\n- 소유자명: ${ownerName}\n- 연락처: ${contact}`,
    });

    console.log("📩 SMS 전송 성공:", response);
    return res.status(200).json({ success: true, message: "SMS 전송 완료" });
  } catch (error) {
    console.error("🚨 SMS 전송 실패:", error);
    return res
      .status(500)
      .json({ success: false, message: "SMS 전송 실패", error: error.message });
  }
}
