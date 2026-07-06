module Pages.Photobook

open Feliz

let private roomNav () =
    let items = [
        "witnesses",   "#witnesses",   false
        "chronology",  "#chronology",  false
        "photographs", "#photographs", true
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
    // Group photos by category
    let byCategory =
        PhotobookContent.photos
        |> Array.groupBy (fun p -> p.Category)
        |> Array.sortBy (fun (cat, _) -> cat)

    Html.main [
        prop.className "room"
        prop.children [
            Html.p [
                prop.className "room-eyebrow"
                prop.text (sprintf "Photobook · %d photographs" PhotobookContent.photos.Length)
            ]
            Html.h1 [
                prop.className "room-title"
                prop.text "The Photographs"
            ]
            Html.p [
                prop.className "room-standfirst"
                prop.text "Photographic record of Western Armenia before 1915, of the deportations, of the survivors in refugee camps, of the destroyed heritage. Each image comes from an accessioned collection."
            ]

            for cat, photos in byCategory do
                Html.section [
                    prop.children [
                        Html.h2 [
                            prop.className "pb-category-title"
                            prop.text (if cat = "" then "Uncategorised" else cat)
                        ]
                        Html.div [
                            prop.className "pb-grid"
                            prop.children [
                                for p in photos do
                                    Html.article [
                                        prop.className "pb-item"
                                        prop.children [
                                            Html.figure [
                                                prop.children [
                                                    Html.img [
                                                        prop.src p.Url
                                                        prop.alt p.Caption
                                                        prop.custom ("loading", "lazy")
                                                    ]
                                                    if p.Caption <> "" then
                                                        Html.figcaption [ prop.text p.Caption ]
                                                ]
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
