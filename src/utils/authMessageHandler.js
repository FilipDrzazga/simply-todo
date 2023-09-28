const authMessageHandler = (errors) => {
  switch (errors) {
    case "login":
      return {
        message: "Welcome back.",
        messageDescripction: "Enjoy your family app.",
        icon: "circle-check",
        iconColor: "checkbox",
      };
    case "create-account":
      return {
        message: "Well done.",
        messageDescripction: "Thanks for creating new account.",
        icon: "circle-check",
        iconColor: "checkbox",
      };
    case "reset-password":
      return {
        message: "Well done.",
        messageDescripction: "Your reset link was sended to your email.",
        icon: "circle-check",
        iconColor: "checkbox",
      };
    case "auth/email-already-in-use":
      return {
        message: "Ooops!",
        messageDescripction: "User email already exist. Try to login.",
        icon: "circle-xmark",
        iconColor: "delete",
      };
    case "Username-exist":
      return {
        message: "Ooops!",
        messageDescripction: "Username already exist. Try new one.",
        icon: "circle-xmark",
        iconColor: "delete",
      };
    case "auth/user-not-found":
      return {
        message: "Ooops!",
        messageDescripction: `User doesn't exist. Try to create account.`,
        icon: "circle-xmark",
        iconColor: "delete",
      };
    case "auth/wrong-password":
      return {
        message: "Ooops!",
        messageDescripction: `Wrong password or email adress. `,
        icon: "circle-xmark",
        iconColor: "delete",
      };
    case "auth/invalid-email":
      return {
        message: "Ooops!",
        messageDescripction: `Wrong password or email adress. `,
        icon: "circle-xmark",
        iconColor: "delete",
      };
    default:
      return "";
  }
};

export { authMessageHandler };
