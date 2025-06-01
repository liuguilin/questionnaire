import React, { useState } from "react";
import "../styles/common.css";
import { callNativeJsBridge } from "../utils";

interface FormData {
    sleepQuality: number | "";
    energyLevel: number | "";
    needCare: string | "";
    careMembers: string[];
    careActivities: string[];
    otherActivity: string;
}

export const MorningQuestion = () => {
    const [formData, setFormData] = useState<FormData>({
        sleepQuality: "",
        energyLevel: "",
        needCare: "",
        careMembers: [],
        careActivities: [],
        otherActivity: "",
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
        if (name === "careMembers" || name === "careActivities") {
            setFormData({
                ...formData,
                [name]: [...formData[name], value],
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const submitData = [
            {
                qid: 1,
                answer:
                    formData.sleepQuality === "" ? [] : [formData.sleepQuality],
            },
            {
                qid: 2,
                answer:
                    formData.energyLevel === "" ? [] : [formData.energyLevel],
            },
            {
                qid: 3,
                answer: formData.needCare === "" ? [] : [formData.needCare],
            },
            { qid: 4, answer: formData.careMembers },
            {
                qid: 5,
                answer: formData.otherActivity
                    ? [...formData.careActivities, formData.otherActivity]
                    : formData.careActivities,
            },
        ];

        callNativeJsBridge(submitData);
    };

    return (
        <div className="container">
            <h1 className="title">早問卷</h1>
            <form onSubmit={handleSubmit} className="form">
                <div className="formGroup">
                    <label className="formLabel">
                        1. 您昨天晚上睡得好嗎？（請從0到10分進行打分）
                    </label>
                    <input
                        type="number"
                        name="sleepQuality"
                        min="0"
                        max="10"
                        value={formData.sleepQuality}
                        onChange={handleInputChange}
                        className="input"
                        placeholder="请输入0-10分"
                    />
                </div>
                <div className="formGroup">
                    <label className="formLabel">
                        2.
                        今天起床後，您是否感到精力充沛？（請從0到10分進行打分）
                    </label>
                    <input
                        type="number"
                        name="energyLevel"
                        min="0"
                        max="10"
                        value={formData.energyLevel}
                        onChange={handleInputChange}
                        className="input"
                        placeholder="请输入0-10分"
                    />
                </div>
                <div className="formGroup">
                    <label className="formLabel">
                        3. 您今天是否要為家庭成員提供照顧？
                    </label>
                    <div className="radioGroup">
                        <label className="radioLabel">
                            <input
                                type="radio"
                                name="needCare"
                                checked={formData.needCare === "需要"}
                                onChange={() =>
                                    setFormData({
                                        ...formData,
                                        needCare: "需要",
                                    })
                                }
                            />
                            <span>需要</span>
                        </label>
                        <label className="radioLabel">
                            <input
                                type="radio"
                                name="needCare"
                                checked={formData.needCare === "不需要"}
                                onChange={() =>
                                    setFormData({
                                        ...formData,
                                        needCare: "不需要",
                                    })
                                }
                            />
                            <span>不需要</span>
                        </label>
                    </div>
                </div>
                <div className="formGroup">
                    <label className="formLabel">
                        4. 今天需要照顧的家庭成員為（可多選）
                    </label>
                    <div>
                        {["老人", "孩子", "伴侶", "其他親屬"].map((member) => (
                            <div className="checkboxItem" key={member}>
                                <input
                                    className="checkboxInput"
                                    type="checkbox"
                                    name="careMembers"
                                    value={member}
                                    onChange={handleMultiSelect}
                                />
                                <span>{member}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="formGroup">
                    <label className="formLabel">
                        5.
                        作為家庭照顧者，您今天需要做哪些具體的事項或活動？（從以下事項中選擇，可多選）
                    </label>
                    <div>
                        {[
                            "協助工具性事務",
                            "協助日常基本生活",
                            "情緒方面的支持",
                            "監督和陪同",
                            "直接或間接的經濟支持",
                            "照顧小孩",
                        ].map((activity) => (
                            <div className="checkboxItem" key={activity}>
                                <input
                                    className="checkboxInput"
                                    type="checkbox"
                                    name="careActivities"
                                    value={activity}
                                    onChange={handleMultiSelect}
                                />
                                <span>{activity}</span>
                            </div>
                        ))}
                        <div className="formGroup">
                            <div className="otherLabel">其他，請填寫</div>
                            <input
                                type="text"
                                name="otherActivity"
                                value={formData.otherActivity}
                                onChange={handleInputChange}
                                className="otherInput"
                                placeholder="请输入"
                            />
                        </div>
                    </div>
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
