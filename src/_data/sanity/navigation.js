import { sanityClient } from "../../lib/sanity/sanityClient.js";
import { navigationQuery } from "../../lib/sanity/queries/navigation.js";
import { config } from "../site.js";

export default async function () {
    const data = await sanityClient.fetch(navigationQuery, {
        workspaceTag: config.sanityWorkspace,
    });

    // console.log(data);

    return data;
}
