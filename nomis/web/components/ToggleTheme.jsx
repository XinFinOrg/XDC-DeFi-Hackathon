import { useTheme } from "next-themes";

import { useState, useEffect } from "react";

export default function ToggleTheme({ open }) {
  const { theme, setTheme } = useTheme();
  const themes = ["light", "dark", "system"];

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={`ThemeToggle container ${open === true ? "open" : ""}`}>
      <div className="button">Change Theme</div>
      <div className="current">Current: {theme}</div>
      <ul className="themes">
        <li className="light" onClick={() => setTheme("light")}>
          Light
        </li>
        <li className="dark" onClick={() => setTheme("dark")}>
          Dark
        </li>
        <li className="system" onClick={() => setTheme("system")}>
          System
        </li>
      </ul>
    </div>
  );
}
