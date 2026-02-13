import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Event from '@/database/event.model'
import { v2 as cloudinary } from 'cloudinary'

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();


        const file = formData.get('image') as File | null;
        let eventData: Record<string, FormDataEntryValue>;

        try {
             eventData = Object.fromEntries(formData.entries());
        } catch(e) {
            return NextResponse.json({message:'Invalid JSON data format'}, {status:400})
        }
        if(!file)
            return NextResponse.json(
                { message: 'image file is required' },
                { status: 400 }
            );

            let tags = JSON.parse(formData.get('tags') as string)
            let agendas = JSON.parse(formData.get('agenda') as string)
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const uploadResult = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({resource_type: 'image',folder: 'DevEvent'}, (error, results) => {
                    if(error) return reject(error);
                    return resolve(results);
                }).end(buffer);

            });

            eventData.image = (uploadResult as {secure_url: string}).secure_url;



        const createdEvent = await Event.create({
            ...eventData,
            tags: tags,
            agenda: agendas

        });


        return NextResponse.json(
            { message: "Event created sucessfully", event: createdEvent },
            { status: 201 }
        );

    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'Event creation failed' }, { status: 500 });
    }
}


export async function GET(req: NextRequest) {
    try {
        await connectDB();

        
        const events = await Event.find().sort({createdAt: -1})


        return NextResponse.json({ events }, { status: 200 });
    }catch (e) {
        return NextResponse.json({ message: 'Event fetching error' });
    }
}


// a route that acc ept a slug as input and return the event details
