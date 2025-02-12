import { useState } from "react";
import "./Form.css";

function Form() {
  const [formData, setFormData] = useState({
    carNumber: "",
    ownerName: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("제출된 데이터:", formData);
    alert("신청이 완료되었습니다!");
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

      <button type="submit">제출하기</button>
    </form>
  );
}

export default Form;
