
const typeText = {
    blog: "בלוג",
    recipes: "מתכונים",
    plans: "תכניות",
}
const formatOpt = ["nums", "txt", "hour"]
const emptyObj = {
    blog: {
        title: '',
        imageUrl: [],
        previewContent: '',
        content: '',
    },

    recipes: {
        title: '',
        imageUrl: [],
        previewContent: '',
        content: '',
    },

    plans: {
        title: '',
        imageUrl: [],
        previewContent: '',
        content: '',
        price: '',
        duration: '',
    }
}


export const adminConfig = {
    blog: {
        columns: [
            { key: "title", label: "כותרת", field: "title" },
            { key: "views", icon: "fa-solid fa-eye fa-lg", clr: "rgb(76, 109, 135)", field: "views" },
            { key: "comments", icon: "fa-solid fa-comment fa-lg", clr: "rgb(85, 85, 85)", render: item => item.comments?.length || 0 },
            { key: "likes", icon: "fa-solid fa-heart fa-lg", clr: "rgb(97, 31, 31)", field: "likes" },
            { key: "date", label: "תאריך", render: (item, { getTimeStr }) => getTimeStr(item) },
        ],
        actions: ({ onEdit, onRemove, navigate, type }) => ({
            view: item => navigate(`/${type}/${item._id}`),
            edit: item => onEdit(item._id),
            remove: id => onRemove(id),
            comments: item => navigate(`${type}/${item._id}`)
        }),
        id: true
    },

    recipes: {
        columns: [
            { key: "title", label: "כותרת", field: "title" },
            { key: "views", icon: "fa-solid fa-eye fa-lg", clr: "rgb(76, 109, 135)", field: "views" },
            { key: "comments", icon: "fa-solid fa-comment fa-lg", clr: "rgb(85, 85, 85)", render: item => item.comments?.length || 0 },
            { key: "likes", icon: "fa-solid fa-heart fa-lg", clr: "rgb(97, 31, 31)", field: "likes" },
            { key: "date", label: "תאריך", render: (item, { getTimeStr }) => getTimeStr(item) },
        ],
        actions: ({ onEdit, onRemove, navigate, type }) => ({
            view: item => navigate(`/${type}/${item._id}`),
            edit: item => onEdit(item._id),
            remove: id => onRemove(id),
            comments: item => navigate(`${type}/${item._id}`)
        }),
        id: true
    },

    plans: {
        columns: [
            { key: "title", label: "כותרת", field: "title" },
            { key: "views", icon: "fa-solid fa-eye fa-lg", clr: "rgb(76, 109, 135)", field: "views" },
            { key: "date", label: "תאריך", field: "createdAtTimestamp" },
        ],
        actions: ({ onEdit, onDelete, navigate, type }) => ({
            view: item => navigate(`/${type}/${item._id}`),
            edit: item => onEdit(item._id),
            remove: id => onRemove(id),
        }),
        id: true
    },

    typeText,
    formatOpt,
    emptyObj,
}