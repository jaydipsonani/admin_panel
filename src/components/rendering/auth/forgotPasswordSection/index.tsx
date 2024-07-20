import React from "react";
import styles from "./forgotPasswordSection.module.scss";
import Link from "next/link";
import PhoneInputCommon from "@/components/modules/phoneInputCommon";
import { useEffect, useState } from "react";
import AuthButton from "@/components/modules/authButton";
import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input";
import { toastError, toastSuccess } from "@/utils";
import { forgotPassword } from "@/utils/api";
import { useRouter } from "next/router";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@/utils/socialLogin/Firebase";

const logoImage = "/assets/brand_logo.svg";
const email = "/assets/icons/email.svg";
const mobileNumber = "/assets/icons/mobile_number.svg";

const ForgotPasswordSection = ({ emailsss, phone }: any) => {
  const router = useRouter();

  const [loginData, setLoginData] = useState<any>({
    email: emailsss,
    phoneNumber: phone,
  });

  const [loading, setLoging] = useState(false);

  const handlechange = (e: any) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
      phoneNumber: "+91",
      country_code: "",
      mobile: "",
    });
  };

  const configureCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "rechpchaRef", {
      size: "invisible",
      defaultCountry: "IN",
    });
  };

  useEffect(() => {
    configureCaptcha();
  }, []);

  const handleOnSendOtp = async (data: any) => {
    const phoneNumber = loginData?.phoneNumber;
    const appVerifier = window.recaptchaVerifier;

    await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoging(false);

        router.push(
          `/auth/otp-verify?isForgot=true?user_id=${data?.userID}&phone=${loginData?.mobile}&country_code=${loginData?.country_code}`
        );

        data?.message && toastSuccess(data?.message);
      })
      .catch((error) => {
        setLoging(false);
        toastError("Something went wrong");
      });
  };

  const handlePhoneNumber = (value: any) => {
    const parsedNumber = value && parsePhoneNumber(value);
    setLoginData({
      ...loginData,
      email: "",
      country_code: parsedNumber?.countryCallingCode,
      mobile: parsedNumber?.nationalNumber,
      phoneNumber: value,
    });
  };

  const handleOnSubmitForm = async (e: any) => {
    e.preventDefault();

    if (
      loginData?.mobile?.length > 5 &&
      !isValidPhoneNumber(loginData?.phoneNumber)
    ) {
      // setLoginData({
      //   ...loginData,
      //   country_code: "",
      //   mobile: "",
      //   phoneNumber: "",
      // });
      toastError("Please Enter valid number");
    } else {
      setLoging(true);

      let payload = {
        email_mobile: loginData?.email || loginData?.mobile,
        device: 3,
      };
      const forgotPasswordRes = await forgotPassword({
        method: "POST",
        body: payload,
      });

      if (forgotPasswordRes?.success) {
        if (loginData?.mobile && !forgotPasswordRes?.data?.is_mobile_verified) {
          let data = {
            message: forgotPasswordRes?.message,
            userID: forgotPasswordRes?.data?.user_id,
          };

          handleOnSendOtp(data);
        } else if (
          loginData?.email &&
          !forgotPasswordRes?.data?.is_email_verified
        ) {
          forgotPasswordRes?.message &&
            toastSuccess(forgotPasswordRes?.message);
          setLoging(false);
          router.push(
            `/auth/otp-verify?isForgot=true&user_id=${
              forgotPasswordRes?.data?.user_id
            }&${`email=${loginData?.email}`}`
          );
        }
      } else {
        setLoging(false);
        toastError(forgotPasswordRes?.message);
      }
    }
  };
  return (
    <div className={styles.forgotPasswordMainSection}>
      <div className={styles.brandLogo}>
        <img src={logoImage} alt="logo" />
      </div>
      <div className={styles.forgotPasswordDiv}>
        <h1>Forgot Password</h1>
      </div>
      <div className={styles.forgotPasswordText}>
        <h4>
          Enter your registered email address and we'll send you a link to reset
          your password
        </h4>
      </div>
      <div className={styles.forgotPasswordForm}>
        <form onSubmit={(e) => handleOnSubmitForm(e)}>
          <div className={styles.formInput}>
            <label htmlFor="email">Email</label>
            <input
              required={loginData?.phoneNumber?.length > 5 ? false : true}
              name="email"
              autoComplete="on"
              id="email"
              placeholder="Enter mail address"
              type={!loginData?.email ? "text" : "email"}
              value={loginData?.email}
              onChange={(e) => handlechange(e)}
            />
            <div className={styles.inputTextIcon}>
              <img src={email} alt="Email" />
            </div>
          </div>
          <div className={styles.formOrOption}>or</div>
          <div className={styles.formInput}>
            <label htmlFor="phoneNumber">Mobile Number</label>
            <PhoneInputCommon
              handlePhoneNumber={handlePhoneNumber}
              value={loginData?.phoneNumber}
              name="phoneNumber"
            />
            <div className={styles.inputTextIcon}>
              <img src={mobileNumber} alt="mobileNumber" />
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
      <div id="rechpchaRef"></div>
    </div>
  );
};

export default ForgotPasswordSection;
