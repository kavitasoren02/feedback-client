export const generateFieldId = (label) => {
    if (!label || typeof label !== "string") {
        return ""
    }

    return label
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "_") 
        .replace(/^_+|_+$/g, "") 
        .replace(/_+/g, "_")
}

export const ensureUniqueIds = (fields) => {
    const usedIds = new Set()

    return fields.map((field) => {
        const baseId = generateFieldId(field.label)
        let finalId = baseId
        let counter = 1

        while (usedIds.has(finalId)) {
            finalId = `${baseId}_${counter}`
            counter++
        }

        usedIds.add(finalId)

        return {
            ...field,
            id: finalId,
        }
    })
}

export const isValidId = (id) => {
    if (!id || typeof id !== "string") {
        return false
    }

    return /^[a-z_][a-z0-9_]*$/i.test(id)
}
