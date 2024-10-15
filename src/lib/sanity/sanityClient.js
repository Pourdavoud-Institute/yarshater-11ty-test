import { createClient } from "@sanity/client";

export const sanityClient = createClient({
    projectId: "f1xxrhn4",
    dataset: "production",
    apiVersion: "2024-09-01",
    useCdn: false,
});
