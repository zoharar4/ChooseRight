
const postColumns = [
    { key: "title",    label: "כותרת", field: "title" },
    { key: "views",    icon: "fa-solid fa-eye fa-lg",     clr: "rgb(76, 109, 135)", field: "views",    sortable: true, sortField: item => item.views || 0 },
    { key: "comments", icon: "fa-solid fa-comment fa-lg", clr: "rgb(85, 85, 85)",   render: item => item.comments?.length || 0, sortable: true, sortField: item => item.comments?.length || 0 },
    { key: "likes",    icon: "fa-solid fa-heart fa-lg",   clr: "rgb(97, 31, 31)",   field: "likes",    sortable: true, sortField: item => item.likes || 0 },
    { key: "versions", icon: "fa-solid fa-clock-rotate-left fa-lg", clr: "rgb(120, 90, 50)", render: item => item.versionCount || 0, sortable: true, sortField: item => item.versionCount || 0 },
    { key: "date",     label: "תאריך", render: (item, { getTimeStr }) => getTimeStr(item), sortable: true, sortField: item => item.createdAtTimestamp || 0 },
]

const planColumns = [
    { key: "title",    label: "כותרת", field: "title" },
    { key: "views",    icon: "fa-solid fa-eye fa-lg", clr: "rgb(76, 109, 135)", field: "views", sortable: true, sortField: item => item.views || 0 },
    { key: "versions", icon: "fa-solid fa-clock-rotate-left fa-lg", clr: "rgb(120, 90, 50)", render: item => item.versionCount || 0, sortable: true, sortField: item => item.versionCount || 0 },
    { key: "date",     label: "תאריך", render: (item, { getTimeStr }) => getTimeStr(item), sortable: true, sortField: item => item.createdAtTimestamp || 0 },
]

export const adminConfig = {
    blog:    { columns: postColumns, id: true },
    recipes: { columns: postColumns, id: true },
    plans:   { columns: planColumns, id: true },

    typeText: {
        blog:    "בלוג",
        recipes: "מתכונים",
        plans:   "תכניות",
    },

    formatOpt: ["nums", "txt", "hour"],

    emptyObj: {
        blog:    { title: '', imageUrl: [], previewContent: '', content: '' },
        recipes: { title: '', imageUrl: [], previewContent: '', content: '' },
        plans:   { title: '', imageUrl: [], previewContent: '', content: '', price: '', duration: '' },
    },
}
