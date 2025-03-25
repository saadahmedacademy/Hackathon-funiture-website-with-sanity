import { defineType,defineField } from "sanity";

export const Category = defineType({
    name: "category",
    title: "Category",
    type: "document",
    icon: "categoryIcon",
    fields:[
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            validation: (rule) => rule.required(),
            options: {
                source: "name",
            }
        }),
        defineField({
            name: "categoryItems",
            title: "Category Items",
            type: "array",
            of: [{ type: "reference", to: [{ type: "product" }] }]
        })
    ]
})