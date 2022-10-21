export const OBJECT = "object"
export const STRING = "string"
export const TEXT = "text"

export const defaultValue = {
    type: [TEXT, 'email', 'number', 'date','submit','reset','password', "file" ],
    input: {
      email: {type: 'email', pattern:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, patternError:'Adresse email invalide'},
      password: {type:'password', pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, patternError:'Minimum huit caractères, au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial'}
    },
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
        contact:[{type:'textarea', label:'commentaire'}]
        
    },
    submit:() => console.log('test'),
    clear:false
}