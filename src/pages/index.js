
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("./landing");
  }, []);
}

// import { Auth0Provider } from "@auth0/auth0-react"
// import App from "./_app"
//import ReactDOM from "react-dom/client";

// let root = ReactDOM.createRoot(document.getElementById("root"));
// const domain = process.env.REACT_APP_AUTH0_DOMAIN
// const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID


// root.render(
//   <Auth0Provider
//     domain={domain}
//     clientId={clientId}
//     redirectUri={window.location.origin}
//   >
//     <App />
//   </Auth0Provider>
// )