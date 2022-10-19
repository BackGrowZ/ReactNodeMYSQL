export const inputLength = (input, length = 255) => {
    return input.length < length
}

/* inputs :
STRUCTURE
[
    {value:string, maxLength:number|undefined},
    {value:string, maxLength:number|undefined},
    string
]

EXEMPLE

[
    {value:'test', maxLength:42},
    {value:'me'},
    "testme"
]


*/
export const inputsLength = (inputs,length = 255) => {
    for(let i=0; i< inputs.length; i++){
        let maxLength = inputs[i].maxLength || length
        let value = inputs[i].value || inputs[i]
        if(value.length > maxLength){
            return false
        }
    }
    return true
}

