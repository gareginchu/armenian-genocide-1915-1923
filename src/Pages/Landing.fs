module Pages.Landing

open Feliz

type Room = {
    Num: string
    Title: string
    Href: string
    Meta: string
    Live: bool
}

let rooms : Room list = [
    { Num = "01"; Title = "The Witnesses";        Href = "#witnesses";   Meta = "Testimonies"; Live = true  }
    { Num = "02"; Title = "The Chronology";       Href = "#chronology";  Meta = "Timeline";    Live = true  }
    { Num = "03"; Title = "The Photographs";      Href = "#photographs"; Meta = "Photobook";   Live = true  }
    { Num = "04"; Title = "The Places";           Href = "#places";      Meta = "Map";         Live = false }
    { Num = "05"; Title = "The Documents";        Href = "#documents";   Meta = "Archive";     Live = false }
    { Num = "06"; Title = "The Culture Destroyed";Href = "#culture";     Meta = "Heritage";    Live = false }
    { Num = "07"; Title = "The Confessions";      Href = "#confessions"; Meta = "Statements";  Live = false }
    { Num = "08"; Title = "The Press";            Href = "#press";       Meta = "Coverage";    Live = false }
    { Num = "09"; Title = "The Recognition";      Href = "#recognition"; Meta = "Bibliography";Live = false }
]

let render () =
    Html.main [
        prop.className "landing"
        prop.children [
            // Eyebrow
            Html.p [
                prop.className "landing-eyebrow"
                prop.text "Digital Archive · Հայոց ցեղասպանության թվային արխիվ"
            ]

            // Hero
            Html.header [
                prop.className "landing-hero"
                prop.children [
                    Html.h1 [
                        prop.className "landing-title"
                        prop.children [
                            Html.text "1915"
                            Html.span [ prop.className "dash"; prop.text " – " ]
                            Html.text "1923"
                        ]
                    ]
                    Html.aside [
                        prop.className "landing-standfirst"
                        prop.children [
                            Html.blockquote [
                                prop.children [
                                    Html.text "\"Who, after all, speaks today of the annihilation of the Armenians?\""
                                    Html.cite [ prop.text "— Adolf Hitler, 22 August 1939" ]
                                ]
                            ]
                            Html.p [
                                prop.text "An archive of eyewitness testimonies, contemporary documents, photographs, and cultural heritage — ingested from the 2005 ITE Genocide CD-ROM. The record is what remains when the perpetrator's denial has to answer to it."
                            ]
                            Html.div [
                                prop.className "landing-warning"
                                prop.children [
                                    Html.p [
                                        prop.children [
                                            Html.strong [ prop.text "Content notice · " ]
                                            Html.text "Materials in this archive include first-hand accounts of atrocity, mass killing, and sexual violence. Reader discretion is advised."
                                        ]
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]
            ]

            // Room grid
            Html.section [
                prop.className "landing-rooms"
                prop.children [
                    for r in rooms do
                        Html.a [
                            prop.className "landing-room"
                            prop.href (if r.Live then r.Href else "#")
                            prop.custom ("data-live", string r.Live)
                            prop.children [
                                Html.p [
                                    prop.className "landing-room-num"
                                    prop.text r.Num
                                ]
                                Html.h2 [
                                    prop.className "landing-room-title"
                                    prop.text r.Title
                                ]
                                Html.p [
                                    prop.className "landing-room-meta"
                                    prop.text (if r.Live then r.Meta else "Forthcoming")
                                ]
                            ]
                        ]
                ]
            ]

            // Footer
            Html.footer [
                prop.className "landing-footer"
                prop.children [
                    Html.span [ prop.text "Sourced from the 2005 ITE Genocide CD-ROM" ]
                    Html.span [ prop.text "Media on Cloudflare R2" ]
                    Html.span [ prop.text "Editorial direction · curatorial team" ]
                ]
            ]
        ]
    ]
