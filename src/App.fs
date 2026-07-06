module App

open Feliz
open Browser.Dom
open Fable.Core.JsInterop

// React 18 client entry, hash-based routing.

let createRoot : obj -> obj = importMember "react-dom/client"
let container = document.getElementById "root"
let reactRoot = createRoot container

let renderPage () : ReactElement =
    let h = window.location.hash
    let page =
        match h with
        | "" | "#"        -> Pages.Landing.render ()
        | "#witnesses"    -> Pages.Witnesses.render ()
        | "#chronology"   -> Pages.Timeline.render ()
        | "#photographs"  -> Pages.Photobook.render ()
        | _               -> Pages.Landing.render ()
    React.fragment [
        page
        Pages.Search.render ()
        Pages.Translate.render ()
    ]

let mutable doRender = fun () -> reactRoot?render (renderPage ())
doRender ()
window.addEventListener("hashchange", (fun _ -> doRender ()))
