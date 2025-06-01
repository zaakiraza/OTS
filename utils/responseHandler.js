export const successHandler = (res, code, message, data, count) => {
    res.status(code).json({
        status: true,
        message: message,
        data: data || "",
        count: count || ""
    })
}


export const errorHandler = (res, code, message) => {
    res.status(code).json({
        status: false,
        message: message
    })
}