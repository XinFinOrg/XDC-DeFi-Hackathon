


export default function Card({header,content,logo}){
    return(
        <>
        <div className=" flex flex-col font-fontDM items-center justify-center rounded-lg bg-gradient-to-r from-card-white  to-card-gray p-4 m-6 shadow-card hover:bg-card-hover transition-all">
            <div className="logo">
                
            </div>
            <h2 className="font-bold text-white pb-4 text-2xl ">{header}</h2>
            <p className="text-white text-center">{content}</p>
        </div>
        </>
    )
}