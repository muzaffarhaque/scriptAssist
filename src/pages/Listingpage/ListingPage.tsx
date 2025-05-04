import React, { FC, useEffect, useState } from 'react'
import "./listingpage.scss"
import { CommonCard } from '../../components';
import { commonGetAuthApi } from '../../server/Api';
import { isOk } from '../../utils/reusablefunctions';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { IoArrowBackCircle } from 'react-icons/io5';

const ListingPage: FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [rocketList, setRocketList] = useState<any>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredList, setFilteredList] = useState<any>([]);
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
   


    // Fetch all rockets
    const getALlRockets = async () => {
        setLoading(true);
        try {
            const res: any = await commonGetAuthApi(`/v4/${searchParams.get("key")}`);
            if (isOk(res.status)) {
                setRocketList(res?.data);
                setFilteredList(res?.data);
            } else {
                toast.error(res?.response?.data?.message || "Something went wrong!");
            }
        } catch (error) {
            toast.error("An error occurred while fetching rockets.");
        } finally {
            setLoading(false);
        }
    };

   
    useEffect(() => {
        getALlRockets();
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (!value) {
            setFilteredList(rocketList);
        } else {
            const filtered = rocketList?.filter((item: any) =>
                item?.name?.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredList(filtered);
        }
        navigate(`?key=${searchParams.get('key')}&company=SpaceX${value && `&search=${value}`}`);
    };

    return (
        <div>
            <div className="search-header-hero">
                <div className="container">
                      <div className="header-details">
                                        <Link to="/" ><IoArrowBackCircle className="" /></Link>
                                        <p>{`Home > All > ${searchParams.get("key")}`}</p>
                                    </div>
                    <div className="search-filed-frame">
                        <input
                            className='input-box'
                            type="text"
                            placeholder='Search rocket name...'
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="filter-key-wrapper">
                        <p className='filter-name'>Filter</p>
                    </div>
                </div>

                <div className="all-list-card-frame">
                    <div className="container">
                        <div className="grid-container">
                            {
                                filteredList.length > 0 ? filteredList.map((item: any, index: number) => (
                                    <CommonCard key={item.id} data={item} index={index} />
                                )) : (
                                    <p>No rockets found.</p>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingPage;
