/** Clean slug of leading slash - use for slugs coming from manual input where user usage might be inconsistent
 * @param {string} slug
 */
export default function cleanSlug(slug) {
    if (slug.startsWith("/")) {
        return slug.slice(1, slug.length);
    }
    return slug;
}
