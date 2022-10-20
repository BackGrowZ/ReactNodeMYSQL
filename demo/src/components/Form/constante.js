export const OBJECT = "object"
export const STRING = "string"
export const TEXT = "text"

export const defaultValue = {
    type: [TEXT, 'email', 'number', 'date','submit','reset','password', "file" ],
    value: {
        number:0,
        text:'',
        checkbox:false,
        submit:'validé',
        reset:'reset'
    },
    form:{
        login:["email", {type:"password", label:"Votre mot de passe"}],
        register:["email", {type:"password", label:"Votre mot de passe"}, {type:"password", label:"Confirmez votre mot de passe"}],
    },
    submit:() => console.log('test'),
    clear:false
}