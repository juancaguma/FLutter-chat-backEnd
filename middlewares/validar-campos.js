const { validationResult } = require('express-validator');
const validarCampos=(req,res,next)=>{

    const errores=validationResult(req);
    // if (errores.isEmpty()) {
    //     console.log('AQIO');
    // }
    if (!errores.isEmpty()) {
        if (errores.mapped().email==null) {
            mensaje=errores.mapped().pass['msg'];
        }else{
            mensaje=errores.mapped().email['msg'];
        }
        return res.status(400).json({
            ok: false,
            msg:mensaje,
            errors: errores.mapped()
        });
        
    }
    next();
}

module.exports={
    validarCampos
}