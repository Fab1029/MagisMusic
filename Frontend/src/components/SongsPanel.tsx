import { CustomTable } from "./CustomTable";

interface SongsPanelProps {
    data: any;
    columns: any;
}

function SongsPanel({columns, data}: SongsPanelProps) {
  return (
    <div className="container mx-auto py-10">
      <CustomTable columns={columns} data={data} />
    </div>
  );
}

export default SongsPanel;
