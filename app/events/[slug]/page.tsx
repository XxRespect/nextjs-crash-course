import Image from "next/image";
import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

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
    
    const {
        image,
        overview,
        date,
        time,
        location,
        mode,
        agenda,
        audience,
        description,
        tags
    } = event

    return (
        <>
            <section className="relative top-20">
                <div className="header">
                    <h1>Event description</h1>
                    <p className="mt-2">{description}</p>
                </div>
                <div className="details">
                    {/*left side - Event content */}

                    <div>
                        <Image src={image} alt="Event banner" width={800} height={800} className="banner"/>

                        <section className="flex-col-gap-2">

                        </section>
                    </div>
                    {/*Right side - Booking form*/}
                        <aside className="booking">
                            <p className="text-lg font-semibold">Book Event</p>
                        </aside>
                </div>
            </section>
        </>
    )
}
export default EventDetailsPage
