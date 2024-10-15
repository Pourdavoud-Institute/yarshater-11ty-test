import groq from "groq";

/** Get navigation document based on $slug variable */
export const navigationQuery = groq`*[_type == "navigation" && $workspaceTag in workspaceTags.entries[]]{
    "id": _id,
    title,
    slug,
    entries[]{
        "type": _type,
        callToAction,
        navItem{
            "type": _type,
            _type == "navItem" => {
                title,
                external,
                url,
                "slug": slug.current
            },
            _type == "navEntryLink" => {
                title,
                "reference": reference->{
                    title,
                    "slug": slug.current
                }
            },
            _type == "navHeader" => {
                title
            }
        },
        children[]{
            "navItem": {
                "type": _type,
                _type == "child_navItem" => {
                    title,
                    external,
                    url,
                    "slug": slug.current
                },
                _type == "child_navEntryLink" => {
                    title,
                    "reference": reference->{
                        title,
                        "slug": slug.current
                    }
                }
            }
        }
    }
}`;

// export const navigationQuery = groq`*[_type == 'navigation' && $workspaceTag in workspaceTags.entries[]]{
//   ...,
//   entries[]{
//     ...,
//     _type == 'navEntryLink' => {
//       ...,
//       reference->{
//         _type,
//         title,
//         slug,
//         _type == 'person' => {
//           'title': name.firstName + ' ' + name.lastName
//         },
//       }
//     },
//     _type == 'navItem' => @,
//     children[]{
//       ...,
//       _type == 'navEntryLink' => {
//         ...,
//         reference->{
//           _type,
//           title,
//           slug,
//           _type == 'person' => {
//             'title': name.firstName + ' ' + name.lastName
//           }
//         }
//       },
//       _type == 'navItem' => @
//     }
//   }
// }`;
