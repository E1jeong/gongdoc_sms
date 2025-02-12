import { useState } from "react";
import "./Form.css";

function Form() {
  const [formData, setFormData] = useState({
    carNumber: "",
    ownerName: "",
    contact: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        alert("SMS 전송 완료!");
        setFormData({ carNumber: "", ownerName: "", contact: "" });
      } else {
        alert("SMS 전송 실패: " + result.message);
      }
    } catch (error) {
      alert("오류 발생!");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label>차량번호:</label>
        <input
          type="text"
          name="carNumber"
          value={formData.carNumber}
          onChange={handleChange}
          placeholder="123가4567"
          required
        />
      </div>

      <div className="form-group">
        <label>소유자명:</label>
        <input
          type="text"
          name="ownerName"
          value={formData.ownerName}
          onChange={handleChange}
          placeholder="홍길동"
          required
        />
      </div>

      <div className="form-group">
        <label>연락처:</label>
        <input
          type="tel"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="01012345678"
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "전송 중..." : "제출하기"}
      </button>
    </form>
  );
}

export default Form;
