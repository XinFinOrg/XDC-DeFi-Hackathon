import Link from 'next/link'
import React from 'react'

const AuthPage = () => {
    return (
        <> <div className="bg-vision px-8 p-12 h-[62rem] lg:h-[60rem] lg:py-6 relative font-fontDM" id="vision">
            <div className="border border-white p-4 width-[20rem] ">
                
                <div className="flex flex-col font-fontDM pt-8 pb-4">
                    <h1 className="font-header text-3xl pb-8 text-center">Authorisation</h1>
                    <input type="text" className="rounded-sm mt-3 p-3" placeholder="Enter Your Gaming Email" />
                    <input type="text" className="rounded-sm mt-3 p-3" placeholder="Enter Your Gaming Password" />
                    <button className="font-bold font-fontDM font-xl  text-center text-white bg-gradient-to-r from-btn-blue via-btn-purple to-btn-blue   
        animate-glow bg-300 border-2 border-black p-3 px-5 mt-1 rounded-lg mt-4"> <Link href="/minting">Authorise</Link> </button>
                </div>
            </div>
           
        </div>
        </>
    )
}

export default AuthPage