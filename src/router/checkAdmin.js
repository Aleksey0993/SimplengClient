import store from "@/store/index";

export default (to, from, next) => {
  const privateAdminPages = ["grammarEditor", "grammarCreate"];
  const authAdmin = privateAdminPages.includes(to.name);

  if (authAdmin && store.state.auth.user.role == "USER") {
    return next({ name: "profile" });
  } else {
    return next();
  }
};
