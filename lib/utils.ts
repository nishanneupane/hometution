import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertToAmPm = (time: string): string => {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const adjustedHours = hours % 12 || 12;
  return `${adjustedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

export function getTimeAgo(date: Date | string): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  if (weeks < 4) return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;

  return `${years} year${years === 1 ? "" : "s"} ago`;
}

export function formatSalary(amount: number | string): string {
  if (!amount) return "Rs 0";
  const num = Number(amount);
  return `Rs ${num.toLocaleString("en-IN")}`;
}

export function generateApprovalEmailHTML(
  name: string,
  teacherCode: string
): string {
  return `
    <div style="font-family: 'Segoe UI', sans-serif; background-color: #f5f7fa; padding: 0; margin: 0;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <div style="background: linear-gradient(90deg, #2563eb, #1e40af); padding: 30px; text-align: center; color: white;">
          <img src="https://hrhometuition.com/images/hrlogo.png" alt="HR Home Tuition" style="max-width: 80px; margin-bottom: 15px;" />
          <h1 style="margin: 0; font-size: 26px; font-weight: 600;">Welcome to HR Home Tuition</h1>
        </div>

        <!-- Body -->
        <div style="padding: 30px;">
          <h2 style="color: #111827; font-size: 22px; font-weight: 600; margin-top: 0;">Hi ${name},</h2>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            🎉 Congratulations! You are now a <strong>Verified Teacher</strong> on 
            <strong>HRHomeTuition.com</strong>. Our admin team has reviewed and approved your profile.
          </p>

          <div style="background-color: #f3f4f6; border-radius: 8px; padding: 15px 20px; margin-bottom: 20px; text-align: center;">
            <p style="margin: 0; font-size: 16px; color: #374151;">Your Teacher Code:</p>
            <p style="margin: 5px 0 0; font-size: 20px; font-weight: bold; color: #1e40af;">${teacherCode}</p>
          </div>

          <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
            Please keep this code confidential and do not share it with anyone. It’s important for your 
            account security and verification purposes.
          </p>

          <p style="color: #4b5563; font-size: 15px; line-height: 1.6;">
            You can now connect with students and start teaching. Let’s make learning better together!  
          </p>

          <div style="text-align: center; margin-top: 25px;">
            <a href="https://hrhometuition.com" 
              style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; font-size: 16px; border-radius: 6px; text-decoration: none; font-weight: 500;">
              Visit Website
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #6b7280;">
          <p style="margin: 0;">📍 Dilli Bazar, Kathmandu, Nepal</p>
          <p style="margin: 0;">📞 +977 9767482282</p>
          <p style="margin-top: 8px;">
            <a href="https://hrhometuition.com" style="color: #2563eb; text-decoration: none;">hrhometuition.com</a>
          </p>
        </div>

      </div>
    </div>
  `;
}

export function generatePasswordResetEmailHTML(name: string): string {
  return `
    <div style="font-family: 'Segoe UI', sans-serif; background-color: #f5f7fa; padding: 0; margin: 0;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <div style="background: linear-gradient(90deg, #2563eb, #1e40af); padding: 30px; text-align: center; color: white;">
          <img src="https://hrhometuition.com/images/hrlogo.png" alt="HR Home Tuition" style="max-width: 80px; margin-bottom: 15px;" />
          <h1 style="margin: 0; font-size: 26px; font-weight: 600;">Password Changed</h1>
        </div>

        <!-- Body -->
        <div style="padding: 30px;">
          <h2 style="color: #111827; font-size: 22px; font-weight: 600; margin-top: 0;">Hi ${name},</h2>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            This is just a quick confirmation that your password for 
            <strong>HR Home Tuition</strong> has been successfully updated.  
          </p>

          <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px 20px; border-radius: 6px; margin-bottom: 20px;">
            <p style="margin: 0; color: #92400e; font-size: 15px;">
              If you didn’t make this change, please contact our support team immediately.
            </p>
          </div>

          <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
            Your account security is our top priority — we recommend not reusing passwords and enabling extra security measures where possible.
          </p>

          <div style="text-align: center; margin-top: 25px;">
            <a href="https://hrhometuition.com/login" 
              style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; font-size: 16px; border-radius: 6px; text-decoration: none; font-weight: 500;">
              Login to Your Account
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #6b7280;">
          <p style="margin: 0;">📍 Dilli Bazar, Kathmandu, Nepal</p>
          <p style="margin: 0;">📞 +977 9767482282</p>
          <p style="margin-top: 8px;">
            <a href="https://hrhometuition.com" style="color: #2563eb; text-decoration: none;">hrhometuition.com</a>
          </p>
        </div>

      </div>
    </div>
  `;
}

export function generateTuitionRequestApproval(
  teacherName: string,
  vacancyDetails: {
    requestType: "student" | "school";
    name: string;
    phone: string;
    location: string;
    subjects: string;
    preferredTime: string;
    expectedFees?: string;
    salary?: string;
    vacancyId: string;
  }
): string {
  return `
    <div style="font-family: 'Segoe UI', sans-serif; background-color: #f5f7fa; padding: 0; margin: 0;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <div style="background: linear-gradient(90deg, #2563eb, #1e40af); padding: 30px; text-align: center; color: white;">
          <img src="https://hrhometuition.com/images/hrlogo.png" alt="HR Home Tuition" style="max-width: 80px; margin-bottom: 15px; border-radius: 50%;" />
          <h1 style="margin: 0; font-size: 26px; font-weight: 600;">Application Approved!</h1>
        </div>

        <!-- Body -->
        <div style="padding: 30px;">
          <h2 style="color: #111827; font-size: 22px; font-weight: 600; margin-top: 0;">Hi ${teacherName},</h2>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Your application for the following tuition request has been approved. Here are the details:
          </p>

          <ul style="color: #4b5563; font-size: 15px; line-height: 1.6; padding-left: 20px; margin-bottom: 20px;">
            <li><strong>${
              vacancyDetails.requestType === "school" ? "School" : "Student"
            } Name:</strong> ${vacancyDetails.name}</li>
            <li><strong>Phone/WhatsApp:</strong> ${vacancyDetails.phone}</li>
            <li><strong>Location:</strong> ${vacancyDetails.location}</li>
            <li><strong>Subjects:</strong> ${vacancyDetails.subjects}</li>
            <li><strong>Preferred Time:</strong> ${
              vacancyDetails.preferredTime
            }</li>
            ${
              vacancyDetails.requestType === "school"
                ? vacancyDetails.expectedFees
                  ? `<li><strong>Salary:</strong> ${vacancyDetails.expectedFees}</li>`
                  : ""
                : vacancyDetails.expectedFees
                ? `<li><strong>Expected Fees:</strong> ${vacancyDetails.expectedFees}</li>`
                : ""
            }
          </ul>

          <p style="color: #6b7280; font-size: 13px; font-style: italic; margin-bottom: 25px;">
            If you can’t find this listing easily, visit the career page and search by location or vacancy ID: <strong>${
              vacancyDetails.vacancyId
            }</strong>.
          </p>

          <div style="text-align: center;">
            <a href="https://hrhometuition.com/careers?id=${
              vacancyDetails.vacancyId
            }"
              style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; font-size: 16px; border-radius: 6px; text-decoration: none; font-weight: 500;">
              View Details
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #6b7280;">
          <p style="margin: 0;">📍 Dilli Bazar, Kathmandu, Nepal</p>
          <p style="margin: 0;">📞 +977 9767482282</p>
          <p style="margin-top: 8px;">
            <a href="https://hrhometuition.com" style="color: #2563eb; text-decoration: none;">hrhometuition.com</a>
          </p>
        </div>

      </div>
    </div>
  `;
}

export function generateOfficeInvitationSimple(teacherName: string): string {
  return `
    <div style="font-family: 'Segoe UI', sans-serif; background-color: #f5f7fa; padding: 0; margin: 0;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <div style="background: linear-gradient(90deg, #2563eb, #1e40af); padding: 30px; text-align: center; color: white;">
          <img src="https://hrhometuition.com/images/hrlogo.png" alt="HR Home Tuition" style="max-width: 80px; margin-bottom: 15px; border-radius: 50%;" />
          <h1 style="margin: 0; font-size: 26px; font-weight: 600;">Office Visit Invitation</h1>
        </div>

        <!-- Body -->
        <div style="padding: 30px;">
          <h2 style="color: #111827; font-size: 22px; font-weight: 600; margin-top: 0;">Hi ${teacherName},</h2>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            Please come to our office located at Dilli Bazar, Kathmandu, Nepal. We’d like to discuss your application in person.
          </p>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            Call us at +977 9767482282 to schedule your visit or if you have any questions.
          </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #6b7280;">
          <p style="margin: 0;">📍 Dilli Bazar, Kathmandu, Nepal</p>
          <p style="margin: 0;">📞 +977 9767482282</p>
          <p style="margin-top: 8px;">
            <a href="https://hrhometuition.com" style="color: #2563eb; text-decoration: none;">hrhometuition.com</a>
          </p>
        </div>

      </div>
    </div>
  `;
}
