import { builder, renderPage } from "@teko-builder/builder-client";
import {
  componentDict,
  ThemeProvider,
  generateTheme,
} from "@teko-builder/pb-base-elements";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export const themeApp = generateTheme({
  primary: "#258DFF",
  secondary: "#FF2642",
});

function App() {
  const location = useLocation();
  const [page, setPage] = useState();
  const fetchPage = async () => {
    const slug = location.pathname.substring(1);
    const { page: _page } = await builder.getPublicPage({
      slug: slug ? slug : "/",
      device: "desktop",
    });
    setPage(_page);
  };
  useEffect(() => {
    builder.init("vnpay", {
      env: "dev",
    });
    fetchPage();
    // eslint-disable-next-line
  }, []);

  return (
    <ThemeProvider>
      {page?.pbConfig && renderPage(page?.pbConfig, componentDict)}
    </ThemeProvider>
  );
}

export default App;
