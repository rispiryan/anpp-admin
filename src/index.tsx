import "./index.scss";

import { createRoot } from "react-dom/client";

import { App } from "./App";

const root = createRoot(document.getElementById("root")!);

// For support testing uncomment code and change organizationId value
// document.cookie = "organizationId=e59c484f-1bb5-40a7-a427-71745ca937aa";

root.render(<App />);
