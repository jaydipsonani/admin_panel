import React, { useEffect, useState } from "react";
import styles from "./loginSection.module.scss";
import LoginSingupToggle from "@/components/modules/loginSingupToggle";
import Link from "next/link";
import GoogleLogin from "@/components/modules/googleLogin";
import PhoneInputCommon from "@/components/modules/phoneInputCommon";
import { toastError, toastSuccess } from "@/utils";
import AuthButton from "@/components/modules/authButton";
import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input";
import { signIn } from "@/utils/api";
import { useRouter } from "next/router";
import { setCookie } from "@/utils/useHooks/useCookies";
import {
  getItemFromSession,
  removeItemFromSession,
  setItemInLocal,
} from "@/utils/useHooks/useStorage";
import {
  RecaptchaVerifier,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "@/utils/socialLogin/Firebase";
const email = "/assets/icons/email.svg";
const password = "/assets/icons/password.svg";
const phoneNumberIcon = "/assets/icons/number_with_signup.svg";
const passwordHide = "/assets/icons/password_hide.svg";
const passwordShow = "/assets/icons/password_show.svg";
const emailBlackWhiteIcon = "/assets/icons/emailBlackWhiteIcon.svg";

const LoginSection = () => {
  const [loginViePhone, setLoginViePhone] = useState(false);
  const [loginData, setLoginData] = useState<any>();
  const [eyeOpen, setEyeOpen] = useState(false);
  const [loading, setLoging] = useState(false);

  const router = useRouter();

  const handlechange = (e: any) => {
    const { name, value } = e.target;
    const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;
    let sanitizedValue = value.replace(emojiRegex, "");

    sanitizedValue = sanitizedValue.trimStart();

    const finalValue =
      name === "password" ? sanitizedValue.replace(/\s/g, "") : sanitizedValue;

    setLoginData({ ...loginData, [name]: finalValue });
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
      .catch((error: any) => {
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
        email: loginData?.email,
        mobile: loginData?.mobile,
        country_code: loginData?.country_code,
        password: loginData?.password,
        fcm_id: fcmToken || "",
        device: 3,
      };

      const signInRes = await signIn({
        method: "POST",
        body: payload,
      });

      if (signInRes?.success) {
        if (loginViePhone && !signInRes?.data?.is_mobile_verified) {
          let data = {
            message: signInRes?.message,
            userID: signInRes?.data?.user_id,
          };

          handleOnSendOtp(data);
        } else if (!loginViePhone && !signInRes?.data?.is_email_verified) {
          setLoging(false);
          signInRes?.message && toastSuccess(signInRes?.message);
          router.push(
            `/auth/otp-verify?user_id=${signInRes?.data?.user_id}&email=${loginData?.email}`
          );
        } else {
          await signInWithEmailAndPassword(
            auth,
            signInRes?.data?.email,
            `${signInRes?.data?.user_id}w`
          )
            .then((userCredential: any) => {})
            .catch((error: any) => {
              createUserWithEmailAndPassword(
                auth,
                signInRes?.data?.email,
                `${signInRes?.data?.user_id}w`
              )
                .then((userCredential: any) => {})
                .catch((error: any) => {});
            });

          let userDetails = {
            name: signInRes?.data?.name,
            is_email_verified: signInRes?.data?.is_email_verified,
            is_mobile_verified: signInRes?.data?.is_mobile_verified,
            email: signInRes?.data?.email,
            mobile: signInRes?.data?.mobile,
          };

          setCookie("waotoken", signInRes?.data?.auth_token, {});
          setItemInLocal("userDetails", userDetails);
          setLoging(false);
          signInRes?.message && toastSuccess(signInRes?.message);
          if (getItemFromSession("lastroute")) {
            router.push(getItemFromSession("lastroute"));
            removeItemFromSession("lastroute");
          } else {
            router.push(`/`);
          }
        }
      } else {
        toastError(signInRes?.message);
        setLoging(false);
      }
    }
  };
  return (
    <div className={styles.signupEmailMainSection}>
      <LoginSingupToggle />
      <div className={styles.loginFormMain}>
        <form onSubmit={(e) => handleOnSubmitForm(e)}>
          <div className={styles.loginupForm}>
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
            )}

            <div className={styles.formInput}>
              <label htmlFor="password">Password</label>
              <input
                required
                name="password"
                autoComplete="on"
                id="password"
                className="passwors-input"
                // pattern=".{6,}"
                // title="Must contain at least 6 or more characters"
                placeholder="Enter your password"
                type={eyeOpen ? " text" : "password"}
                value={loginData?.password}
                onChange={(e) => handlechange(e)}
              />
              <div className={styles.inputTextIcon}>
                <img src={password} alt="password" />
              </div>
              <div className={styles.passwodHideShowMain}>
                <div
                  className={styles.paaswordHideShow}
                  onClick={() => setEyeOpen(!eyeOpen)}
                >
                  <img src={eyeOpen ? passwordShow : passwordHide} alt="eye" />
                </div>
              </div>
            </div>
            <div className={styles.forgotPassword}>
              <Link
                href={`/auth/forgot-password?email=${
                  loginData?.email?.length > 0 ? loginData?.email : ""
                }&phone=${
                  loginData?.phoneNumber?.length > 0
                    ? loginData?.phoneNumber
                    : ""
                }`}
              >
                Forgot Password?
              </Link>
            </div>
            <AuthButton title="Sign In" loading={loading} />
            <div className={styles.formOrOption}>or</div>
            <div className={styles.loginGoggleNumber}>
              <GoogleLogin type="signIn" />
              <div
                className={styles.loginWithMedia}
                onClick={() => {
                  setLoginViePhone(!loginViePhone);
                  setLoginData({ phone: "", emial: "" });
                }}
              >
                <div className={styles.IconImage}>
                  <img
                    src={loginViePhone ? emailBlackWhiteIcon : phoneNumberIcon}
                    alt={
                      loginViePhone ? "emailBlackWhiteIcon" : "phoneNumberIcon"
                    }
                  />{" "}
                </div>
                <h2> {loginViePhone ? "Email Address" : "Phone Number"} </h2>{" "}
              </div>
            </div>
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
          </div>
        </form>
      </div>
      <div id="rechpchaRef"></div>
    </div>
  );
};

export default LoginSection;
