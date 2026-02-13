import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";
import { getSimliarEventBySlug } from "@/lib/actions/events.action";
import Image from "next/image";
import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({ icon, alt, label }: { icon: string; alt: string; label: string }) => (
    <div className="flex items-center gap-2 ">
        <Image src={icon} alt={alt} width={17} height={17} />
        <p>{label}</p>
    </div>
)

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
    <div className="agenda mt-4">
        <h2 className="text-xl font-semibold mt-4 mb-2 ">Agenda</h2>
        <ul className="list-disc list-inside " >
            {
                agendaItems.map((item: string) => (
                    <li key={item} className="flex items-start gap-2">
                        {item}
                    </li>
                ))
            }
        </ul>
    </div>
)

const EventTags = ({ tags }: { tags: { tags: string[] } }) => (
    <div className="flex flex-row gap-2 mt-4">
        {
            tags.map((tag: string) => (
                <div className="pill" key={tag}>
                   <p className="font-bold shadow-stone-400">{tag}</p>
                </div>
            ))
        }
    </div>
)

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {

    const { slug } = await params;
    const request = await fetch(`${BASE_URL}/api/events/${slug}`, {
        cache: 'no-store'
    })

    if (!request.ok) {
        return notFound();
    }

    const { event } = await request.json()

    if (!event) {
        return notFound();
    }

    const { image, overview, organizer,date, time, location, mode, agenda, audience, description, tags
    } = event

    const similarEvents: IEvent[] = await getSimliarEventBySlug(slug)

    return (
        <>
            <section className="absolute top-20 left-0 ml-4 mr-4 md:ml-8 md:mr-8 lg:ml-16 lg:mr-16 xl:ml-32 xl:mr-32 block">
                <div className="header">
                    <h1 className="text-3xl font-bold">{event.title}</h1>
                    <p className="mt-4 mb-4 gap-2 text-white font-semibold">{description}</p>
                </div>
                <div className="details">
                    {/*left side - Event content */}

                    <div className="content">
                        <Image src={image} alt="Event banner" width={800} height={800} className="banner rounded-2xl" />

                        <section className="mt-8 max-w-3xl">
                            <h2 className="text-xl font-semibold">Overview</h2>
                            <p>{overview}</p>

                        </section>

                        <section className="mt-8">
                            <h2 className="text-xl font-semibold mt-4">Event Details</h2>
                            <EventDetailItem icon="/icons/calendar.svg" alt="calendar" label={date} />
                            <EventDetailItem icon="/icons/clock.svg" alt="time" label={time} />
                            <EventDetailItem icon="/icons/pin.svg" alt="location" label={location} />
                            <EventDetailItem icon="/icons/mode.svg" alt="location" label={mode} />
                            <EventDetailItem icon="/icons/audience.svg" alt="audience" label={audience} />
                        </section>
                        <EventAgenda agendaItems={agenda} />

                        <section className="mt-8">
                            <h2 className="text-xl font-semibold">About the organizer</h2>
                            <p className="max-w-3xl">{organizer}</p>
                        </section>
                        <EventTags tags={tags} />
                    </div>
                    {/*Right side - Booking form*/}
                    <aside className="booking absolute right-0 ">
                        <p className="text-lg font-semibold">Book Event</p>
                    </aside>
                </div>
                <div className='flex flex-col gap-4 mt-16'>
                    <h2 className="text-xl font-semibold">Similar Events</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {
                            similarEvents.length > 0 ? similarEvents.map((event: IEvent) => (
                                <EventCard key={event.title} {...event} />
                            )) : <p>No similar events found</p>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
export default EventDetailsPage
