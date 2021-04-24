import "styles/globals.css";
import "styles/font-awesome-4.7.0/css/font-awesome.min.css";
import AppContext, { initialValues } from "../store/context";

function MyApp({ Component, pageProps }) {
  return (
    <AppContext.Provider value={initialValues}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
