import { toString, Record } from "../fable_modules/fable-library-js.4.24.0/Types.js";
import { record_type, bool_type, string_type } from "../fable_modules/fable-library-js.4.24.0/Reflection.js";
import { singleton, ofArray } from "../fable_modules/fable-library-js.4.24.0/List.js";
import { createElement } from "react";
import { createObj } from "../fable_modules/fable-library-js.4.24.0/Util.js";
import { reactApi } from "../fable_modules/Feliz.2.9.0/Interop.fs.js";
import { map, delay, toList } from "../fable_modules/fable-library-js.4.24.0/Seq.js";

export class Room extends Record {
    constructor(Num, Title, Href, Meta, Live) {
        super();
        this.Num = Num;
        this.Title = Title;
        this.Href = Href;
        this.Meta = Meta;
        this.Live = Live;
    }
}

export function Room_$reflection() {
    return record_type("Pages.Landing.Room", [], Room, () => [["Num", string_type], ["Title", string_type], ["Href", string_type], ["Meta", string_type], ["Live", bool_type]]);
}

export const rooms = ofArray([new Room("01", "The Witnesses", "#witnesses", "Testimonies", true), new Room("02", "The Chronology", "#chronology", "Timeline", true), new Room("03", "The Photographs", "#photographs", "Photobook", true), new Room("04", "The Places", "#places", "Map", false), new Room("05", "The Documents", "#documents", "Archive", false), new Room("06", "The Culture Destroyed", "#culture", "Heritage", false), new Room("07", "The Confessions", "#confessions", "Statements", false), new Room("08", "The Press", "#press", "Coverage", false), new Room("09", "The Recognition", "#recognition", "Bibliography", false)]);

export function render() {
    let elems_9, elems_5, elems, elems_4, elems_1, value_23, elems_3, elems_2, value_29, elems_7, elems_8;
    return createElement("main", createObj(ofArray([["className", "landing"], (elems_9 = [createElement("p", {
        className: "landing-eyebrow",
        children: "Digital Archive · Հայոց ցեղասպանության թվային արխիվ",
    }), createElement("header", createObj(ofArray([["className", "landing-hero"], (elems_5 = [createElement("h1", createObj(ofArray([["className", "landing-title"], (elems = ["1915", createElement("span", {
        className: "dash",
        children: " – ",
    }), "1923"], ["children", reactApi.Children.toArray(Array.from(elems))])]))), createElement("aside", createObj(ofArray([["className", "landing-standfirst"], (elems_4 = [createElement("blockquote", createObj(singleton((elems_1 = ["\"Who, after all, speaks today of the annihilation of the Armenians?\"", createElement("cite", {
        children: "— Adolf Hitler, 22 August 1939",
    })], ["children", reactApi.Children.toArray(Array.from(elems_1))])))), createElement("p", createObj(singleton((value_23 = "An archive of eyewitness testimonies, contemporary documents, photographs, and cultural heritage — ingested from the 2005 ITE Genocide CD-ROM. The record is what remains when the perpetrator\'s denial has to answer to it.", ["children", value_23])))), createElement("div", createObj(ofArray([["className", "landing-warning"], (elems_3 = [createElement("p", createObj(singleton((elems_2 = [createElement("strong", {
        children: "Content notice · ",
    }), (value_29 = "Materials in this archive include first-hand accounts of atrocity, mass killing, and sexual violence. Reader discretion is advised.", value_29)], ["children", reactApi.Children.toArray(Array.from(elems_2))]))))], ["children", reactApi.Children.toArray(Array.from(elems_3))])])))], ["children", reactApi.Children.toArray(Array.from(elems_4))])])))], ["children", reactApi.Children.toArray(Array.from(elems_5))])]))), createElement("section", createObj(ofArray([["className", "landing-rooms"], (elems_7 = toList(delay(() => map((r) => {
        let elems_6;
        return createElement("a", createObj(ofArray([["className", "landing-room"], ["href", r.Live ? r.Href : "#"], ["data-live", toString(r.Live)], (elems_6 = [createElement("p", {
            className: "landing-room-num",
            children: r.Num,
        }), createElement("h2", {
            className: "landing-room-title",
            children: r.Title,
        }), createElement("p", {
            className: "landing-room-meta",
            children: r.Live ? r.Meta : "Forthcoming",
        })], ["children", reactApi.Children.toArray(Array.from(elems_6))])])));
    }, rooms))), ["children", reactApi.Children.toArray(Array.from(elems_7))])]))), createElement("footer", createObj(ofArray([["className", "landing-footer"], (elems_8 = [createElement("span", {
        children: "Sourced from the 2005 ITE Genocide CD-ROM",
    }), createElement("span", {
        children: "Media on Cloudflare R2",
    }), createElement("span", {
        children: "Editorial direction · curatorial team",
    })], ["children", reactApi.Children.toArray(Array.from(elems_8))])])))], ["children", reactApi.Children.toArray(Array.from(elems_9))])])));
}

