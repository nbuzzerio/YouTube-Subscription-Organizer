var insertionSort = function (array) { //sorting in reverse chronological order
    
    let current = array.pop()
    let index = 2;

    if (array[0].date < array[1].date) {
        let placeholder = array[0];
        array[0] = array[1];
        array[1] = placeholder;
    }

    while (index <= array.length) {
        for (var i = 0; i < index; i++) {
            if (array[i].date < current.date) {
                array.splice(i, 0, current);
                current = array.pop();
                break;
            } else if (i === (index - 1)) {
                array.splice(index, 0, current);
                current = array.pop();
            }

        }
        if (index === array.length) {
            array.splice(index, 0, current);
            break;
        }
        index++;
    }

    return array;

};

export default insertionSort;