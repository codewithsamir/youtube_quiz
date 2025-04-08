"use client"
import { Check, Trash2 } from 'lucide-react';
import Image from "next/image"
import { useState } from "react"




const Page = () => {
  const [disablebtn, setdisablebtn] = useState(false)
  
  const [question, setquestion] = useState("")
  const [options , setoptions] = useState([
    {option:"",isCorrrect:false,description:""},
    {option:"",isCorrrect:false,description:""},
  
  ])

  const addoptionhandle = ()=>{
    if(options.length < 4){

      setoptions([...options, {option:"",isCorrrect:false , description:""}])
    }else{
      setdisablebtn(true)
      console.log("it working")
    }
  }

  const updateoptions = (index :number,option:string)=>{
  const newoption = [...options]
  newoption[index].option = option;
  setoptions(newoption)
  
  }
  const updatedescription = (index :number,description:string)=>{
  const newoption = [...options]
  newoption[index].description= description;
  setoptions(newoption)

  
  }
  const updateisCorrect = (index:number)=>{
  const newoption = options.map((data,i)=>(
    {...data,
       isCorrrect : i === index,
       description : i === index ? data.description : " ",
      }))
  setoptions(newoption)


  }

  const deleteoption = (index:number)=>{
    setoptions((prev)=>(prev.filter((data,i)=>i!==index)))

  }

  const submithandle = ()=>{
    const alldata = {...options,question}
    console.log(alldata)
  }


  return (
    <div className='quiz-box w-full md:w-[700px] mx-auto bg-[#202020] p-8 rounded-2xl mt-10'>
      
      <div className="top flex justify-between p-2">
        <div className="left">
          <Image src="/logo.png" alt="Logo" width={30} height={30} />
        </div>
        <div className="right">
          <p>visibiltiy: <span>public</span></p>
        </div>
      </div>

      <div className="m ">
        <div className="question">
          <input type="text" placeholder="Enter your question " className='border-none outline-none py-2 text-xl w-full'
          value={question}
          onChange={(e)=>{setquestion(e.target.value)}}
          />
        </div>
        <div className="options ">

          {options.length > 0 && options.map((data,index)=>(
  <div key={index} className="option border-1 my-4 border-gray-300 rounded-xl  w-full p-2">

  <div className="box flex items-center w-full">
  <div className={`checkbox w-4 h-4 rounded-full border-1 border-gray-300 flex justify-center items-center cursor-pointer  mr-2 ${data.isCorrrect ? "bg-green-500" : "bg-transparent"}`} 
  onClick={()=>updateisCorrect(index)}
  >
           
              {data.isCorrrect && 
  <Check />
              }
  </div>
  
  
              <input type="text" placeholder="Answer1" className='border-none outline-none w-[80%]' value={data.option}
               onChange={(e)=>{updateoptions(index,e.target.value)}} />
  
  
              <div className="delete ml-auto cursor-pointer" 
              onClick={()=>{
                deleteoption(index)
              }}
              >
              <Trash2 
              size={20}
               />
              </div>
  </div>
              
  
           <div className="des">
           {data.isCorrrect && 
              <input type="text" placeholder="Explain why this is correct (optional)" 
              className='border-none outline-none p-4 w-full'

              value={data.description}
              onChange={(e)=>{updatedescription(index,e.target.value)}}
              />
              
              }
           </div>
            </div>

          ))}

        

        </div>
      </div>
      <div className="add">
        <button
        disabled={disablebtn}
        onClick={addoptionhandle}
        className={`
        bg-[#003cff36] p-2 cursor-pointer mt-4 rounded-2xl hover:bg-[#003cff63] w-full ${disablebtn ? "opacity-10" : "opacity-100"}
        `}>Add Answer</button>
      </div>


      <div className="BOTTOM flex justify-between mt-4 ">
        <button className='px-4 py-1 hover:bg-gray-600  rounded-2xl  cursor-pointer '>cancel</button>
        <button
        onClick={submithandle}
        className='px-4 py-1 cursor-pointer text-md rounded-2xl bg-gray-700 hover:bg-gray-800'>post</button>
      </div>

    </div>
  )
}

export default Page