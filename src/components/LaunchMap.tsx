import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { isOk } from '../utils/reusablefunctions';
import { toast } from 'react-toastify';
import { commonGetAuthApi } from '../server/Api';
import { Box, Modal, Button, Typography, ThemeProvider, createTheme } from '@mui/material';


type Launchpad = {
  id: string;
  name: string;
  locality: string;
  region: string;
  latitude: number;
  longitude: number;
  details: string;
};

const LaunchMap = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [launchpads, setLaunchpads] = useState<Launchpad[]>([]);
  const getLaunchpads = async () => {
    try {
      const res: any = await commonGetAuthApi("v4/launchpads");
      if (isOk(res.status)) {
        setLaunchpads(res?.data);
      } else {
        toast.error(res?.response?.data?.message || "Something went wrong!");
      }
    } finally {

    }
  };
  useEffect(() => {
    getLaunchpads();
  }, []);
  function randomPads(data: Launchpad[]) {
    const randomPads = data?.sort(() => Math.random() - 0.5).slice(0, 4);
    return randomPads;
  }
  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
  };
  const localTheme = createTheme({
    palette: { mode: 'light' }
  });
  return (
    <>
      {/* Launchpads card layout start */}
      <div className="grid-container">
        {
          randomPads(launchpads)?.map((item: any, index: number) => {
            if (index > 4) return null;
            return (
              <div className="rocket-card" key={index}>
                <div className="image-dev">
                  <img src={item?.images?.large} alt="launchPad" />
                </div>
                <div className="content-frame">
                  <h4>{item?.name || "name"}</h4>
                  <h5>Success Attempts {item?.landing_attempts || 0}%</h5>
                  <h5>Success landing {item?.landing_successes || 0}%</h5>
                  <p className='desc'>{item?.details || "loar..."}</p>
                  <div className="date-company-frame">
                    <p className='date'>{item?.region || "us"}</p>
                    <p>{item?.status || ' -'}</p>
                  </div>
                  <button className="btn-primary" onClick={handleOpen}>Learn More </button>
                </div>
              </div>
            )
          })
        }


      </div>
      {/* Launchpads card layout End */}
      <div className="map-main-wrapper">
        <MapContainer center={[20, 0]} zoom={2} style={{ height: "450px", width: "100%" }}>
          <TileLayer
            attribution='sothelast'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {launchpads.map(pad => (
            <Marker key={pad.id} position={[pad.latitude, pad.longitude]}>
              <Popup>
                <strong>{pad.name}</strong><br />
                {pad.locality}, {pad.region}<br />
                {pad.details}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
         <ThemeProvider theme={localTheme}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Unable to open we found some api issues in this details page.
          </Typography>
        </Box>
      </Modal>
      </ThemeProvider>
    </>
  );
};

export default LaunchMap;
