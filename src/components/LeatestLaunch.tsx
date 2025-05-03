import React, { FC, useEffect } from 'react'
import { commonGetAuthApi } from '../server/Api';
import { isOk } from '../utils/reusablefunctions';
import { toast } from 'react-toastify';
import moment from 'moment';
type Props = {
    rocketList: any[];  
}
 const LeatestLaunch:FC<Props> = ({rocketList}) => {
    const [rocketDetails, setRocketDetails] = React.useState<any>([]);
    const getALlRockets = async () => {
            try {
                const res: any = await commonGetAuthApi("v4/launches/latest");
                if (isOk(res.status)) {
                    setRocketDetails(res?.data);
                } else {
                    toast.error(res?.response?.data?.message || "Something went wrong!");
                }
            } finally {
                // setLoading(false);
            }
        };
    useEffect(() => {
        getALlRockets();
    },[])

    function findRocketNameById(id?: string,name: string="") {
        return rocketList.find((rocket) => rocket.id === id)?.[name] || "not found";   
    }
  return (
    <>
        	<div className="latest-launches-wrapper">
					<div className="latest-launches">
						<div className="detail-launch">
				            	<h2 className='sub-title'>🛰️ Latest Launches</h2>
                                

								<p>📃 Name :- <span>{rocketDetails?.name || "Name" }</span> </p>
								<p>📃 Success :- <span>{rocketDetails?.success ? "Yes" : 'No'  }</span> </p>
								<p>📃 Flight Number :- <span>{rocketDetails?.flight_number || "98" }</span> </p>
								<p>📃 Rocket Name :- <span>{findRocketNameById(rocketDetails?.rocket, 'name') }</span> </p>
								<p>📃 Article :- <span><a href={rocketDetails?.links?.wikipedia || "https://en.wikipedia.org/wiki/SpaceX_Crew-5" }>Link (click here)</a></span> </p>
								<p>📃 Local Date :- <span>{moment(rocketDetails?.date_local).format("D MMMM YYYY")  || "3rd May" }</span> </p>
						</div>
						<div className="show-video-details">
						<iframe width="460" height="265"
							src="https://www.youtube.com/embed/5EwW8ZkArL4"
							title="YouTube video player"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowfullscreen>
						</iframe>
                        <p>{findRocketNameById(rocketDetails?.rocket, 'description') }</p>
						</div>
						
					</div>
				</div>
    </>
  )
}

export default LeatestLaunch;