module Pages.Timeline

open Feliz

let private roomNav () =
    let items = [
        "witnesses",   "#witnesses",   false
        "chronology",  "#chronology",  true
        "photographs", "#photographs", false
        "main menu",   "#",            false
    ]
    Html.nav [
        prop.className "room-nav"
        prop.ariaLabel "Rooms"
        prop.children [
            for label, href, current in items do
                Html.a [
                    prop.className (if current then "current" else "")
                    prop.href href
                    prop.text label
                ]
        ]
    ]

let render () =
    Html.main [
        prop.className "room"
        prop.children [
            Html.p [
                prop.className "room-eyebrow"
                prop.text (sprintf "Timeline · %d entries" TimelineContent.entries.Length)
            ]
            Html.h1 [
                prop.className "room-title"
                prop.text "The Chronology"
            ]
            Html.p [
                prop.className "room-standfirst"
                prop.text "From the Sassoun massacres of 1894 to the closing of the Nuremberg Trials, a chronological record of the mechanism of the Genocide — its architects, its instruments, its long refusal to end. Each entry cites the historical source."
            ]

            Html.div [
                prop.className "tl-entries"
                prop.children [
                    for e in TimelineContent.entries do
                        Html.article [
                            prop.className "tl-entry"
                            prop.children [
                                Html.p [
                                    prop.className "tl-entry-date"
                                    prop.text (if e.Date <> "" then e.Date else "—")
                                ]
                                Html.div [
                                    prop.children [
                                        if e.Title <> "" then
                                            Html.h2 [
                                                prop.className "tl-entry-title"
                                                prop.text e.Title
                                            ]
                                        if e.Body <> "" then
                                            Html.p [
                                                prop.className "tl-entry-body"
                                                prop.text e.Body
                                            ]
                                    ]
                                ]
                            ]
                        ]
                ]
            ]

            roomNav ()
        ]
    ]
