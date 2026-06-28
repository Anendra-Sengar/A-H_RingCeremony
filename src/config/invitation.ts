export interface InvitationConfig {
  couple: {
    groom: {
      name: string;
      fullname: string;
      father: string;
      mother: string;
      photo: string;
    };
    bride: {
      name: string;
      fullname: string;
      father: string;
      mother: string;
      photo: string;
    };
    couplePhoto: string;
  };
  event: {
    title: string;
    date: string; // YYYY-MM-DD format
    time: string;
    venueName: string;
    venueAddress: string;
    googleMapsEmbedUrl: string;
    googleMapsDirectionUrl: string;
    dressCode: string;
    dinnerTiming: string;
    youtubeVideoId: string;
  };
  timeline: Array<{
    time: string;
    title: string;
    description: string;
    mapsUrl?: string;
  }>;
  gallery: Array<{
    url: string;
    caption: string;
  }>;
  contact: {
    phone: string;
    whatsapp: string;
    message: string;
  };
  contacts: Array<{
    name: string;
    phone: string;
  }>;
  musicUrl: string;
}

export const invitationConfig: InvitationConfig = {
  couple: {
    groom: {
      name: "Ashindra",
      fullname: "Ashindra",
      father: "Mr. Umendra Sengar",
      mother: "Mrs. Bavita Sengar",
      photo: "/assets/image/groom parents.png",
    },
    bride: {
      name: "Himanshi",
      fullname: "Himanshi",
      father: "Mr. Udayveer Singh",
      mother: "Mrs. Nirmala Singh",
      photo: "/assets/image/bride parents.png",
    },
    couplePhoto: "/assets/image/couple regard.png",
  },
  event: {
    title: "Ring Ceremony",
    date: "2026-07-03", // July 3, 2026
    time: "02:00 PM onwards",
    venueName: "Pandav Guest House & Resort",
    venueAddress: "Near Govt. Hospital, Ragaul, Maudaha, Uttar Pradesh - 210507",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Pandav%20Guest%20House%20%26%20Resort,%20Ragaul,%20Maudaha&t=&z=15&ie=UTF8&iwloc=&output=embed",
    googleMapsDirectionUrl: "https://maps.app.goo.gl/WY5hQGtZEuMjEP2Z8",
    dressCode: "Royal Ethnic / Indo-Western (Gold, Ivory & Pastel Pink preferred)",
    dinnerTiming: "08:30 PM onwards",
    youtubeVideoId: "dQw4w9WgXcQ", // Replace with your invitation video ID later
  },
  timeline: [
    {
      time: "11:00 AM",
      title: "Departure",
      description: "Departure from Kurara",
      mapsUrl: "https://maps.app.goo.gl/otRRjKjoqY1EPSXL7",
    },
    {
      time: "02:00 PM",
      title: "Arrival",
      description: "Arrival at Pandav Guest House & Resort, Near Govt. Hospital, Ragaul, Maudaha, Uttar Pradesh - 210507",
      mapsUrl: "https://maps.app.goo.gl/WY5hQGtZEuMjEP2Z8",
    },
  ],
  gallery: [
    { url: "/assets/image/welcome.png", caption: "Welcome to Our Journey" },
    { url: "/assets/image/couple regard.png", caption: "Moments of Love" },
    { url: "/assets/image/save date.png", caption: "Save the Blessed Date" },
    { url: "/assets/image/ring ceremony.jpeg", caption: "The Promise of Forever" },
    { url: "/assets/image/venue.jpeg", caption: "The Grand Venue" },
    { url: "/assets/image/bride parents.png", caption: "Elders Love (Bride's Family)" },
    { url: "/assets/image/groom parents.png", caption: "Elders Blessings (Groom's Family)" },
  ],
  contact: {
    phone: "9451691396",
    whatsapp: "7355253390",
    message: "Namaste! I would love to RSVP for the Ring Ceremony of Ashindra & Himanshi. We will attend.",
  },
  contacts: [
    {
      name: "Umendra Sengar (Raju)",
      phone: "9451691396",
    },
    {
      name: "Anendra Sengar (Annu)",
      phone: "7355253390",
    }
  ],
  musicUrl: "/assets/audio/audio.wav",
};
