
import { NavLink } from 'react-router-dom'
interface PropsData {
    data:any,
    index:number
 }

 const CommonCard = ({data,index}:PropsData) => {
  return (
    <div className="rocket-card" key={index}>
        <div className="image-dev">
            <img src={data?.flickr_images[0]} alt="Rocket" />
        </div>
        <div className="content-frame">
            <h4>{data?.name || "name"}</h4>
            <h5>Success Rate PCT is {data?.success_rate_pct || 0}%</h5>
            <p className='desc'>{data?.description || "loar..."}</p>
            <div className="date-company-frame">
                <p className='date'>{data?.first_flight || "3th May"}</p>
                <p>{data?.company || 'space X'}</p>
            </div>
            <NavLink to={`rocket-detail/${data?.id}`} className="btn-primary">Learn More </NavLink>
        </div>
    </div>
    )
}
export default CommonCard;