const getArgs = (args) => {
    const res = {};
    const [, , ...rest] = args;
    rest.forEach((element, index, array) => {
        const secondPartString = element.substring(1);

        if (element.charAt(0) === '-') {
            if (index === array.length - 1) {
                res[secondPartString] = true;
            } else if (array[index + 1].charAt(0) !== '-') {
                res[secondPartString] = array[index + 1];
            } else {
                res[secondPartString] = true;
            }
        }
    });
    return res;
};

export { getArgs };
