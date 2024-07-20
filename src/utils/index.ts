import toast from "react-hot-toast";

export const slugify = (str: string) =>
  str
    ?.toLowerCase()
    ?.trim()
    ?.replace(/[^\w\s-]/g, "")
    ?.replace(/[\s_-]+/g, "-")
    ?.replace(/^-+|-+$/g, "");

export const scrollToTop = () => {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  window.addEventListener("beforeunload", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};

export const addClassToDocumentElement = (className: string) => {
  document.documentElement.classList.add(className);
};

export const removeClassToDocumentElement = (className: string) => {
  document.documentElement.classList.remove(className);
};

export const toastError = (message: any) => {
  toast.error(message, {
    style: {
      borderRadius: "10px",
      color: "#000000",
      marginTop: "50px",
      border: "1px solid #DB4446",
      boxShadow: "0px 0px 4px 0px #DB444640",
    },
    position: "top-right",
  });
};

export const toastSuccess = (message: any) => {
  toast.success(message, {
    style: {
      borderRadius: "10px",
      color: "#000000",
      marginTop: "50px",
      border: "1px solid #40CD8A",
      boxShadow: "0px 0px 4px 0px #40CD8A40",
    },
    position: "top-right",
    // duration: 100000,
  });
};
