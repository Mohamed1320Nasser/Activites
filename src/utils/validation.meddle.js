const dataMethod = ['body', 'params', 'query', 'headers']

exports.validation = (Schema) => {
    return (req, res, next) => {
        try {
            const validationArr = []
            dataMethod.forEach(key => {
                if (Schema[key]) {
                    const validationResult = Schema[key].validate(req[key], { abortEarly: false })
                    if (validationResult?.error) {
                        validationArr.push(validationResult.error.details)
                    }
                }
            })
            if (validationArr.length) {
                return res.status(400).json({ message: "Validation error", validationArr })
            } else {
                return next()
            }

        } catch (error) {
            return next(new Error("validation err", 500 ))
        }
    }

}