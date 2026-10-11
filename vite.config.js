
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  appType: "mpa",
  base: "/",

  build: {
    target: "esnext",

    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),

        auth: resolve(__dirname, "./auth/index.html"),
        login: resolve(__dirname, "./auth/login/index.html"),
        register: resolve(__dirname, "./auth/register/index.html"),

        profile: resolve(__dirname, "./profile/index.html"),

        post: resolve(__dirname, "./post/index.html"),
        readPost: resolve(__dirname, "./post/read/index.html"),
        createPost: resolve(__dirname, "./post/create/index.html"),
        editPost: resolve(__dirname, "./post/edit/index.html"),
      },
    },
  },
});
