import ExplorerBtn from '@/components/ExplorerBtn'
import EventCard from '@/components/EventCard'
import {IEvent} from "@/database";




const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const page  = async () => {

    const response = await fetch(`${BASE_URL}/api/events`, {
        cache: 'no-store'
    })
    const { events } = await response.json()
  return (
    <>
      <section className='flex-1 max-w-4xl'>
        <h1 className='mt-10 text-4xl font-bold'>The hub for every Dev <br />Event You can&#39;t Miss</h1>
        <p className='mt-5 text-lg text-gray-300'>hackathons, Meetups, and Conferences, All in one Place.</p>
        <ExplorerBtn />

        <div className="mt-20 space-y-7">
          <h3>Featured Events</h3>
          <ul className='events' style={{listStyle:'none'}}>

            {
              events.map((event: IEvent) => (
                <li  key={event.title} className='list-none'>
                        <EventCard {...event}/>
                </li>

              ))
            }
          </ul>
        </div>
      </section>

      <aside className='w-80 flex-shrink-0 pt-32'>
        <div className='sticky top-32 bg-gradient-to-b from-blue-900/20 to-purple-900/20 rounded-lg p-6 border border-blue-500/20'>
          <h2 className='text-xl font-bold mb-4'>Booking</h2>
          <p className='text-sm text-gray-400 mb-4'>Selecione um evento para fazer sua reserva</p>
          <button className='w-full bg-blue-600 hover:bg-blue-700 transition-colors py-2 rounded-lg font-medium'>
            Reservar Evento
          </button>
        </div>
      </aside>
    </>
  )
}

export default page
