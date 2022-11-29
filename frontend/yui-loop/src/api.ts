export interface cards {
  rows?: (Rows)[] | null;
  count: number;
}
export interface Rows {
  id: number;
  userId: number;
  date: string;
  departureTime: string;
  departurePlace: string;
  destination: string;
  capacity: string;
}

const options = {
  url: 'http://api.atnd.org/events/?keyword_or=javascript&format=json'
}

async function request(path:string, options = {}) {
    const url = `${process.env.REACT_APP_API_ORIGIN}${path}`;
    const res: Response = await fetch(url, options);
    const card = await res.json() as cards;
    if (card.rows != null){
      console.log(card.rows[0]);
      console.log(card.rows[0].id);
      console.log(card.rows[0].departurePlace);
    }
    
}
  
export async function getWaitingList(arg = {}) {
    const params = new URLSearchParams(arg);
    return request(`/drivers/waitingpassengercard?${params.toString()}`);
  }