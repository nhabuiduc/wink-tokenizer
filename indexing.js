module.exports = function (text, arr) {
    let startSearchIndex = 0;
        const result= [];
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            const foundIndex = text.indexOf(element.value, startSearchIndex);
            if (foundIndex < 0) {
                return result;
            }

            result.push({
                word: element.value,
                index: foundIndex,
            })
            startSearchIndex = foundIndex + element.value.length;
        }

        return result;
};
