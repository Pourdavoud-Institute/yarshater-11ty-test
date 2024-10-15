import { IdAttributePlugin } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import cleanSlug from "./src/lib/utils/cleanSlug.js";
import * as url from "url";
import htm from "htm";
import vhtml from "vhtml";
import voca from "voca";

/** @param {import("@11ty/eleventy").UserConfig} config */
export default function (config) {
    const html = htm.bind(vhtml);

    // Liquid template settings
    config.setLayoutResolution(false);
    config.setLiquidOptions({
        jsTruthy: true,
        dynamicPartials: true,
    });

    /* Template shortcodes */
    // Processes a title from a Sanity navItem - see groq query in /lib/sanity/queries/navigation
    config.addShortcode("navItemTitle", (navItem) => {
        if (
            navItem.type === "navEntryLink" ||
            navItem.type === "child_navEntryLink"
        ) {
            return navItem.title ?? navItem.reference.title;
        } else {
            return navItem.title;
        }
    });
    // Processes an href from a Sanity navItem - see groq query in /lib/sanity/queries/navigation; return with leading slash
    config.addShortcode("navItemHref", (navItem) => {
        if (navItem.type === "navItem" || navItem.type === "child_navItem") {
            if (!navItem.external) {
                return navItem.slug ? `/${cleanSlug(navItem.slug)}` : "#";
            } else {
                return navItem.url ? navItem.url : "#";
            }
        } else if (
            navItem.type === "navEntryLink" ||
            navItem.type === "child_navEntryLink"
        ) {
            return `/${navItem.reference.slug}`;
        } else {
            return "#";
        }
    });
    // config.addShortcode("breadcrumbs", (page) => {
    //     // Trim end slash
    //     const urlParts = voca.split(voca.trimRight(page.url, "/"), "/");
    //     // console.log(urlParts);
    //     const breadcrumbs = [];
    //     for (let i = 0; i < urlParts.length; i++) {
    //         const currentSlug = urlParts[i];
    //         let title = "";
    //         let url = "";
    //         if (i === 0) {
    //             title = "Home";
    //             url = "/";
    //         } else {
    //             title = voca.split(voca.titleCase(currentSlug), "-").join(" ");
    //             // remove first empty space
    //             url =
    //                 "/" +
    //                 urlParts
    //                     .slice(1, urlParts.indexOf(currentSlug) + 1)
    //                     .join("/");
    //         }
    //         breadcrumbs.push({
    //             title,
    //             url,
    //         });
    //     }
    //     // console.log(breadcrumbs);
    //     return breadcrumbs.map(
    //         (breadcrumb) =>
    //             html`<li class="ucla-breadcrumb__list-item">
    //                 <a class="ucla-breadcrumb__link" href="${breadcrumb.url}"
    //                     >${breadcrumb.title}</a
    //                 >
    //             </li>`
    //     );
    // });

    // Passthrough directories
    config.addPassthroughCopy("src/static");

    /* Plugins */
    // ID Attribute
    config.addPlugin(IdAttributePlugin);

    // Navigation
    config.addPlugin(eleventyNavigationPlugin);

    // 11ty Image Transform
    config.addPlugin(eleventyImageTransformPlugin, {
        // which file extensions to process
        extensions: "html",
        formats: ["webp"],
        defaultAttributes: {
            loading: "lazy",
            decoding: "async",
        },
    });

    return {
        dir: {
            input: "src",
        },
        templateFormats: ["html", "liquid", "md", "11ty.js"],
        htmlTemplateEngine: "liquid",
        markdownTemplateEngine: "liquid",
    };
}
