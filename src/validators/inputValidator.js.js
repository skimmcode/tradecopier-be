const Joi = require('joi');
const validatorHandler = require("../middlewares/validatorHandler");

//for faqs column/fields validation
const faqValidator = (req,res,next) => {
    const schema = Joi.object().keys({
        question: Joi.string().trim().required(),
        answer: Joi.string.trim().required,
        active: Joi.boolean().required(),
        cat_id: Joi.integer().trim().required()
    });

    validatorHandler(req,res,next,schema);
}

//for creating tickets
const ticket = (req,res,next) => {
    const schema = Joi.object().keys({
        firstName: Joi.string().trim().required(),
        lastName: Joi.string().trim().required(),
        companyName: Joi.string().trim().min(0).optional(), //this makes this field optional
        email: Joi.string().email().required(),
        subject: Joi.string().trim().required(),
        description: Joi.string().trim().required(),
        enquiryType: Joi.string().trim().required()
    });

    validatorHandler(req,res,next,schema);
}


//for creating new article
const articleValidator = (req,res,next) => {
const schema = Joi.object().keys({
    title: Joi.string().trim().min(4).required(),
    description: Joi.string().trim().required(),
    body: Joi.string().trim().required(),
    banner_img: Joi.string().trim().required(),
    active: Joi.boolean(),
    cat_id: Joi.number().integer().required()
});

validatorHandler(req,res,next,schema);
}



//for creating a new team member
const teammember = (req,res, next) => {
const schema = Joi.object().keys({
name: Joi.string().trim().min(2).required(),
designation: Joi.string().trim().required(),
linkedinprofile: Joi.string().required(),
img: Joi.string().trim().min(2),
location: Joi.string().trim().required(),
intro: Joi.string().trim().min(5).required(),
education: Joi.string().trim().required(),
past_experience: Joi.string().trim().required(),
dept_id: Joi.required()
});

validatorHandler(req, res, next, schema);
};


//validators for signup module on the authentication API
const signup = (req, res, next) => {
    const schema = Joi.object().keys({
        username: Joi.string()
        .trim()
        .alphanum()
        .min(3)
        .max(50).
        required(),
        
        first_name: Joi.string()
            .trim()
            .alphanum()
            .min(3)
            .max(50),
        
        last_name: Joi.string()
            .trim()
            .alphanum()
            .min(3)
            .max(50),
        
        email: Joi.string()
            .trim()
            .email()
            .required(),
        
        password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),

        phone: Joi.string()
        .trim()
        .min(11)
        .max(14),
        
        user_role: Joi.string().trim().required(),

        is_admin: Joi.boolean()  
        });

    validatorHandler(req, res, next, schema);
};

const signin = (req, res, next) => {
    const schema = Joi.object().keys({
        email: Joi.string()
            .trim()
            .email()
            .required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
    });
    validatorHandler(req, res, next, schema);
};

const passwordcheck = (req,res,next)=>{
const schema = Joi.object().keys({
password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
});
validatorHandler(req,res,next, schema);
};

module.exports = {
    signup,
    signin,
    passwordcheck,
    teammember,
    articleValidator,
    ticket,
    faqValidator
};