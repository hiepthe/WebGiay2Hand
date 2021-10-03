const router = require ('express').Router();
const Employee= require('../models/employee');
const bcrypt = require ('bcryptjs');
const config = require('../config');

router.post('/',async(req,res,next)=>{
    let employee = new Employee();

    employee.name=req.body.name;
    employee.email=req.body.email;
    employee.password=bcrypt.hashSync(req.body.password) ;
    employee.zone=req.body.zone;
    employee.role=req.body.role;
    employee.phone=req.body.phone;
    employee.image=req.body.gravatar();
    employee.status=req.body.status;

    try{
        employee = await employee.save();

        if(!employee){
            return res.status(500).json({
                success: false,
                message: 'The employee cannot be created'
            });
        }
        res.json({
            success: true,
            employee: employee
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'The employee cannot be created',
            error: error

        });
    }

});
module.exports = router;