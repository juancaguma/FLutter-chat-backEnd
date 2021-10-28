const {response} = require('express');
const bcrypt=require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario= async (req,res=response)=>{

    const {email,pass} = req.body;
    try {
        const existeEMail=await Usuario.findOne({email});
        if (existeEMail) {
            return res.status(400).json({
                ok:false,
                msg:'Email duplicado'
            });
        }
        const usuario=new Usuario(req.body);
        //Encryptar password
        const salt= bcrypt.genSaltSync();
        usuario.pass=bcrypt.hashSync(pass,salt);
        await usuario.save();
        //Generar mi JWT (JSON web Token)
        const token= await generarJWT(usuario.id);
        res.json({
            ok:true,
            msg: 'Crear usuario!!!',
            usuario,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Habla con el Admin del sistema'
        });
    }

   
}
const login= async (req,res=response)=>{
    const {email,pass} = req.body;
    try {
        const usuarioDB= await Usuario.findOne({email});
        
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg:'Email no encontrado'
            });
        }
        const validaPass= bcrypt.compareSync(pass,usuarioDB.pass);
        if (!validaPass) {
            return res.status(400).json({
                ok: false,
                msg:'Error en la contraseña'
            });
        }

        //Generar el JWT 
        const token= await generarJWT(usuarioDB.id);
        res.status(200).json({
            ok:true,
            msg: 'Crear usuario!!!',
            usuarioDB,
            token
        });

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Habla con el Admin del sistema!!'
        });
    }

}

const renewToken= async(req,res=response)=>{
    const uid=req.uid;
    const tokenNew= await generarJWT(uid);
    const usuarioDB= await Usuario.findById(uid);

    res.status(200).json({
        ok:true,
        msg: 'Token renovado',
        usuarioDB,
        tokenNew
    });
}


module.exports={
    crearUsuario,
    login,
    renewToken
}