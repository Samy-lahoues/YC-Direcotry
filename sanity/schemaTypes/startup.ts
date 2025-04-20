import { defineType, defineField } from "sanity"

export const startup = defineType({
    name: "startup",
    title : "Startup",
    type: "document",
    fields : [
        defineField({
            name: "title",
            type: "string",
        }),
        defineField({
            name: "slug",
            type: "slug",
            options : {
                source : 'title'
            }
        }),
        defineField({
            name: "author",
            type: "reference",
            to: { type : "author" }
        }),
        defineField({
            name: "views",
            type: "number",
            initialValue : 0,
            validation: (Rule) => Rule.required().min(0)
        }),
        defineField({
            name: "description",
            type: "string",
        }),
        defineField({
            name: "category",
            type: "string",
            validation: (Rule) => Rule.min(1).max(20).required().error("Please enter a category"),
        }),
        defineField({
            name: "image",
            type: "url"
        }),
        defineField({
            name: "pitch",
            type: "markdown",
        })
    ]
})