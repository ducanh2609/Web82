const cloneDeep = (data) => {
    return JSON.parse(JSON.stringify(data))
}


export { cloneDeep }