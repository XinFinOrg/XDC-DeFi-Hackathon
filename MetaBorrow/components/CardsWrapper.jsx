import Card from "./Cards";

const cardsInfo = [
  {
      header:"Generate APR% 🚀",
      content:"MetaBorrow lets you stake your in-game digital assets to generate APR."
  },
  {
      header:"Enhance gaming experience 🔥",
      content:"Maximize your gaming experience by renting digital assets at low cost."
  },
  {
      header:"Yield Farming Opportunities 🦄",
      content:"Digital asset flipping on rented in-game assets to generate high ROI."
  },

]

export default function CardsWrapper() {
  return (
    <div className="grid p-12 place-content-center sm:grid-cols-3">
     {
       cardsInfo.map( el => {
         return(<>
          <Card header={el.header} content = {el.content} key={el.header} />
         </>)
       }
         
       )
     }
    </div>
  );
}
