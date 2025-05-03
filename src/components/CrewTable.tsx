import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material';
import { commonGetAuthApi } from '../server/Api';
import { isOk } from '../utils/reusablefunctions';
import { toast } from 'react-toastify';

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: false,
  },
  {
    field: 'agency',
    headerName: 'Agency',
    width: 150,
    editable: false,
  },
  {
    field: 'status',
    headerName: 'status',
    type: 'string',
    width: 110,
    editable: false,
  },

  {
    field: 'image',
    headerName: 'Picture',
    width: 160,
    sortable: false,
    renderCell: (params) => (
      <img
        src={params.row.image}
        className="table_image"
        alt="img"
        style={{ width: '100px', height: '80px', objectFit: 'contain',borderRadius:'20px' }}
      />
    ),
  },
  {
    field: 'wikipedia',
    headerName: 'Wikipedia',
    type: 'string',
    width: 210,
    editable: false,
  },
  
];

const rowsDumi = [
  { id: 1, name: 'Snow', agency: 'Jon', age: 14 },
  { id: 2, name: 'Lannister', agency: 'Cersei', age: 31 },
  { id: 3, name: 'Lannister', agency: 'Jaime', age: 31 },
  { id: 4, name: 'Stark', agency: 'Arya', age: 11 },
  { id: 5, name: 'Targaryen', agency: 'Daenerys', age: null },
  { id: 6, name: 'Melisandre', agency: null, age: 150 },
  { id: 7, name: 'Clifford', agency: 'Ferrara', age: 44 },
  { id: 8, name: 'Frances', agency: 'Rossini', age: 36 },
  { id: 9, name: 'Roxie', agency: 'Harvey', age: 65 },
];
const localTheme = createTheme({
  palette: { mode: 'dark' }
});
 function CrewTable() {
    const [crewData, setCrewData] = React.useState<any>([]);
    const getALlCrewDat = async () => {
            try {
                const res: any = await commonGetAuthApi("v4/crew");
                if (isOk(res.status)) {
                  
                  const rows = res?.data?.map((item: any, index: number) => {
                    return (
                      {
                        id: index + 1,
                        name: item?.name || "Name",
                        agency: item?.agency || "Agency",
                        image: item?.image || "https://i.imgur.com/ooaayWf.png",
                        status: item?.status || "Status",
                        wikipedia: item?.wikipedia || "https://en.wikipedia.org/wiki/SpaceX_Crew-5"
                      }
                    )
                  });
                
                    setCrewData(rows);
                } else {
                    toast.error(res?.response?.data?.message || "Something went wrong!");
                }
            } finally {
                // setLoading(false);
            }
        };
    React.useEffect(() => {
        getALlCrewDat();
    },[])
    
  return (
    <Box sx={{ height:'auto', width: '100%' }}>
      <ThemeProvider theme={localTheme}>
      <DataGrid
        rows={crewData || rowsDumi}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
        pageSizeOptions={[15]}
        // checkboxSelection
        // disableRowSelectionOnClick
      />
      </ThemeProvider>
    </Box>
  );
}

export default CrewTable;