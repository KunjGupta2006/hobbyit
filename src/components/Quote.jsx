import  { useEffect, useState } from 'react'

const Quote = () => {

    const [quote,setQuote]=useState({q:"",author:""});
    
    useEffect(()=>{
        const getquote=async()=>{
            const res=await fetch("https://motivational-spark-api.vercel.app/api/quotes/random");
            const result=await res.json();
            setQuote({
                q:result.quote,
                author:result.author,
            })
        }
        getquote();
    },[]);
  return (
          <section className="bg-blue-900 p-8 rounded-4xl text-[#d5d6f1aa] relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-[11px] italic font-medium leading-relaxed mb-6">
                {quote.q}
              </p>
              <p className="text-blue-400 font-black uppercase text-[10px] tracking-widest">~{quote.author}</p>
            </div>
          </section>
  )
}

export default Quote