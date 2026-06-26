import { pages } from "@/lib/pages"

export const getPage = async (page) => {
    return pages[page];
}