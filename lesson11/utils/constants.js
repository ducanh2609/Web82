export const checkPayload = (data) => {
    const keys = Object.keys(data)
    keys.forEach((key) => {
        if (!data[key]) {
            delete data[key]
        }
    })
}