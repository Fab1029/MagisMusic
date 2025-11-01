import type { ColumnDef } from "@tanstack/react-table";
import { Timer } from "lucide-react";

interface Song {
  id: string;
  title: string;
  album?: string;
  artist: string;
  duration: string;
}

export const columns: ColumnDef<Song>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "artist",
    header: "Artista",
  },
  {
    accessorKey: "album",
    header: "Álbum",
  },
  {
    accessorKey: "duration",
    header: <Timer/>,
  },
];

export const songs: Song[] = [
  { id: "1", title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", duration: "3:20"},
  { id: "2", title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", duration: "3:23"},
  { id: "3", title: "As It Was", artist: "Harry Styles", album: "Harry’s House", duration: "2:47"},
  { id: "4", title: "Save Your Tears", artist: "The Weeknd", album: "After Hours", duration: "3:35"},
  { id: "5", title: "Bad Habit", artist: "Steve Lacy", album: "Gemini Rights", duration: "3:52"},
  { id: "6", title: "Flowers", artist: "Miley Cyrus", album: "Endless Summer Vacation", duration: "3:21"},
  { id: "7", title: "Shivers", artist: "Ed Sheeran", album: "=", duration: "3:27"},
  { id: "8", title: "Stay", artist: "The Kid LAROI & Justin Bieber", album: "F*CK LOVE 3", duration: "2:21"},
  { id: "9", title: "Anti-Hero", artist: "Taylor Swift", album: "Midnights", duration: "3:20"},
  { id: "10", title: "Dance Monkey", artist: "Tones and I", album: "The Kids Are Coming", duration: "3:29"},
  { id: "11", title: "Sunflower", artist: "Post Malone & Swae Lee", album: "Spider-Man: Into the Spider-Verse", duration: "2:38"},
  { id: "12", title: "Peaches", artist: "Justin Bieber", album: "Justice", duration: "3:18"},
  { id: "13", title: "Watermelon Sugar", artist: "Harry Styles", album: "Fine Line", duration: "2:54"},
  { id: "14", title: "Don’t Start Now", artist: "Dua Lipa", album: "Future Nostalgia", duration: "3:03"},
  { id: "15", title: "Ghost", artist: "Justin Bieber", album: "Justice", duration: "2:33"},
  { id: "16", title: "Someone You Loved", artist: "Lewis Capaldi", album: "Divinely Uninspired to a Hellish Extent", duration: "3:02"},
  { id: "17", title: "Heat Waves", artist: "Glass Animals", album: "Dreamland", duration: "3:59"},
  { id: "18", title: "Easy On Me", artist: "Adele", album: "30", duration: "3:44"},
  { id: "19", title: "Circles", artist: "Post Malone", album: "Hollywood’s Bleeding", duration: "3:35"},
  { id: "20", title: "Industry Baby", artist: "Lil Nas X & Jack Harlow", album: "Montero", duration: "3:32"},
];