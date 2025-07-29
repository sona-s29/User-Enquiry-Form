import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Toast, toastTheme } from "flowbite-react";
import axios from 'axios';


function EnquiryList({ data, getAllEnquiry, Swal,setFormData, BASE_URL }) {
 

  let deleteRow = (delid) => {

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save"
    }).then((result) => {

      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        axios.delete(`${BASE_URL}/delete/${delid}`)
          .then((res) => {
            toast.success("Enquiry deleted successfully!");
            getAllEnquiry(); // Refresh the list after deletion
          })

      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });

  }

  let editRow = (editid) => {

    axios.get(`${BASE_URL}/single/${editid}`)
      .then((res) => {
        let data = res.data
        setFormData(data.enquiry);
      })
  }


  return (
    <div className='mx-5 bg-gray-900 p-4'>
      <h2 className='text-[20px] font-bold text-white mb-4 text-center'>Enquiry List</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>S No.</TableHeadCell>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Phone</TableHeadCell>
              <TableHeadCell>Message</TableHeadCell>
              <TableHeadCell>
                <span>Delete</span>
              </TableHeadCell>
              <TableHeadCell>
                <span>Edit</span>
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {
              data.length >= 1 ?
                data.map((item, index) => {
                  return (
                    <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {index + 1}
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.phone}</TableCell>
                      <TableCell>{item.message}</TableCell>
                      <TableCell>
                        {/* Add delete functionality here */}
                        <button className="text-red-600 hover:text-red-900" onClick={() => { deleteRow(item._id) }}>Delete</button>
                      </TableCell>
                      <TableCell>
                        {/* Add edit functionality here */}
                        <button className="text-blue-600 hover:text-blue-900" onClick={()=>{editRow(item._id)}}>Edit</button>
                      </TableCell>
                    </TableRow>
                  )
                })
                :
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell colSpan={7} className="text-center text-gray-500">
                    No data found.
                  </TableCell>
                </TableRow>
            }
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default EnquiryList;