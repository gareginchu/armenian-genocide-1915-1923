import { createElement } from "react";
import { comparePrimitives, stringHash, createObj } from "../fable_modules/fable-library-js.4.24.0/Util.js";
import { empty, map, append, singleton, collect, delay, toList } from "../fable_modules/fable-library-js.4.24.0/Seq.js";
import { reactApi } from "../fable_modules/Feliz.2.9.0/Interop.fs.js";
import { singleton as singleton_1, ofArray } from "../fable_modules/fable-library-js.4.24.0/List.js";
import { sortBy } from "../fable_modules/fable-library-js.4.24.0/Array.js";
import { Array_groupBy } from "../fable_modules/fable-library-js.4.24.0/Seq2.js";
import { photos as photos_1 } from "./PhotobookContent.js";
import { printf, toText } from "../fable_modules/fable-library-js.4.24.0/String.js";

function roomNav() {
    let elems;
    return createElement("nav", createObj(ofArray([["className", "room-nav"], ["aria-label", "Rooms"], (elems = toList(delay(() => collect((matchValue) => singleton(createElement("a", {
        className: matchValue[2] ? "current" : "",
        href: matchValue[1],
        children: matchValue[0],
    })), [["witnesses", "#witnesses", false], ["chronology", "#chronology", false], ["photographs", "#photographs", true], ["main menu", "#", false]]))), ["children", reactApi.Children.toArray(Array.from(elems))])])));
}

export function render() {
    let elems_4;
    const byCategory = sortBy((tupledArg) => tupledArg[0], Array_groupBy((p) => p.Category, photos_1, {
        Equals: (x, y) => (x === y),
        GetHashCode: stringHash,
    }), {
        Compare: comparePrimitives,
    });
    return createElement("main", createObj(ofArray([["className", "room"], (elems_4 = toList(delay(() => {
        let arg;
        return append(singleton(createElement("p", {
            className: "room-eyebrow",
            children: (arg = (photos_1.length | 0), toText(printf("Photobook · %d photographs"))(arg)),
        })), delay(() => append(singleton(createElement("h1", {
            className: "room-title",
            children: "The Photographs",
        })), delay(() => {
            let value_12;
            return append(singleton(createElement("p", createObj(ofArray([["className", "room-standfirst"], (value_12 = "Photographic record of Western Armenia before 1915, of the deportations, of the survivors in refugee camps, of the destroyed heritage. Each image comes from an accessioned collection.", ["children", value_12])])))), delay(() => append(collect((matchValue) => {
                let elems_3, elems_2;
                const cat_1 = matchValue[0];
                return singleton(createElement("section", createObj(singleton_1((elems_3 = [createElement("h2", {
                    className: "pb-category-title",
                    children: (cat_1 === "") ? "Uncategorised" : cat_1,
                }), createElement("div", createObj(ofArray([["className", "pb-grid"], (elems_2 = toList(delay(() => map((p_1) => {
                    let elems_1, elems;
                    return createElement("article", createObj(ofArray([["className", "pb-item"], (elems_1 = [createElement("figure", createObj(singleton_1((elems = toList(delay(() => append(singleton(createElement("img", {
                        src: p_1.Url,
                        alt: p_1.Caption,
                        loading: "lazy",
                    })), delay(() => ((p_1.Caption !== "") ? singleton(createElement("figcaption", {
                        children: p_1.Caption,
                    })) : empty()))))), ["children", reactApi.Children.toArray(Array.from(elems))]))))], ["children", reactApi.Children.toArray(Array.from(elems_1))])])));
                }, matchValue[1]))), ["children", reactApi.Children.toArray(Array.from(elems_2))])])))], ["children", reactApi.Children.toArray(Array.from(elems_3))])))));
            }, byCategory), delay(() => singleton(roomNav())))));
        }))));
    })), ["children", reactApi.Children.toArray(Array.from(elems_4))])])));
}

