import { Request, Response } from 'express';
import prisma from '@/prisma';



export class EventController {
  async getEvents(req: Request, res: Response) {
    try {
      const events = await prisma.event.findMany();
      return res.status(200).send(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async createEvents(req: Request, res: Response) {
    const {
      name,
      description,
      price,
      date,
      time,
      location,
      availableSeats,
      ticketType,
      category,
      organizerId
    } = req.body;

    try {
      if (!name || !description || !price || !date || !time || !location || !availableSeats || !category || !organizerId) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const userExists = await prisma.user.findUnique({
        where: { id: organizerId }
      });

      if (!userExists) {
        return res.status(400).json({ message: "Organizer not found" });
      }

      const newEvent = await prisma.event.create({
        data: {
          name,
          description,
          price,
          date: new Date(date),
          time,
          location,
          availableSeats,
          ticketType,
          category,
          organizer: { connect: { id: organizerId } },
        }
      });

      return res.status(201).json(newEvent);
    } catch (error) {
      console.error("Error creating event:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async CreateImage(req: Request, res: Response) {
    try {
        if (!req.file) throw 'no file uploaded' // dapat dari middleware upload.ts 
        const link:string = `http://localhost:8000/api/public/avatar/${req.file?.filename}`
        console.log(link)
        
        const {eventId} = req.body
        
        await prisma.image.create({
            data:{
                eventId:+eventId,
                url:link
            }
        })

        res.status(200).send({
            status:"ok",
            msg:"create avatar success!"
        })

    } catch (err) {
        res.status(400).send({
            status:"error",
            msg:err
        })
    }

  }
}
