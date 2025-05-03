import { FC, useEffect, useState } from 'react';
import { Image, Title } from "@mantine/core";
import { useAppStore } from '../../store/app.store';
import bgImage from '../../styles/images/spacex-6SbFGnQTE8s-unsplash.jpg';
import bgImage2 from '../../styles/images/jake-weirick-Q_RBVFFXR_g-unsplash.jpg';
import { isOk } from "../../utils/reusablefunctions.js";
import { commonAllAuthApi, commonGetAuthApi } from '../../server/Api';
import { toast } from 'react-toastify';
import { LeatestLaunch } from '../../components';
import "./landing.scss";
const Landing: FC = () => {
	const { isLogin, isLoginHandler } = useAppStore();
	const [loading, setLoading] = useState<boolean>(true);
	const [rocketList, setRocketList] = useState<any>([]);

	const getALlRockets = async () => {
		setLoading(true);
		try {
			const res: any = await commonGetAuthApi("/v4/rockets");
			if (isOk(res.status)) {
				setRocketList(res?.data);
			} else {
				toast.error(res?.response?.data?.message || "Something went wrong!");
			}
		} finally {
			setLoading(false);
		}
	};
	const handleAddCategory = async () => {
		// if(!CategoryName){toast.warn("Enter category Name..");return ''}
		const formdata1 = new FormData();
		// formdata1.append("name", CategoryName);
		try {
			const res: any = await commonAllAuthApi("/v1/admin/Category/addCategory", formdata1, 'post');
			if (isOk(res.status)) {
				scrollTo(0, 0)
				toast.success("Category added successfully.");
			} else {
				toast.error(res?.response?.data?.message || "Something went wrong!");
			}
		} catch (error) {
			toast.error("An error occurred while adding the category.");
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
				{/* rocket card layout start */}
				<div className="grid-container">
					{
						rocketList?.map((item: any, index: number) => {
							return (
								<div className="rocket-card" key={index}>
									<div className="image-dev">
										<img src={item?.flickr_images[0]} alt="Rocket" />
									</div>
									<div className="content-frame">
										<h4>{item?.name || "name"}</h4>
										<h5>Success Rate PCT is {item?.success_rate_pct || 0}%</h5>
										<p className='desc'>{item?.description || "loar..."}</p>
										<div className="date-company-frame">
											<p className='date'>{item?.first_flight || "3th May"}</p>
											<p>{item?.company || 'space X'}</p>
										</div>
										<button className="btn-primary">Learn More </button>
									</div>
								</div>
							)
						})
					}
				

				</div>
				{/* rocket card layout End */}
				<LeatestLaunch rocketList={rocketList} />
			
			</div>
		</section>

		{/* --------------------------------------------------- section divider ------------------------ */}
		
	</>
};

export default Landing;

