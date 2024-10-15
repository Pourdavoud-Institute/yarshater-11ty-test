import htm from "htm";
import vhtml from "vhtml";
import { toHTML, uriLooksSafe } from "@portabletext/to-html";
import { sanityClient } from "../../lib/sanity/sanityClient.js";
import { pagesQuery } from "../../lib/sanity/queries/pages.js";
import { config } from "../site.js";

export default async function () {
    const data = await sanityClient.fetch(pagesQuery, {
        workspaceTag: config.sanityWorkspace,
    });

    // console.log({ data });

    const html = htm.bind(vhtml);
    // const portableTextComponents = {
    //     types: {
    //         set_sectionPreview: ({ value }) =>
    //             html`<div>rendered section preview with ${value}</div>`,
    //         set_richTextSection: ({ value }) =>
    //             html`<div>rendered rich text section with ${value}</div>`,
    //     },
    // };

    const processedData = [];

    for (let i = 0; i < data.length; i++) {
        const page = data[i];

        if (page.content) {
            const content = page.content;

            for (let i = 0; i < content.length; i++) {
                const section = content[i];

                if (section._type === "set_richTextSection") {
                    // console.log(toHTML(section.richText.blocks));
                    section.richText.html = toHTML(section.richText.blocks);
                }
            }
        }

        processedData.push(page);
    }

    // const pages = data.map((page) => {
    //     return {
    //         ...page,
    //     };
    // });

    // console.log({ processedData });

    return processedData;
}
