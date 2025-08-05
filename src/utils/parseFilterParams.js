const parseContactType = (type) => {
    const isString = typeof type === "string";
    if (!isString) return;

    const isType = (type) => ["work", "home", "personal"].includes(type);
    if (isType(type)) return type;
};

export const parseFilterParams = (query) => {
    const { contactType, isFavourite } = query;

    const parsedContactType = parseContactType(contactType);

    return {
        contactType: parsedContactType,
        isFavourite,
    };
};