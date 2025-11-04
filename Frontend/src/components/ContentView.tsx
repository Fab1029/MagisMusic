import icons from "@/constants/icons";
import { CustomTable } from "./CustomTable";
import { columns } from "@/models/Track";

interface ContentViewProps {
  tracks:any;
}

function ContentView({tracks}: ContentViewProps) {
  return (
    <div>
      <div className="p-5 relative">

        <div className="bg-primary mask-b-from-gray-50 absolute inset-0 z-0 rounded-tl-md" />

        <div className="gap-10 flex items-end-safe relative z-1">
          <img
            className="w-64 h-64 rounded-md"
            src="https://cdn-images.dzcdn.net/images/cover/5718f7c81c27e0b2417e2a4c45224f8a/1000x1000-000000-80-0-0.jpg"
          />
          <div className="gap-5 flex flex-col">
            <h1 className="font-bold text-7xl text-white">444 Remix</h1>
            <h3 className="font-bold text-2xl text-accent-foreground">Bad Bunny</h3>
          </div>
        </div>

        <div className="mt-6 flex gap-4 relative z-1 items-center">
          <button 
            className="

              flex items-center justify-center 
              bg-primary rounded-full w-14 h-14 p-1
              transition-all duration-200 ease-out
              hover:scale-114 cursor-pointer
            "
          >
            <img 
              className="w-7 h-7 object-contain" 
              src={icons.playIcon}
              alt="Play"
            />
          </button>
          <button className="w-8 h-8 cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 ml-5">
            <img src={icons.unlikeIcon} className="w-full h-full object-contain" alt="Like item"/>
          </button>
          <button className="w-8 h-8 cursor-pointer transition-all duration-200 ease-in-out hover:scale-110">
            <img src={icons.moreIcon} className="w-full h-full object-contain" alt="Like item"/>
          </button>
        </div>
      </div>

      <CustomTable columns={columns} data={tracks.data?.map((item:any) => ({...item}) )}/>
    </div>
  );
}

export default ContentView;
