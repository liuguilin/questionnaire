import React, { useState } from "react";
import "../styles/common.css";

interface FormData {
  happiness: number | "";
  stress: number | "";
  satisfaction: number | "";
  socialCount: number | "";
  socialRelations: string[];
  personalActivities: string[];
  supportLevel: number | "";
  expectedSleepQuality: number | "";
}

export const EveningQuestion = () => {
  const [formData, setFormData] = useState<FormData>({
    happiness: "",
    stress: "",
    satisfaction: "",
    socialCount: "",
    socialRelations: [],
    personalActivities: [],
    supportLevel: "",
    expectedSleepQuality: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleMultiSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "socialRelations" || name === "personalActivities") {
      setFormData({
        ...formData,
        [name]: [...formData[name], value],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 校验必填项
    console.log(formData);
    if (formData.happiness === "") {
      alert("請填寫幸福感評分");
      return;
    }
    if (formData.stress === "") {
      alert("請填寫壓力評分");
      return;
    }
    if (formData.satisfaction === "") {
      alert("請填寫照顧表現滿意度評分");
      return;
    }
    if (formData.socialCount === "") {
      alert("請填寫社交人數");
      return;
    }
    if (formData.socialRelations.length === 0) {
      alert("請選擇社交關係");
      return;
    }
    if (formData.personalActivities.length === 0) {
      alert("請選擇個人活動");
      return;
    }
    if (formData.supportLevel === "") {
      alert("請填寫獲得支持程度評分");
      return;
    }
    if (formData.expectedSleepQuality === "") {
      alert("請填寫預期睡眠質量評分");
      return;
    }
  };

  return (
    <div className="container">
      <h1 className="title">晚問卷</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="formGroup">
          <label className="formLabel">
            1. 您感到幸福嗎？（請從0到10分進行打分）
          </label>
          <input
            type="number"
            name="happiness"
            min="0"
            max="10"
            value={formData.happiness}
            onChange={handleInputChange}
            className="input"
            placeholder="请输入0-10分"
          />
        </div>
        <div className="formGroup">
          <label className="formLabel">
            2. 您感到壓力嗎？（請從0到10分進行打分）
          </label>
          <input
            type="number"
            name="stress"
            min="0"
            max="10"
            value={formData.stress}
            onChange={handleInputChange}
            className="input"
            placeholder="请输入0-10分"
          />
        </div>
        <div className="formGroup">
          <label className="formLabel">
            3.
            作為家庭照顧者，您對自己今天的表現感到滿意嗎？（請從0到10分進行打分）
          </label>
          <input
            type="number"
            name="satisfaction"
            min="0"
            max="10"
            value={formData.satisfaction}
            onChange={handleInputChange}
            className="input"
            placeholder="请输入0-10分"
          />
        </div>
        <div className="formGroup">
          <label className="formLabel">
            4. 除了您照顧的家人以外，今天您和多少人說過話？請填寫數字
          </label>
          <input
            type="number"
            name="socialCount"
            min="0"
            value={formData.socialCount}
            onChange={handleInputChange}
            className="input"
            placeholder="请输入数字"
          />
        </div>
        <div className="formGroup">
          <label className="formLabel">5. 這些人和您是什關係？（可多選）</label>
          <div>
            {[
              "配偶",
              "父母",
              "子女",
              "孫子女",
              "其他家人或親戚",
              "朋友",
              "鄰居",
              "同事",
              "其他人",
            ].map((relation) => (
              <div className="checkboxItem" key={relation}>
                <input
                  className="checkboxInput"
                  type="checkbox"
                  name="socialRelations"
                  value={relation}
                  onChange={handleMultiSelect}
                />
                <span>{relation}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="formGroup">
          <label className="formLabel">
            6. 除了照顧家人，您今天是否為自己做了任何事情或活動？（可多選）
          </label>
          <div>
            {[
              "有報酬的工作",
              "志願者活動或向他人提供幫助",
              "看書看報、聽廣播或看電視",
              "使用手機或電腦上網",
              "休閒娛樂（如打牌、唱歌等）",
              "鍛煉身體",
              "出行和購物",
              "與醫療健康相關的活動",
              "和人交談（包括面對面或電話視頻交談）",
              "學習活動",
              "其他活動",
            ].map((activity) => (
              <div className="checkboxItem" key={activity}>
                <input
                  className="checkboxInput"
                  type="checkbox"
                  name="personalActivities"
                  value={activity}
                  onChange={handleMultiSelect}
                />
                <span>{activity}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="formGroup">
          <label className="formLabel">
            7. 您今天在提供照顧時是否得到了充分的支援？（請從0到10分進行打分）
          </label>
          <input
            type="number"
            name="supportLevel"
            min="0"
            max="10"
            value={formData.supportLevel}
            onChange={handleInputChange}
            className="input"
            placeholder="请输入0-10分"
          />
        </div>
        <div className="formGroup">
          <label className="formLabel">
            8. 您覺得您今晚能睡得好嗎？（請從0到10分進行打分）
          </label>
          <input
            type="number"
            name="expectedSleepQuality"
            min="0"
            max="10"
            value={formData.expectedSleepQuality}
            onChange={handleInputChange}
            className="input"
            placeholder="请输入0-10分"
          />
        </div>
        <div className="formGroup">
          <button type="submit" className="submitButton">
            提交
          </button>
        </div>
      </form>
    </div>
  );
};
