export const cloneDeep = (data) => {
    try {
        return JSON.parse(JSON.stringify(data))
    } catch (error) {
        console.log(error)
    }
}