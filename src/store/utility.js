 const utility = {
    updateObject: (oldObject, updatedObject) => {
        return {
            ...oldObject,
            ...updatedObject
        }
    }
}

export default utility;