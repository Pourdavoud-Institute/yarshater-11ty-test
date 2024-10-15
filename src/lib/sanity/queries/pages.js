import groq from "groq";

/** Get pages document based on any matching "page_" prefix */
export const pagesQuery = groq`*[_type match 'page*' && $workspaceTag in workspaceTags.entries[]]{
    ...
}`;
