import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null

interface GloviWaitlistData {
  fullName: string
  email: string
  phone: string
  targetLanguage: string
  currentLevel: string
  product: string
}

export async function POST(req: NextRequest) {
  try {
    const body: GloviWaitlistData = await req.json()

    const { fullName, email, phone, targetLanguage, currentLevel, product } = body

  
    if (!fullName || !email || !phone || !targetLanguage || !currentLevel) {
      return NextResponse.json(
        { 
          error: 'All fields are required',
          received: { fullName, email, phone, targetLanguage, currentLevel }
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

    // Send emails
    try {
      if (resend) {
       
        await resend.emails.send({
          from: 'Glovi <noreply@glovtech.com>', 
          to: email,
          subject: '🎉 Welcome to the Glovi Waitlist!',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #059669;">Welcome to Glovi, ${fullName}! 🌍</h1>
              <p>Thank you for joining our AI Language Tutor waitlist! We're excited to have you on board.</p>
              
              <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h2 style="color: #047857; margin-top: 0;">Your Learning Details:</h2>
                <p><strong>Name:</strong> ${fullName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Target Language:</strong> ${targetLanguage}</p>
                <p><strong>Current Level:</strong> ${currentLevel}</p>
              </div>

              <div style="background: #ecfdf5; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h3 style="color: #047857; margin-top: 0;">What's Next?</h3>
                <ul style="color: #065f46; line-height: 1.8;">
                  <li>📱 We'll send you early access when we launch</li>
                  <li>🎯 Get personalized learning paths based on your level</li>
                  <li>💬 Practice with AI tutors in real conversations</li>
                  <li>🏆 Track your progress with interactive lessons</li>
                </ul>
              </div>

              <p>We'll keep you updated on our launch and give you priority access when we're ready!</p>
              
              <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                Best regards,<br/>
                The Glovi Team 🤖
              </p>
            </div>
          `,
        })

       
        await resend.emails.send({
          from: 'Glovi Waitlist <noreply@resend.dev>',
          to: 'iantitusglover2@gmail.com',
          subject: '🚀 New Glovi Waitlist Signup',
          html: `
            <div style="font-family: Arial, sans-serif;">
              <h2 style="color: #059669;">New Glovi Waitlist Registration 🎉</h2>
              
              <div style="background: #f9fafb; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h3 style="margin-top: 0;">User Details:</h3>
                <p><strong>Name:</strong> ${fullName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Target Language:</strong> ${targetLanguage}</p>
                <p><strong>Current Level:</strong> ${currentLevel}</p>
                <p><strong>Product:</strong> ${product}</p>
                <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
              </div>

              <p style="color: #6b7280; font-size: 14px;">
                Total waitlist signups are growing! 🚀
              </p>
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
    
    await db.gloviWaitlist.create({
      data: {
        fullName,
        email,
        phone,
        targetLanguage,
        currentLevel,
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
          fullName,
          email,
          phone,
          targetLanguage,
          currentLevel,
          product,
          timestamp: new Date().toISOString(),
        }),
      })
    }
    */

    return NextResponse.json(
      { 
        success: true,
        message: 'Successfully joined the Glovi waitlist!',
        data: { fullName, email, targetLanguage, currentLevel }
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