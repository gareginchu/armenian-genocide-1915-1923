import { createElement } from "react";
import { createObj } from "../fable_modules/fable-library-js.4.24.0/Util.js";
import { map, singleton, collect, delay, toList } from "../fable_modules/fable-library-js.4.24.0/Seq.js";
import { reactApi } from "../fable_modules/Feliz.2.9.0/Interop.fs.js";
import { ofArray } from "../fable_modules/fable-library-js.4.24.0/List.js";
import { testimonies } from "./WitnessesContent.js";
import { printf, toText } from "../fable_modules/fable-library-js.4.24.0/String.js";

function roomNav() {
    let elems;
    return createElement("nav", createObj(ofArray([["className", "room-nav"], ["aria-label", "Rooms"], (elems = toList(delay(() => collect((matchValue) => singleton(createElement("a", {
        className: matchValue[2] ? "current" : "",
        href: matchValue[1],
        children: matchValue[0],
    })), [["witnesses", "#witnesses", true], ["chronology", "#chronology", false], ["photographs", "#photographs", false], ["main menu", "#", false]]))), ["children", reactApi.Children.toArray(Array.from(elems))])])));
}

export function render() {
    let elems_2, arg, value_12, elems_1;
    return createElement("main", createObj(ofArray([["className", "room"], (elems_2 = [createElement("p", {
        className: "room-eyebrow",
        children: (arg = (testimonies.length | 0), toText(printf("Testimonies · %d recorded"))(arg)),
    }), createElement("h1", {
        className: "room-title",
        children: "The Witnesses",
    }), createElement("p", createObj(ofArray([["className", "room-standfirst"], (value_12 = "First-hand accounts recorded by survivors, refugees, and foreign observers. Some testimonies were collected within weeks of the deportations; others were transcribed decades later by ethnographers of memory. Each is presented with its source citation.", ["children", value_12])]))), createElement("div", createObj(ofArray([["className", "wit-list"], (elems_1 = toList(delay(() => map((t) => {
        let elems;
        return createElement("article", createObj(ofArray([["className", "wit-entry"], (elems = [createElement("p", {
            className: "wit-entry-country",
            children: t.Country,
        }), createElement("h2", {
            className: "wit-entry-title",
            children: t.Title,
        }), createElement("p", {
            className: "wit-entry-body",
            children: t.Body,
        })], ["children", reactApi.Children.toArray(Array.from(elems))])])));
    }, testimonies))), ["children", reactApi.Children.toArray(Array.from(elems_1))])]))), roomNav()], ["children", reactApi.Children.toArray(Array.from(elems_2))])])));
}

