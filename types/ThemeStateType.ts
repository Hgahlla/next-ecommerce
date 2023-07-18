export type ThemeStateType = {
  mode: "light" | "dark";
  toggleMode: (theme: "light" | "dark") => void;
};
