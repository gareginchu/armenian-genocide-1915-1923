import { createElement } from "react";
import { createObj } from "../fable_modules/fable-library-js.4.24.0/Util.js";
import { empty, append, map, singleton, collect, delay, toList } from "../fable_modules/fable-library-js.4.24.0/Seq.js";
import { reactApi } from "../fable_modules/Feliz.2.9.0/Interop.fs.js";
import { singleton as singleton_1, ofArray } from "../fable_modules/fable-library-js.4.24.0/List.js";
import { entries } from "./TimelineContent.js";
import { printf, toText } from "../fable_modules/fable-library-js.4.24.0/String.js";

function roomNav() {
    let elems;
    return createElement("nav", createObj(ofArray([["className", "room-nav"], ["aria-label", "Rooms"], (elems = toList(delay(() => collect((matchValue) => singleton(createElement("a", {
        className: matchValue[2] ? "current" : "",
        href: matchValue[1],
        children: matchValue[0],
    })), [["witnesses", "#witnesses", false], ["chronology", "#chronology", true], ["photographs", "#photographs", false], ["main menu", "#", false]]))), ["children", reactApi.Children.toArray(Array.from(elems))])])));
}

export function render() {
    let elems_3, arg, value_12, elems_2;
    return createElement("main", createObj(ofArray([["className", "room"], (elems_3 = [createElement("p", {
        className: "room-eyebrow",
        children: (arg = (entries.length | 0), toText(printf("Timeline · %d entries"))(arg)),
    }), createElement("h1", {
        className: "room-title",
        children: "The Chronology",
    }), createElement("p", createObj(ofArray([["className", "room-standfirst"], (value_12 = "From the Sassoun massacres of 1894 to the closing of the Nuremberg Trials, a chronological record of the mechanism of the Genocide — its architects, its instruments, its long refusal to end. Each entry cites the historical source.", ["children", value_12])]))), createElement("div", createObj(ofArray([["className", "tl-entries"], (elems_2 = toList(delay(() => map((e) => {
        let elems_1, elems;
        return createElement("article", createObj(ofArray([["className", "tl-entry"], (elems_1 = [createElement("p", {
            className: "tl-entry-date",
            children: (e.Date !== "") ? e.Date : "—",
        }), createElement("div", createObj(singleton_1((elems = toList(delay(() => append((e.Title !== "") ? singleton(createElement("h2", {
            className: "tl-entry-title",
            children: e.Title,
        })) : empty(), delay(() => ((e.Body !== "") ? singleton(createElement("p", {
            className: "tl-entry-body",
            children: e.Body,
        })) : empty()))))), ["children", reactApi.Children.toArray(Array.from(elems))]))))], ["children", reactApi.Children.toArray(Array.from(elems_1))])])));
    }, entries))), ["children", reactApi.Children.toArray(Array.from(elems_2))])]))), roomNav()], ["children", reactApi.Children.toArray(Array.from(elems_3))])])));
}

