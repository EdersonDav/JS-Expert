function execute(input){
    const result = [];
    run(input, result)

    return result;
}

function run(input, array, current = 0, next = 1){
    if(input === 0){
        return
    }
    array.push(current)
    run(input - 1, array, next, current + next)
}
