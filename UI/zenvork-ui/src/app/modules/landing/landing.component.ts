import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface BusinessType {
  abbreviation: string;
  name: string;
  description: string;
  tags: string[];
  available: boolean;
}

@Component({
  selector: 'app-landing',
  imports: [RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  protected readonly businessTypes: BusinessType[] = [
    {
      abbreviation: 'SA',
      name: 'Salon & Spa',
      description: 'Stylist scheduling, reminders, and client history built in.',
      tags: ['Booking', 'Reminders'],
      available: true,
    },
    {
      abbreviation: 'CL',
      name: 'Clinic',
      description: 'Doctor scheduling, patient records, and visit reminders.',
      tags: ['Booking', 'Reminders'],
      available: true,
    },
    {
      abbreviation: 'HT',
      name: 'Hotel',
      description: 'Room booking with date-range stays and check-in tracking.',
      tags: ['Booking'],
      available: false,
    },
    {
      abbreviation: 'RS',
      name: 'Restaurant',
      description: 'Table booking with party size and turn-time handling.',
      tags: ['Booking'],
      available: false,
    },
  ];

  protected readonly valueProps = [
    [
      'Fewer no-shows',
      'Automated reminders before every appointment mean fewer empty slots and less lost revenue.',
    ],
    [
      'No double-booking',
      'Real-time slot locking means two staff members can never accidentally book the same time.',
    ],
    [
      'Know your business',
      'See no-show rates, busy hours, and staff performance at a glance, not by guesswork.',
    ],
    [
      'Clients who come back',
      'Timely reminders and AI-drafted rebooking nudges keep clients cycling back to you.',
    ],
  ];

  protected readonly features = [
    ['Booking', 'Real-time slots'],
    ['Reminders', 'Auto SMS/WhatsApp'],
    ['Chat', 'Client messaging'],
    ['Analytics', 'Business insights'],
    ['AI assistant', 'Smart drafts'],
  ];
  protected readonly stack = [
    'Angular',
    'Node.js',
    'Express',
    'MongoDB',
    'Redis',
    'BullMQ',
    'WebSockets',
  ];
}
