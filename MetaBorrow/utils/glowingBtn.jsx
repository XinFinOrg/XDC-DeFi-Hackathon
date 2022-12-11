
export default function GlowingBtn({btnName}){
    return(
        <button className="font-bold font-fontDM font-xl  text-center text-white bg-gradient-to-r from-btn-blue via-btn-purple to-btn-blue   
        animate-glow bg-300 border-2 border-black p-3 px-5 mt-1 rounded-full">
        {btnName}
        </button>
    )
}