import { createRoot as createRoot_1 } from "react-dom/client";
import { render } from "./Pages/Landing.js";
import { render as render_1 } from "./Pages/Witnesses.js";
import { render as render_2 } from "./Pages/Timeline.js";
import { render as render_3 } from "./Pages/Photobook.js";
import { render as render_4 } from "./Pages/Search.js";
import { render as render_5 } from "./Pages/Translate.js";
import * as react from "react";
import { createAtom } from "./fable_modules/fable-library-js.4.24.0/Util.js";

export const createRoot = createRoot_1;

export const container = document.getElementById("root");

export const reactRoot = createRoot(container);

export function renderPage() {
    const h = window.location.hash;
    const xs = [(h === "") ? render() : ((h === "#") ? render() : ((h === "#witnesses") ? render_1() : ((h === "#chronology") ? render_2() : ((h === "#photographs") ? render_3() : render())))), render_4(), render_5()];
    return react.createElement(react.Fragment, {}, ...xs);
}

export let doRender = createAtom(() => {
    reactRoot.render(renderPage());
});

doRender()();

window.addEventListener("hashchange", (_arg) => {
    doRender()();
});

