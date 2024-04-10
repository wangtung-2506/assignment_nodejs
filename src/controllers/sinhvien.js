import Joi from "joi";
import Sinhvien from "../models/sinhvien"

const checkSinhvien = Joi.object({
    name: Joi.string().required().empty().trim(),
    age: Joi.number().required().empty(),
    email: Joi.string().email({ tlds: { allow: false } }).required().empty().trim(),
    phone: Joi.number().required().empty(),
  });
export const createSV = async(req,res) =>{
    try {
        const { name, age, email,phone } = req.body;
        const { error } = checkSinhvien.validate(req.body, { abortEarly: false });
        if (error) {
          const messages = error.details.map((error => error.message));
          return res.status(400).json({ messages });
        }
        const sinhvien = await Sinhvien.create(req.body)
        return res.status(200).json({sinhvien,message:"them thanh cong"})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}
export const getAllSv = async(req,res) =>{
    try {
        const sinhvien = await Sinhvien.find({})
        return res.status(200).json({sinhvien,message:"lay danh sach thanh cong"})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}
export const getSV = async(req,res) =>{
    try {
        const sinhvien = await Sinhvien.findById(req.params.id)
        return res.status(200).json({sinhvien,message:"lay sinh vien theo id thanh cong"})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}
export const deleteSV =async(req,res) =>{
    try {
        const sinhvien = await Sinhvien.findByIdAndDelete(req.params.id)
        return res.status(200).json({sinhvien,message:"xoa sinh vien thanh cong"})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}
export const updateSV = async(req,res) =>{
    try {
        const { name, age, email,phone } = req.body;
        const { error } = checkSinhvien.validate(req.body, { abortEarly: false });
        if (error) {
          const messages = error.details.map((error => error.message));
          return res.status(400).json({ messages });
        }
        const id = req.params.id;
        const sinhvien  = await Sinhvien.findByIdAndUpdate(id,req.body,{new:true})
        return res.status(200).json({sinhvien,message:"cap nhat sinh vien thanh cong"})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}
