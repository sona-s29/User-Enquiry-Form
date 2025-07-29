import React from 'react'
import { Button, Checkbox, Label, Textarea, TextInput } from "flowbite-react";
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import EnquiryList from './EnquiryList';
import axios from 'axios';

import { useState } from 'react';
import { useEffect } from 'react';
export default function () {
  const BASE_URL = import.meta.env.VITE_API_URL;
  let [enquiryList, setEnquiryList] = useState([]);
  let [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "", 
    _id:""
  });

let getAllEnquiry = () => {
    axios.get(`${BASE_URL}/view`) 
    .then ((res) => {
     return res.data;
    })
    .then((finalData) => {
      if (finalData.status) {
        setEnquiryList(finalData.enquiryList);
      } 
    })
  }
  
  
let getValue = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;  
    let oldData = { ...formData };

    oldData[inputName] = inputValue;
    setFormData(oldData);
  }

  let saveEnquiry = (e) => {

    e.preventDefault();

    if(formData._id) {
      axios.put(`${BASE_URL}/update/${formData._id}`, formData)
        .then((res) => {
          toast.success("Enquiry updated successfully!");
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
            _id: ""
          });
           getAllEnquiry();
        });


    }else {
      
 axios.post(`${BASE_URL}/insert`, formData)
  .then((res) => {
    console.log(res.data);  
    toast.success("Enquiry submitted successfully!");
    getAllEnquiry(); // Refresh the list after insertion
  setFormData({
      name: "",
      email: "",
      phone: "",
      message: ""
    });

  });
    }

}

  useEffect(() => {
    getAllEnquiry();
  }, []);

  return (
    <div >
      <ToastContainer/>
      <h1 className='text-[40px] text-center py-6 font-bold '>User Enquiry</h1>

      <div className='grid grid-cols-[30%_auto]'>
        <div className='bg-gray-900 p-4 ml-4'>
          <h2 className='text-[20px] font-bold text-white text-center'>Enquiry Form</h2>
          <form action="" onSubmit={saveEnquiry}>
            <div className='py-3 '>
              <Label htmlFor="name">Your Name</Label>
              <TextInput name="name" type="name" value={formData.name} onChange={getValue} placeholder="Enter Your name" required />
            </div>
            <div className='py-3'>
              <Label htmlFor="email" >Your Email</Label>
              <TextInput name="email" type="email" value={formData.email} onChange={getValue} placeholder="Enter Your email" required />
            </div>

            <div className='py-3'>
              <Label htmlFor="phone">Your Phone</Label>
              <TextInput name="phone" type="text" value={formData.phone} onChange={getValue} placeholder="Enter Your phone" required />
            </div>

            <div className='py-3'>
              <Label htmlFor="message">Enter Your Message</Label>
              <Textarea name="message" value={formData.message} onChange={getValue} placeholder="Message..." required rows={4} />
            </div>

            <div className='py-3'>
              <Button type="submit" className='w-[100%]  text-black bg-blue-300'>
                {formData._id ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        </div>
       <EnquiryList data = {enquiryList} getAllEnquiry = {getAllEnquiry} Swal={Swal} setFormData={setFormData} BASE_URL = {BASE_URL}/>
       
      </div>

    </div>
  )


} 