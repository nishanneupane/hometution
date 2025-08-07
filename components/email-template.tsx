import * as React from "react";

interface EmailTemplateProps {
    name: string;
    teacherCode: string;
}

export function EmailTemplate({ name, teacherCode }: EmailTemplateProps) {
    return (
        <div
            style={{
                fontFamily: "Arial, sans-serif",
                maxWidth: "600px",
                margin: "0 auto",
                padding: "20px",
                backgroundColor: "#f9f9f9",
            }}
        >
            <div
                style={{
                    backgroundColor: "#ffffff",
                    padding: "30px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
            >
                <h1
                    style={{
                        color: "#333",
                        fontSize: "24px",
                        marginBottom: "20px",
                    }}
                >
                    Welcome, {name}!
                </h1>
                <p
                    style={{
                        color: "#555",
                        lineHeight: "1.6",
                        marginBottom: "20px",
                    }}
                >
                    Congratulations! You have been selected as a verified teacher at
                    <strong> HRHomeTuition.com</strong>. Our admin team has reviewed and
                    approved your profile.
                </p>
                <p
                    style={{
                        color: "#555",
                        lineHeight: "1.6",
                        marginBottom: "20px",
                    }}
                >
                    Your unique teacher code is:{" "}
                    <strong>{teacherCode}</strong>
                </p>
                <p
                    style={{
                        color: "#555",
                        lineHeight: "1.6",
                        marginBottom: "20px",
                    }}
                >
                    Please keep this code confidential and do not share it with anyone.
                    This code is important for your account security and verification
                    purposes.
                </p>
                <p
                    style={{
                        color: "#555",
                        lineHeight: "1.6",
                        marginBottom: "20px",
                    }}
                >
                    We're excited to have you on board! You can now start connecting with
                    students and sharing your expertise through our platform.
                </p>
                <div
                    style={{
                        marginTop: "30px",
                        paddingTop: "20px",
                        borderTop: "1px solid #eee",
                        color: "#777",
                        fontSize: "14px",
                    }}
                >
                    <p>Best regards,</p>
                    <p>The HR Home Tuition Team</p>
                    <p>
                        <a
                            href="https://hrhometuition.com"
                            style={{ color: "#0066cc" }}
                        >
                            hrhometuition.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
