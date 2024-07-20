import React, { useEffect, useState } from 'react'
import styles from "./singUpSection.module.scss";
import Link from "next/link";
import LoginSingupToggle from "@/components/modules/loginSingupToggle";
import PhoneInputCommon from "@/components/modules/phoneInputCommon";
import { signupNewUser } from "@/utils/api";
import GoogleLogin from "@/components/modules/googleLogin";
import { useRouter } from "next/router";
import { toastError, toastSuccess } from "@/utils";
import AuthButton from "@/components/modules/authButton";
import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@/utils/socialLogin/Firebase";
const name = "/assets/icons/name.svg";
const email = "/assets/icons/email.svg";
const password = "/assets/icons/password.svg";
const phoneNumberIcon = "/assets/icons/number_with_signup.svg";
const emailBlackWhiteIcon = "/assets/icons/emailBlackWhiteIcon.svg";
const passwordHide = "/assets/icons/password_hide.svg";
const passwordShow = "/assets/icons/password_show.svg";

const SingUpSection = () => {
  const [loginData, setLoginData] = useState<any>({ agreeCoditions: false });
  const [eyeOpen, setEyeOpen] = useState(false);
  const [loginViePhone, setLoginViePhone] = useState(false);
  const [loading, setLoging] = useState(false);
  const router = useRouter();

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
        data?.message && toastSuccess(data?.message);
        router.push(
          `/auth/otp-verify?user_id=${data?.userID}&phone=${loginData?.mobile}&country_code=${loginData?.country_code}`
        );
      })
      .catch((error) => {
        setLoging(false);
        toastError("Something went wrong");
      });
  };

  const handleOnSubmitForm = async (e: any) => {
    e.preventDefault();

    if (loginViePhone && !isValidPhoneNumber(loginData?.phoneNumber)) {
      // setLoginData({
      //   ...loginData,
      //   country_code: "",
      //   mobile: "",
      //   phoneNumber: "",
      // });
      toastError("Please Enter valid number");
    } else {
      setLoging(true);
      // const fcmToken = await requestNotificationPermission();
      const fcmToken =
      "f7I7KPWww7vjRV-JLa8ZYM:APA91bHx9uDcLvWC4zNXKNFuXRt1KJ6Rs_sIjAbM8pwto1cic2KJgDg7ylWJe_0TwHB4avAGLGIeknujj3UVq0Acq0UFawx0r7gnJzpoNNpIm8bdYvDqHaOqrme7HLHCq377cnyMTlHw";

      let payload = {
        account_type: loginViePhone ? 2 : 1, //1 => email, 2 =>phone number, 3 => google login, 4 => apple login
        full_name: loginData?.name,
        email: loginData?.email,
        mobile: loginData?.mobile,
        country_code: loginData?.country_code,
        password: loginData?.password,
        fcm_id: fcmToken || "",
        device: 3,
      };

      const signup = await signupNewUser({
        method: "POST",
        body: payload,
      });
      if (signup?.success) {
        if (loginViePhone) {
          let data = {
            message: signup?.message,
            userID: signup?.data?.user_id,
          };

          handleOnSendOtp(data);
        } else {
          signup?.message && toastSuccess(signup?.message);
          setLoging(false);
          router.push(
            `/auth/otp-verify?user_id=${signup?.data?.user_id}&email=${loginData?.email}`
          );
        }
      } else {
        setLoging(false);
        toastError(signup?.message);
      }
    }
  };

  const handlechange = (e: any) => {
    const { name, value } = e.target;
    const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;
    let sanitizedValue = value.replace(emojiRegex, "");

    sanitizedValue = sanitizedValue.trimStart();

    const finalValue =
      name === "password" ? sanitizedValue.replace(/\s/g, "") : sanitizedValue;
    if (name === "agreeCoditions") {
      setLoginData({ ...loginData, [name]: !loginData?.agreeCoditions });
    } else {
      setLoginData({ ...loginData, [name]: finalValue });
    }
  };

  const handlePhoneNumber = (value: any) => {
    const parsedNumber = value && parsePhoneNumber(value);

    setLoginData({
      ...loginData,
      country_code: parsedNumber?.countryCallingCode,
      mobile: parsedNumber?.nationalNumber,
      phoneNumber: value,
    });
  };


  return (
    <div className={styles.signupEmailMainSection}>
    <LoginSingupToggle />
    <div className={styles.signupFormMain}>
      <form onSubmit={(e) => handleOnSubmitForm(e)}>
        <div className={styles.signupForm}>
          <div className={styles.formInput}>
            <label htmlFor="name">Full Name</label>

            <input
              required
              name="name"
              autoComplete="on"
              id="name"
              placeholder="Enter your full name"
              type="name"
              value={loginData?.name}
              onChange={(e) => handlechange(e)}
              // pattern="^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){0,16}[a-zA-Z0-9]$"
              // title="User name can only use letters, numbers, underscores and minimum length is 2 characters"
            />
            <div className={styles.inputTextIcon}>
              <img src={name} alt="Full Name" />
            </div>
          </div>

          {loginViePhone ? (
            <div className={styles.formInput}>
              <label htmlFor="phoneNumber">Mobile Number</label>
              <PhoneInputCommon
                handlePhoneNumber={handlePhoneNumber}
                value={loginData?.phoneNumber}
                required={true}
                name="phoneNumber"
              />
            </div>
          ) : (
            <div className={styles.formInput}>
              <label htmlFor="email">Email</label>
              <input
                required
                name="email"
                // autoComplete="on"
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
          )}

          <div className={styles.formInput}>
            <label htmlFor="password">Password</label>
            <input
              required
              name="password"
              // autoComplete="on"
              id="password"
              className="passwors-input"
              pattern=".{6,}"
              title="Must contain at least 6 or more characters"
              placeholder="Enter your password"
              type={eyeOpen ? " text" : "password"}
              value={loginData?.password}
              onChange={(e) => handlechange(e)}
            />

            <div className={styles.inputTextIcon}>
              <img src={password} alt="password" />
            </div>
            <div
              className={styles.paaswordHideShow}
              onClick={() => setEyeOpen(!eyeOpen)}
            >
              <img
                src={eyeOpen ? passwordShow : passwordHide}
                alt="eye"
              />
            </div>
          </div>
          <div className={styles.tacbox}>
            <input
              id="checkbox"
              type="checkbox"
              name="agreeCoditions"
              className="checkbox"
              checked={loginData?.agreeCoditions}
              onChange={(e) => handlechange(e)}
              required
            />
            <label htmlFor="checkbox"></label>
            <div className={styles.inputcheckBox}>
              {" "}
              By signing up, you are agreed to the{" "}
              <span>
                <Link href="/terms-and-conditions" target="_blank">
                  Terms & Conditions
                </Link>
              </span>
              &nbsp; and &nbsp;
              <span>
                <Link href="/privacy-policy" target="_blank">
                  Privacy Policy
                </Link>
              </span>
            </div>
          </div>
          <AuthButton title="Submit" loading={loading} />

          <div className={styles.formOrOption}>or</div>
          <div className={styles.signUpGoggleNumber}>
            <GoogleLogin type="signup" />
            <div
              className={styles.signupWithMedia}
              onClick={() => {
                setLoginViePhone(!loginViePhone);
                setLoginData({ phone: "", emial: "" });
              }}
            >
              <div className={styles.IconImage}>
                <img
                  src={
                    loginViePhone
                      ? emailBlackWhiteIcon
                      : phoneNumberIcon
                  }
                  alt={
                    loginViePhone
                      ? "emailBlackWhiteIcon"
                      : "phoneNumberIcon"
                  }
                />
              </div>
              <h2>
                {" "}
                {loginViePhone ? "Email Address" : "Phone Number"}{" "}
              </h2>
            </div>
          </div>
          <div className={styles.conditionsLink}>
            <div className={styles.termsCondition}>
              <Link href="/terms-and-conditions">
                Terms & Conditions
              </Link>
               
            </div>
            <div className={styles.centerLine}></div>
            <div className={styles.priavcyPolicy}>
              {" "}
              <Link href="/privacy-policy">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div id="rechpchaRef"></div>
  </div>
  )
}

export default SingUpSection