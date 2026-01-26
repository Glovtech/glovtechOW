import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'


const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null

interface HostelWaitlistData {
  hostelName?: string
  fullName?: string
  email: string
  phone: string
  numberOfRooms?: string
  location?: string
  institution?: string
  checkInDate?: string
  product?: string
  [key: string]: any
}

export async function POST(req: NextRequest) {
  try {
    const body: HostelWaitlistData = await req.json()

    const { hostelName, fullName, email, phone, numberOfRooms, location, product } = body
    const name = hostelName || fullName


    if (!name || !email || !phone) {
      return NextResponse.json(
        { 
          error: 'Name, email, and phone are required',
          received: { name, email, phone }
        },
        { status: 400 }
      )
    }

  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

 
    try {
      if (resend) {
        const userEmail = await resend.emails.send({
          from: 'Glovtech <noreply@glovtech.com>', 
          to: email,
          subject: '🏠 Welcome to Hostel Management Waitlist!',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #2563eb;">Welcome, ${name}! 🎉</h1>
              <p>Thank you for joining our Hostel Management waitlist!</p>
              
              <div style="background: #eff6ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h2 style="color: #1e40af; margin-top: 0;">Your Registration Details:</h2>
                <p><strong>Hostel Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                ${numberOfRooms ? `<p><strong>Number of Rooms:</strong> ${numberOfRooms}</p>` : ''}
                ${location ? `<p><strong>Location:</strong> ${location}</p>` : ''}
              </div>

              <p>We'll be in touch soon with more information about our Hostel Management System!</p>
              
              <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                Best regards,<br/>
                The Glovtech Team
              </p>
            </div>
          `,
        })

  
        const adminEmail = await resend.emails.send({
          from: 'Hostel Waitlist <noreply@glovtech.com>', 
          to: 'iantitusglover2@gmail.com', 
          subject: '🏠 New Hostel Waitlist Registration',
          html: `
            <div style="font-family: Arial, sans-serif;">
              <h2>New Waitlist Registration</h2>
              <p><strong>Hostel Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              ${numberOfRooms ? `<p><strong>Number of Rooms:</strong> ${numberOfRooms}</p>` : ''}
              ${location ? `<p><strong>Location:</strong> ${location}</p>` : ''}
              ${product ? `<p><strong>Product:</strong> ${product}</p>` : ''}
              <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
            </div>
          `,
        })
      }
    } catch (emailError) {
      // Continue even if email fails - registration is still saved
    }

    // ===== OPTIONAL: Save to database =====
    // Uncomment and configure based on your database
    /*
    import { db } from '@/lib/db'
    
    await db.hostelWaitlist.create({
      data: {
        hostelName: name,
        email,
        phone,
        numberOfRooms,
        location,
        product,
        createdAt: new Date(),
      },
    })
    */

    // ===== OPTIONAL: Save to Google Sheets =====
    /*
    const SHEET_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL
    
    if (SHEET_URL) {
      await fetch(SHEET_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hostelName: name,
          email,
          phone,
          numberOfRooms,
          location,
          product,
          timestamp: new Date().toISOString(),
        }),
      })
    }
    */

    return NextResponse.json(
      { 
        success: true,
        message: 'Successfully joined the waitlist!',
        data: { name, email, phone }
      },
      { status: 200 }
    )

  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}


export async function GET() {
  return NextResponse.json(
    { 
      error: 'Method not allowed',
      message: 'This endpoint only accepts POST requests'
    },
    { status: 405 }
  )
}


export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}