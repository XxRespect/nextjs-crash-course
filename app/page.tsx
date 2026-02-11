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
      <section>
        <h1 className='text-center mt-10'>The hub for every Dev <br />Event You can&#39;t Miss</h1>
        <p className='text-center mt-5'>hackathons, Meetups, and Conferences, All in one Place.</p>
        <ExplorerBtn />

        <div className="mt-20 space-y-7">
          <h3>Featured Events</h3>
          <ul className='events' style={{listStyle:'none'}}>

            {
              events.map((event: IEvent) => (
                <li  key={event.title}>
                        <EventCard {...event}/>
                </li>

              ))
            }
          </ul>
        </div>
      </section>

    </>
  )
}

export default page
