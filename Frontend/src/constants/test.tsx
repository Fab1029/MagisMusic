import type { ColumnDef } from "@tanstack/react-table";
import { Timer } from "lucide-react";

interface Song {
  id: string;
  title: string;
  album?: string;
  artist: string;
  duration: string;
  image:string;
}

export const columns: ColumnDef<Song>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "image",
    header: "",
    cell: ({ row }) => (
      <img
        src={row.original.image}
        alt={row.original.title}
        className="w-10 h-10 rounded-md object-contain"
      />
    )
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
    header: () => <Timer/>,
  },
];


export const columnsMin: ColumnDef<Song>[] = [
  {
    accessorKey: "image",
    header: "",
    cell: ({ row }) => (
      <img
        src={row.original.image}
        alt={row.original.title}
        className="w-10 h-10 rounded-md object-contain"
      />
    )
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
    accessorKey: "duration",
    header: "",
  },
];

export const songs: Song[] = [
  { id: "1", title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", duration: "3:20", image: "https://i.scdn.co/image/ab67616d00001e0208256748d3e6c3ed016cab16"},
  { id: "2", title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", duration: "3:23", image: "https://i.scdn.co/image/ab67616d00001e0208256748d3e6c3ed016cab16"},
  { id: "3", title: "As It Was", artist: "Harry Styles", album: "Harry’s House", duration: "2:47", image: "https://i.scdn.co/image/ab67616d00001e0208256748d3e6c3ed016cab16"},
  { id: "4", title: "Save Your Tears", artist: "The Weeknd", album: "After Hours", duration: "3:35", image: "https://i.scdn.co/image/ab67616d00001e0208256748d3e6c3ed016cab16"},
  { id: "5", title: "Bad Habit", artist: "Steve Lacy", album: "Gemini Rights", duration: "3:52", image: "https://i.scdn.co/image/ab67616d00001e0208256748d3e6c3ed016cab16"},
  { id: "6", title: "Flowers", artist: "Miley Cyrus", album: "Endless Summer Vacation", duration: "3:21", image: "https://i.scdn.co/image/ab67616d00001e0208256748d3e6c3ed016cab16"},
  { id: "7", title: "Shivers", artist: "Ed Sheeran", album: "=", duration: "3:27", image: "https://i.scdn.co/image/ab67616d00001e0208256748d3e6c3ed016cab16"},
  { id: "8", title: "Stay", artist: "The Kid LAROI & Justin Bieber", album: "F*CK LOVE 3", duration: "2:21", image: "https://i.scdn.co/image/ab67616d00001e0208256748d3e6c3ed016cab16"},
  { id: "9", title: "Anti-Hero", artist: "Taylor Swift", album: "Midnights", duration: "3:20", image: "https://i.scdn.co/image/ab67616d00001e0208256748d3e6c3ed016cab16"},
  { id: "10", title: "Dance Monkey", artist: "Tones and I", album: "The Kids Are Coming", duration: "3:29", image: "https://i.scdn.co/image/ab67616d00001e0208256748d3e6c3ed016cab16"},
  { id: "11", title: "Sunflower", artist: "Post Malone & Swae Lee", album: "Spider-Man: Into the Spider-Verse", duration: "2:38", image: "https://i.scdn.co/image/ab67616d00001e0208256748d3e6c3ed016cab16"},
  { id: "12", title: "Peaches", artist: "Justin Bieber", album: "Justice", duration: "3:18", image: "https://i.scdn.co/image/ab67616d00001e0208256748d3e6c3ed016cab16"},
  { id: "13", title: "Watermelon Sugar", artist: "Harry Styles", album: "Fine Line", duration: "2:54", image: "https://i.scdn.co/image/ab67616d00001e0208256748d3e6c3ed016cab16"},
  { id: "14", title: "Don’t Start Now", artist: "Dua Lipa", album: "Future Nostalgia", duration: "3:03", image: "https://i.scdn.co/image/ab67616d00001e0208256748d3e6c3ed016cab16"},
  { id: "15", title: "Ghost", artist: "Justin Bieber", album: "Justice", duration: "2:33", image: "https://i.scdn.co/image/ab67616d00001e0208256748d3e6c3ed016cab16"},
  { id: "16", title: "Someone You Loved", artist: "Lewis Capaldi", album: "Divinely Uninspired to a Hellish Extent", duration: "3:02", image: "https://i.scdn.co/image/ab67616d00001e0208256748d3e6c3ed016cab16"},
  { id: "17", title: "Heat Waves", artist: "Glass Animals", album: "Dreamland", duration: "3:59", image: "https://i.scdn.co/image/ab67616d00001e0208256748d3e6c3ed016cab16"},
  { id: "18", title: "Easy On Me", artist: "Adele", album: "30", duration: "3:44", image: "https://i.scdn.co/image/ab67616d00001e0208256748d3e6c3ed016cab16"},
  { id: "19", title: "Circles", artist: "Post Malone", album: "Hollywood’s Bleeding", duration: "3:35", image: "https://i.scdn.co/image/ab67616d00001e0208256748d3e6c3ed016cab16"},
  { id: "20", title: "Industry Baby", artist: "Lil Nas X & Jack Harlow", album: "Montero", duration: "3:32", image: "https://i.scdn.co/image/ab67616d00001e0208256748d3e6c3ed016cab16"},
];