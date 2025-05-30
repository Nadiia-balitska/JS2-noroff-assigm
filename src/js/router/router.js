export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case "/":
      await import("./views/home.js");
      break;
    case "/auth/login/":
      await import("./views/login.js");
      break;
    case "/auth/register/":
      await import("./views/register.js");
      break;
    case "/post/create/":
      await import("./views/postCreate.js");
      break;
    // Remove or comment this if profile.js doesn't exist:
    // case "/profile/":
    //   await import("./views/profile.js");
    //   break;
    default:
      await import("./views/notFound.js");
  }
}
