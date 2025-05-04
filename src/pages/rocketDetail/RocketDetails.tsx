import React, { FC, useEffect } from "react";
import "./RocketDetails.scss";
import { useAppStore } from "../../store/app.store";
import { CommonCard, Loader } from "../../components";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link, NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { isOk } from "../../utils/reusablefunctions";
import { commonGetAuthApi } from "../../server/Api";
const data = {
    height: {
        meters: 22.25,
        feet: 73,
    },
    diameter: {
        meters: 1.68,
        feet: 5.5,
    },
    mass: {
        kg: 30146,
        lb: 66460,
    },
    first_stage: {
        thrust_sea_level: {
            kN: 420,
            lbf: 94000,
        },
        thrust_vacuum: {
            kN: 480,
            lbf: 110000,
        },
        reusable: false,
        engines: 1,
        fuel_amount_tons: 44.3,
        burn_time_sec: 169,
    },
    second_stage: {
        thrust: {
            kN: 31,
            lbf: 7000,
        },
        payloads: {
            composite_fairing: {
                height: {
                    meters: 3.5,
                    feet: 11.5,
                },
                diameter: {
                    meters: 1.5,
                    feet: 4.9,
                },
            },
            option_1: "composite fairing",
        },
        reusable: false,
        engines: 1,
        fuel_amount_tons: 3.38,
        burn_time_sec: 378,
    },
    engines: {
        isp: {
            sea_level: 267,
            vacuum: 304,
        },
        thrust_sea_level: {
            kN: 420,
            lbf: 94000,
        },
        thrust_vacuum: {
            kN: 480,
            lbf: 110000,
        },
        number: 1,
        type: "merlin",
        version: "1C",
        layout: "single",
        engine_loss_max: 0,
        propellant_1: "liquid oxygen",
        propellant_2: "RP-1 kerosene",
        thrust_to_weight: 96,
    },
    landing_legs: {
        number: 0,
        material: null,
    },
    payload_weights: [
        {
            id: "leo",
            name: "Low Earth Orbit",
            kg: 450,
            lb: 992,
        },
    ],
    flickr_images: [
        "https://imgur.com/DaCfMsj.jpg",
        "https://imgur.com/azYafd8.jpg",
    ],
    name: "Falcon 1",
    type: "rocket",
    active: false,
    stages: 2,
    boosters: 0,
    cost_per_launch: 6700000,
    success_rate_pct: 40,
    first_flight: "2006-03-24",
    country: "Republic of the Marshall Islands",
    company: "SpaceX",
    wikipedia: "https://en.wikipedia.org/wiki/Falcon_1",
    description:
        "The Falcon 1 was an expendable launch system privately developed and manufactured by SpaceX during 2006-2009. On 28 September 2008, Falcon 1 became the first privately-developed liquid-fuel launch vehicle to go into orbit around the Earth.",
    id: "5e9d0d95eda69955f709d1eb",
};
const RocketDetails: FC = () => {
    const { rocketAllList } = useAppStore();
    const param = useParams();
    // console.log("rocketAllList", rocketAllList);
    const [data, setData] = React.useState<any>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const getALlRockets = async () => {
        setLoading(true);
        try {
            const res: any = await commonGetAuthApi(`/v4/rockets/${param?.id}`);
            if (isOk(res.status)) {
                setData(res?.data);
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


    if (loading) return <div><Loader/></div>;
    return (
        <div className="rocket-details ">
            <div className="container">
                <div className="header-details">
                    <Link to="/" ><IoArrowBackCircle className="text-white" /></Link>
                    <p>{`Home > Details > ${data?.name}`}</p>
                </div>
                <div className="hero">
                    <img
                        src={data.flickr_images[0]}
                        alt={data.name}
                        className="hero-image"
                    />
                    <h1>{data.name}</h1>
                    <p>{data.description}</p>
                    <div className="tags">
                        <span>
                            First Flight:{" "}
                            {new Date(data.first_flight).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}
                        </span>
                        <span>Active: {data.active ? "Yes" : "No"}</span>
                        <span>Success Rate: {data.success_rate_pct}%</span>
                    </div>
                </div>

                <div className="info-grid">
                    <div>
                        <strong className="d-block">Height :</strong> {data.height.meters} m
                        / {data.height.feet} ft
                    </div>
                    <div>
                        <strong className="d-block">Diameter :</strong>{" "}
                        {data.diameter.meters} m / {data.diameter.feet} ft
                    </div>
                    <div>
                        <strong className="d-block">Mass :</strong> {data.mass.kg} kg /{" "}
                        {data.mass.lb} lb
                    </div>
                    <div>
                        <strong className="d-block">Stages :</strong> {data.stages}
                    </div>
                    <div>
                        <strong className="d-block">Boosters :</strong> {data.boosters}
                    </div>
                    <div>
                        <strong className="d-block">Cost/Launch :</strong> $
                        {data.cost_per_launch.toLocaleString()}
                    </div>
                    <div>
                        <strong className="d-block">Country :</strong> {data.country}
                    </div>
                    <div>
                        <strong className="d-block">Company :</strong> {data.company}
                    </div>
                    <div>
                        <strong className="d-block">Wikipedia :</strong>{" "}
                        <a href={data.wikipedia} target="_blank" rel="noreferrer">
                            Link
                        </a>
                    </div>
                </div>

                <div className="engines">
                    <div className="stage-box">
                        <h2>First Stage</h2>
                        <ul>
                            <li>Engines: {data.first_stage.engines}</li>
                            <li>Reusable: {data.first_stage.reusable ? "Yes" : "No"}</li>
                            <li>Fuel Amount: {data.first_stage.fuel_amount_tons} tons</li>
                            <li>Burn Time: {data.first_stage.burn_time_sec} sec</li>
                            <li>Thrust (Sea): {data.first_stage.thrust_sea_level.kN} kN</li>
                            <li>Thrust (Vacuum): {data.first_stage.thrust_vacuum.kN} kN</li>
                        </ul>
                    </div>

                    <div className="stage-box">
                        <h2>Second Stage</h2>
                        <ul>
                            <li>Engines: {data.second_stage.engines}</li>
                            <li>Reusable: {data.second_stage.reusable ? "Yes" : "No"}</li>
                            <li>Fuel Amount: {data.second_stage.fuel_amount_tons} tons</li>
                            <li>Burn Time: {data.second_stage.burn_time_sec} sec</li>
                            <li>Thrust: {data.second_stage.thrust.kN} kN</li>
                            <li>
                                Payload Fairing Height:{" "}
                                {data.second_stage.payloads.composite_fairing.height.meters} m
                            </li>
                        </ul>
                    </div>

                    <div className="stage-box">
                        <h2>Engine Info</h2>
                        <ul>
                            <li>
                                Type: {data.engines.type} ({data.engines.version})
                            </li>
                            <li>Layout: {data.engines.layout}</li>
                            <li>
                                ISP: {data.engines.isp.sea_level} (Sea),{" "}
                                {data.engines.isp.vacuum} (Vacuum)
                            </li>
                            <li>
                                Propellants: {data.engines.propellant_1},{" "}
                                {data.engines.propellant_2}
                            </li>
                            <li>Thrust-to-Weight: {data.engines.thrust_to_weight}</li>
                        </ul>
                    </div>
                </div>

                <div className="payload">
                    <h2>Payload Weights</h2>
                    {data.payload_weights.map((payload:any) => (
                        <div key={payload.id}>
                            <strong>{payload.name}:</strong> {payload.kg} kg / {payload.lb} lb
                        </div>
                    ))}
                </div>

                <div className="gallery">
                    <h2>Gallery</h2>
                    <div className="images">
                        {data.flickr_images.map((img:any, i:number) => (
                            <img key={i} src={img} alt={`Rocket image ${i + 1}`} />
                        ))}
                    </div>
                </div>

                {/* rocket card layout start */}
                {rocketAllList.length > 0 && (

                    <div className="rocket_list-wrapper">
                        <div className="sub-head-title-frame">
                            <h2>🚀 Rockets</h2>
                            <NavLink to="/rockets" className="btn-primary">view All</NavLink>
                        </div>
                        <div className="grid-container">
                            {
                                rocketAllList?.map((item: any, index: number) => {
                                    return (
                                        <CommonCard data={item} index={index} />
                                    )
                                })
                            }
                        </div>
                    </div>

                )}
                {/* rocket card layout End */}
            </div>
        </div>
    );
};

export default RocketDetails;
