const enquiryModel = require("../../models/enquiry.model");

let enquiryInsert = (req,res) =>
    {
        let {name, email, phone, message} = req.body;
        let enquiry = new enquiryModel({
            name,
            email,
            phone,
            message
        });
        enquiry.save().then(() => {
            res.status(200).json({ status:1, message: "Enquiry inserted successfully"});
        }).catch((err) => {
            res.status(500).json({status:0, message: "Error inserting enquiry", error: err});
        });
    }

// http://localhost:3000/api/website/enquiry/insert

let enquiryList = async (req, res) => {
   let  enquiry = await enquiryModel.find();
   res.send({
         status: 1,
         message: "Enquiry list fetched successfully",
         enquiryList: enquiry
   })
}


let enquiryDelete = async (req, res) => {
   let enquiryId = req.params.id;   
 let enquiry = await enquiryModel.deleteOne({_id: enquiryId});
   res.send({   
        status: 1,
        message: "Enquiry deleted successfully",
        enquiry
     });
}


let enquirySingleRow= async (req, res) => {       
    let enquiryId = req.params.id;
    let enquiry =await enquiryModel.findOne({_id: enquiryId});
    res.send({
        status: 1,
        message: "Enquiry fetched successfully",
        enquiry
    });
}

let enquiryUpdate = async (req, res) => {
    let enquiryId = req.params.id;
    let {name, email, phone, message} = req.body;
    let updateObj =  
    {
        name,
        email,
        phone,
        message
    }
    let update = await enquiryModel.updateOne({_id: enquiryId }, updateObj);
    res.send({  
        status: 1,
        message: "Enquiry updated successfully",
        update
    });
}
module.exports = { enquiryInsert, enquiryList, enquiryDelete, enquirySingleRow, enquiryUpdate};