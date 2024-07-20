import React from "react";
import styles from "./updatePasswordSection.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import AuthButton from "@/components/modules/authButton";
import { useRouter } from "next/router";
import { resetPassword } from "@/utils/api";
import { toastError, toastSuccess } from "@/utils";
const logoImage = "/assets/brand_logo.svg";
const passwordHide = "/assets/icons/password_hide.svg";
const passwordShow = "/assets/icons/password_show.svg";
const password = "/assets/icons/password.svg";

const UpdatePasswordSection = () => {
  const router = useRouter();
  const email_mobile = router?.query?.email_mobile;
  const [loading, setLoging] = useState(false);

  const [resetData, setResetData] = useState<any>({
    newPassword: null,
    repassword: null,
  });

  const [eyeOpen, setEyeOpen] = useState({
    newPassword: false,
    repassword: false,
  });

  const handlechange = (e: any) => {
    const { name, value } = e.target;
    const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;
    let sanitizedValue = value.replace(emojiRegex, "");

    sanitizedValue = sanitizedValue.trimStart();

    const finalValue = value.replace(/\s/g, "");
    setResetData({ ...resetData, [name]: finalValue });
  };

  const handleForm = async (e: any) => {
    e.preventDefault();
    setLoging(true);

    if (email_mobile) {
      let payload = {
        email_mobile: email_mobile,
        step: 2,
        device: 3,
        password: resetData?.repassword,
      };
      const resetPasswordRes = await resetPassword({
        method: "POST",
        body: payload,
      });

      if (resetPasswordRes?.success) {
        setLoging(false);
        router.push(`/auth/login`);
        resetPasswordRes?.message && toastSuccess(resetPasswordRes?.message);
      } else {
        setLoging(false);
        toastError(resetPasswordRes?.message);
      }
    } else {
      router.push("/signin");
    }
  };

  useEffect(() => {
    if (!email_mobile) {
      router.push("/auth/login");
    }
  }, []);
  
  return (
    <div className={styles.setNewPasswordMainSection}>
      <div className={styles.brandLogo}>
        <img src={logoImage} alt="logo" />
      </div>
      <div className={styles.setNewPasswordDiv}>
        <h1>Set New Password</h1>
      </div>

      <div className={styles.setNewPasswordForm}>
        <form onSubmit={(e) => handleForm(e)}>
          <div className={styles.formInput}>
            <label htmlFor="newPassword">New Password</label>

            <input
              required
              name="newPassword"
              autoComplete="on"
              id="newPassword"
              pattern=".{6,}"
              title="Must contain at least 6 or more characters"
              placeholder="Enter your New password"
              type={eyeOpen?.newPassword === true ? " text" : "password"}
              value={resetData?.newPassword}
              onChange={(e) => handlechange(e)}
            />

            <div className={styles.inputTextIcon}>
              <img src={password} alt="password" />
            </div>
            <div className={styles.passwodHideShowMain}>
              <div
                className={styles.paaswordHideShow}
                onClick={() =>
                  setEyeOpen({
                    ...eyeOpen,
                    newPassword: !eyeOpen?.newPassword,
                  })
                }
              >
                <img
                  src={eyeOpen?.newPassword ? passwordShow : passwordHide}
                  alt="eye"
                />
              </div>
            </div>
          </div>

          <div className={styles.formInput}>
            <label htmlFor="repassword">Confirm Password</label>
            <input
              required
              title="Please match Password & Confirm Password"
              name="repassword"
              autoComplete="on"
              id="repassword"
              pattern={resetData?.newPassword}
              placeholder="Repeat your new password"
              type={eyeOpen?.repassword === true ? " text" : "password"}
              value={resetData?.repassword}
              onChange={(e) => handlechange(e)}
            />

            <div className={styles.inputTextIcon}>
              <img src={password} alt="password" />
            </div>

            <div className={styles.passwodHideShowMain}>
              <div
                className={styles.paaswordHideShow}
                onClick={() =>
                  setEyeOpen({
                    ...eyeOpen,
                    repassword: !eyeOpen?.repassword,
                  })
                }
              >
                <img
                  src={eyeOpen?.repassword ? passwordShow : passwordHide}
                  alt="eye"
                />
              </div>
            </div>
          </div>
          <AuthButton title="Submit" loading={loading} />
          <div className={styles.conditionsLink}>
            <div className={styles.termsCondition}>
              <Link href="/terms-and-conditions">Terms & Conditions</Link> 
            </div>
            <div className={styles.centerLine}></div>
            <div className={styles.priavcyPolicy}>
              {" "}
              <Link href="/privacy-policy">Privacy Policy</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePasswordSection;
