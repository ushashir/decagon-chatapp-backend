import Joi from "joi"
export const registerSchema = Joi.object().keys({
    username:Joi.string().required(),
    email:Joi.string().trim().lowercase().required(),
    password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    
})

export const loginSchema = Joi.object().keys({
    username:Joi.string().trim().lowercase().required(),
    password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  
})
export const options ={
    abortEarly:false,
    errors:{
        wrap:{
            label: ''
        }
    }
} 
