import { FC, useEffect, useState } from 'react';
import { Image, Title } from "@mantine/core";
import { useAppStore } from '../../store/app.store';
import bgImage from '../../styles/images/spacex-6SbFGnQTE8s-unsplash.jpg';
import bgImage2 from '../../styles/images/jake-weirick-Q_RBVFFXR_g-unsplash.jpg';
import { isOk } from "../../utils/reusablefunctions.js";
import { commonAllAuthApi, commonGetAuthApi } from '../../server/Api';
import { toast } from 'react-toastify';
import { LaunchMap, LeatestLaunch, CrewTable, CommonCard } from '../../components';
import "./landing.scss";
import { NavLink } from 'react-router-dom';


const Landing: FC = () => {
	const { isLogin, isLoginHandler, updatedRocketList } = useAppStore();
	const [loading, setLoading] = useState<boolean>(true);
	const [rocketList, setRocketList] = useState<any>([]);

	const getALlRockets = async () => {
		setLoading(true);
		try {
			const res: any = await commonGetAuthApi("/v4/rockets");
			if (isOk(res.status)) {
				setRocketList(res?.data);
				updatedRocketList(res?.data);
			} else {
				toast.error(res?.response?.data?.message || "Something went wrong!");
			}
		} catch (error) {
			toast.error("An error occurred while adding the category.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getALlRockets();
	}, []);
	return <>
		{/* <Title order={4}> Hello World {isLogin?"true":"false"} </Title>
		<button onClick={()=>isLoginHandler()}> Zustand state manage</button>
		<img src='https://i.imgur.com/ooaayWf.png' alt='img' /> */}

		<section className='hero-section'>
			<img src={bgImage} alt='img' className='hero-image' />
			<div className="container">
				<h1 className='Orbitron-family text-white'>Space X</h1>
				<div className="here-wrapper">
					<div className="hero-content">
						<h2 className=''>Explore About Space</h2>
						<p>Space exploration encompasses the investigation of the universe beyond Earth, using both robotic and human missions to gather data, study celestial bodies, and potentially colonize other planets. It's a field driven by scientific curiosity, the desire to understand the cosmos, and the potential for advancements in technology and human understanding. </p>
						<button className="btn-primary">Get Started</button>


					</div>
				</div>
			</div>
		</section>
		{/* --------------------------------------------------- section divider ------------------------ */}

		<section className='Top-rocket-section'>
			{/* <img src={bgImage2} alt='img' className='hero-image' /> */}
			<div className="container">
				<h2 className='text-white title'>🚀 Top Rockets List </h2>
				<div className="sub-head-title-frame">
					<h2></h2>
					<NavLink 
					 to={{
						pathname: `/listPage`,
						search: '?key=rockets&company=SpaceX'
					}}
					 className="btn-primary">view All</NavLink>
				</div>
				{/* rocket card layout start */}
				<div className="grid-container">
					{
						rocketList?.map((item: any, index: number) => {
							return (
								<CommonCard data={item} index={index} />
							)
						})
					}


				</div>
				{/* rocket card layout End */}
				<LeatestLaunch rocketList={rocketList} />

			</div>
		</section>

		{/* --------------------------------------------------- section divider ------------------------ */}
		<section className='launch-map-section'>
			<div className="container">
				<h2 className='text-white '>🗺️ Launchpads locations </h2>
				<LaunchMap />
			</div>
		</section>
		{/* --------------------------------------------------- section divider ------------------------ */}



		<section className='crow-table-section'>
			<div className="container">
				<h2 className='crow-title'> 🧑‍🚀Crow list </h2>
				<CrewTable />
			</div>
		</section>
	</>
};

export default Landing;

