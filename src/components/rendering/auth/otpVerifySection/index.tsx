import React from "react";
import styles from "./otpVerifySection.module.scss";
import OTPInput from "@/components/modules/otpInput";
import Link from "next/link";
import { useEffect, useState } from "react";
import AuthButton from "@/components/modules/authButton";
import { useRouter } from "next/router";
import { emailOtpVerify, resendOtp, resetPassword } from "@/utils/api";
import { toastError, toastSuccess } from "@/utils";
import { setCookie } from "@/utils/useHooks/useCookies";
import {
  getItemFromSession,
  removeItemFromSession,
  setItemInLocal,
} from "@/utils/useHooks/useStorage";
import Spinner from "@/components/modules/spinner";
import { auth } from "@/utils/socialLogin/Firebase";
import {
  RecaptchaVerifier,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
} from "firebase/auth";
const logoImage = "/assets/brand_logo.svg";

const OtpVerifySection = () => {
  const [loading, setLoging] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [inputValue, setInputValue] = useState();
  const [token, setToken] = useState(null);
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const router = useRouter();
  const otpForEmail = router?.query?.email;
  const otpForPhone: any = router?.query?.phone;
  const country_code: any = router?.query?.country_code;
  const isForgot = router?.query?.isForgot;
  const user_id = router?.query?.user_id;

  const handleOnSubmitForm = async (e: any) => {
    e.preventDefault();
    setLoging(true);

    let payload = {
      user_id: user_id,
      code: token ? token : inputValue,
      device: 3,
    };

    const otpVerify = await emailOtpVerify({
      method: "POST",
      body: payload,
    });

    if (otpVerify?.success) {
      await createUserWithEmailAndPassword(
        auth,
        otpVerify?.data?.email,
        `${user_id}w`
      )
        .then((userCredential: any) => {
          signInWithEmailAndPassword(
            auth,
            otpVerify?.data?.email,
            `${user_id}w`
          );
        })
        .catch((error: any) => {});

      let userDetails = {
        name: otpVerify?.data?.name,
        is_email_verified: otpVerify?.data?.is_email_verified,
        is_mobile_verified: otpVerify?.data?.is_mobile_verified,
        email: otpVerify?.data?.email,
        mobile: otpVerify?.data?.mobile,
      };

      setCookie("waotoken", otpVerify?.data?.auth_token, {});
      setItemInLocal("userDetails", userDetails);
      setLoging(false);
      if (getItemFromSession("lastroute")) {
        router.push(getItemFromSession("lastroute"));
        removeItemFromSession("lastroute");
      } else {
        router.push(`/`);
      }
      otpVerify?.message && toastSuccess(otpVerify?.message);
    } else {
      otpVerify?.message && toastError(otpVerify?.message);
    }
    setLoging(false);
  };

  const hanleOnResetPaswordOtpVerify = async (e: any) => {
    e.preventDefault();
    setLoging(true);

    let payload = {
      email_mobile: otpForEmail || otpForPhone,
      step: 1, // 1 for otp verify
      email_code: inputValue,
    };

    const resetPasswordRes = await resetPassword({
      method: "POST",
      body: payload,
    });

    if (resetPasswordRes?.success) {
      setLoging(false);
      router.push(
        `/auth/update-password?email_mobile=${payload?.email_mobile}`
      );
      resetPasswordRes?.message && toastSuccess(resetPasswordRes?.message);
    } else {
      setLoging(false);
      resetPasswordRes?.message && toastError(resetPasswordRes?.message);
    }
  };

  const hanleOnResetPaswordPhoneOtpVerify = async (token: any) => {
    setLoging(true);

    let payload = {
      email_mobile: otpForPhone,
      step: 1, // 1 for otp verify
      email_code: token,
    };

    const resetPasswordRes = await resetPassword({
      method: "POST",
      body: payload,
    });

    if (resetPasswordRes?.success) {
      setLoging(false);
      router.push(
        `/auth/update-password?email_mobile=${payload?.email_mobile}`
      );
      resetPasswordRes?.message && toastSuccess(resetPasswordRes?.message);
    } else {
      setLoging(false);
      resetPasswordRes?.message && toastError(resetPasswordRes?.message);
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResendCode = async () => {
    setOtpLoading(true);

    if (otpForPhone) {
      let appVeriifer = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, `+${country_code}${otpForPhone}`, appVeriifer)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setOtpLoading(false);
          toastSuccess("OTP resend Sucessfully!.");
          setCountdown(60);
          setCanResend(false);
        })
        .catch((error) => {
          setOtpLoading(false);
          toastError("Something Went Wrong");
        });
    } else {
      let payload = {
        email: otpForEmail,
      };

      const resendOtpRes = await resendOtp({
        method: "POST",
        body: payload,
      });

      if (resendOtpRes?.success) {
        setOtpLoading(false);
        resendOtpRes?.message && toastSuccess(resendOtpRes?.message);
        setCountdown(60);
        setCanResend(false);
      } else {
        setOtpLoading(false);
        resendOtpRes?.message && toastError(resendOtpRes?.message);
      }
    }
  };

  const verifyOTP = async (e: any) => {
    e.preventDefault();
    setLoging(true);

    let confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(inputValue)
      .then(async (result: any) => {
        if (isForgot) {
          hanleOnResetPaswordPhoneOtpVerify(result?.user?.accessToken);
        } else {
          let payload = {
            user_id: user_id,
            code: result?.user?.accessToken,
            device: 3,
          };

          const otpVerify = await emailOtpVerify({
            method: "POST",
            body: payload,
          });

          if (otpVerify?.success) {
            let userDetails = {
              name: otpVerify?.data?.name,
              is_email_verified: otpVerify?.data?.is_email_verified,
              is_mobile_verified: otpVerify?.data?.is_mobile_verified,
              email: otpVerify?.data?.email,
              mobile: otpVerify?.data?.mobile,
            };

            setCookie("waotoken", otpVerify?.data?.auth_token, {});
            setItemInLocal("userDetails", userDetails);
            setLoging(false);
            if (getItemFromSession("lastroute")) {
              router.push(getItemFromSession("lastroute"));
              removeItemFromSession("lastroute");
            } else {
              router.push(`/`);
            }
            otpVerify?.message && toastSuccess(otpVerify?.message);
          } else {
            setLoging(false);
            otpVerify?.message && toastError(otpVerify?.message);
          }
        }
      })
      .catch((error: any) => {
        setLoging(false);
        toastError("Invalid verification code!");
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

  return (
    <>
      <form
        onSubmit={(e) => {
          isForgot && otpForEmail
            ? hanleOnResetPaswordOtpVerify(e)
            : otpForPhone
            ? verifyOTP(e)
            : handleOnSubmitForm(e);
        }}
      >
        <div className={styles.otpVerifyMainSection}>
          <div className={styles.brandLogo}>
            <img src={logoImage} alt="logo" />
          </div>
          <div className={styles.verifyScreenDiv}>
            <h1>Verify</h1>
          </div>
          <div className={styles.otpText}>
            <h4>
              We have sent a verification code to your{" "}
              {otpForEmail ? "email" : " mobile number"}. Please add here
            </h4>
          </div>
          <OTPInput
            isNumberInput
            autoFocus
            length={6}
            className={styles.verifyOtpGridAlignments}
            inputClassName="otpInput"
            onChangeOTP={(otp: any) => setInputValue(otp)}
            handleSubmitOTP={(e: any) => {
              isForgot
                ? hanleOnResetPaswordOtpVerify(e)
                : handleOnSubmitForm(e);
            }}
          />{" "}
          <AuthButton title="Verify" loading={loading} />
          <div className={styles.resendOtpMessage}>
            {canResend ? (
              <>
                <p>
                  Didn’t Receive Code?{"  "}&nbsp;
                  <span onClick={handleResendCode}>Resend Code</span>
                  {otpLoading && <Spinner />}
                </p>
              </>
            ) : (
              <span>
                Resend In 0{Math.floor(countdown / 60)}:
                {(countdown % 60).toString().padStart(2, "00")}
              </span>
            )}
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
      <div id="rechpchaRef"></div>
    </>
  );
};

export default OtpVerifySection;
