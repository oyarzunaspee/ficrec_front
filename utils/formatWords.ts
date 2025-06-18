export const formatWords = (num: number) => {
    const numf = new Intl.NumberFormat()
    let numString = numf.format(num)
    const pos = numString.indexOf(".")
    return pos != -1 ? numString.slice(0, pos) + "K" : numString
}