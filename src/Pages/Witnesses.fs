module Pages.Witnesses

open Feliz

let private roomNav () =
    let items = [
        "witnesses",   "#witnesses",   true
        "chronology",  "#chronology",  false
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
                prop.text (sprintf "Testimonies · %d recorded" WitnessesContent.testimonies.Length)
            ]
            Html.h1 [
                prop.className "room-title"
                prop.text "The Witnesses"
            ]
            Html.p [
                prop.className "room-standfirst"
                prop.text "First-hand accounts recorded by survivors, refugees, and foreign observers. Some testimonies were collected within weeks of the deportations; others were transcribed decades later by ethnographers of memory. Each is presented with its source citation."
            ]

            Html.div [
                prop.className "wit-list"
                prop.children [
                    for t in WitnessesContent.testimonies do
                        Html.article [
                            prop.className "wit-entry"
                            prop.children [
                                Html.p [
                                    prop.className "wit-entry-country"
                                    prop.text t.Country
                                ]
                                Html.h2 [
                                    prop.className "wit-entry-title"
                                    prop.text t.Title
                                ]
                                Html.p [
                                    prop.className "wit-entry-body"
                                    prop.text t.Body
                                ]
                            ]
                        ]
                ]
            ]

            roomNav ()
        ]
    ]
