import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {

  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordarray, setpasswordarray] = useState([])
  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const getpasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json()
    console.log(passwords);
    setpasswordarray(passwords)


  }


  useEffect(() => {
    getpasswords()
  }, [])


  const handlesave = async () => {

    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

      setpasswordarray([...passwordarray, { ...form, id: uuidv4() }])

      let res = await fetch("http://localhost:3000", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() })
      })
       

     
      setform({ site: '', username: "", password: "" })

      console.log(passwordarray)
      toast('Password Saved!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,

      });


    }
    else {
      toast('Error : Password Not Saved!')
    }


  }



  const deletepassword = async (id) => {



    let c = confirm("Do you really want to delete this password?")
    if (c) {
      setpasswordarray(passwordarray.filter(item => item.id !== id))
      await fetch("http://localhost:3000", {
        method: "DELETE",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({ id })
      })

      toast("password deleted !")
    }

  }


  const editpasssword = (id) => {
    setform(passwordarray.filter(i => i.id == id)[0])
    setpasswordarray(passwordarray.filter(item => item.id !== id))
  }








  return (



    <div className=" h-[100vh] w-full bg-white">

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />




      <div className='upper w-full h-[100vh]'>
        <h2 className='flex-col align-middle my-16 m-auto w-40 mt   text-2xl font-bold text-green-400'>
          <span className='text-black'>&lt;Pass</span>World/&gt;
          <p className='text-sm text-gray-600 font-semibold text-center'>Save that Word!</p>
        </h2>
        <div className='flex flex-col gap-5 w-[60vw] mx-auto '>
          <input className='border border-green-400  rounded-full px-3 ' type='text' name='site' value={form.site} onChange={handlechange} placeholder='Enter Website' />
          <span> <input className='border border-green-400 rounded-full px-3 w-1/2 ' type='text' name='username' value={form.username} onChange={handlechange} placeholder='Enter username' />
            <input className='border border-green-400 rounded-full px-3 ml-10' type='password' name='password' value={form.password} onChange={handlechange} placeholder='Enter password' />
          </span>
          <button className='bg-green-500 rounded-full w-36 h-10 mx-auto my-5 align-middle flex justify-center items-center gap-2 font-bold text-xl hover:bg-green-400' onClick={handlesave}>
      <lord-icon 
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover" >
                        </lord-icon>
            Save</button>
        </div>


        <div className="relative overflow-x-auto  w-[60vw] mx-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-300 uppercase bg-green-950 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 rounded-s-lg">
                  Website
                </th>
                <th scope="col" className="px-6 py-3">
                  Username
                </th>
                <th scope="col" className="px-6 py-3 rounded-e-lg">
                  Password
                </th>
              </tr>
            </thead>
            <tbody>

              {passwordarray.map((item, index) => {


                return <tr className="bg-white dark:bg-gray-800" key={index}>

                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.site}
                  </th>
                  <td className="px-6 py-4">
                    {item.username}
                  </td>
                  <td className="px-6 py-4 flex justify-around absolute ">
                    <span>{item.password}</span>
                    <div className='flex sticky ml-16 gap-3 '>
                      <span className='cursor-pointer delete text-black' onClick={() => { deletepassword(item.id) }}><img className='align-center' width={"20px"} src='/delete.svg' /></span>
                      <span className='cursor-pointer delete text-black' onClick={() => { editpasssword(item.id) }}><img className='align-center' width={"20px"} src='https://cdn-icons-png.flaticon.com/512/32/32355.png' /></span>
                    </div> </td>

                </tr>
              })}
            </tbody>

          </table>
        </div>


      </div>
      <div className=" bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(110,240,112,0.71)] opacity-50 blur-[80px]">
      </div>



    </div>

  )
}

export default Manager
