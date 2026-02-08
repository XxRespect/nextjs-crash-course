import ExplorerBtn from '@/components/ExplorerBtn'
import EventCard from '@/components/EventCard'
import { events } from '@/lib/constants'

const page = () => {
  return (
    <>
      <section>
        <h1 className='text-center mt-10'>The hub for every Dev <br />Event You can't Miss</h1>
        <p className='text-center mt-5'>hackathons, Meetups, and Conferences, All in one Place.</p>
        <ExplorerBtn />

        <div className="mt-20 space-y-7">
          <h3>Featured Events</h3>
          <ul className='events' style={{listStyle:'none'}}>

            {
              events.map((event) => (
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