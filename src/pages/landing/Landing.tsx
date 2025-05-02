import { FC, useState } from 'react';
import {Title} from "@mantine/core";
import { useAppStore } from '../../store/app.store';
import { isOk } from "../../utils/reusablefunctions.js";
import { commonAllAuthApi, commonGetAuthApi } from '../../server/Api';
import { toast } from 'react-toastify';
const Landing: FC = () => {
	const {isLogin,isLoginHandler}= useAppStore();
	const [loading, setLoading] = useState<boolean>(true);


	const getALlCategory = async () => {
        setLoading(true);
        try {
            const res:any = await commonGetAuthApi("/v1/SubCategory/all/Subcategory");
            if (isOk(res.status)) {
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
			  const res:any = await commonAllAuthApi("/v1/admin/Category/addCategory", formdata1,'post');
			  if (isOk(res.status)) {
				  scrollTo(0,0)
				  toast.success("Category added successfully.");
			  } else {
				  toast.error(res?.response?.data?.message || "Something went wrong!");
			  }
		  } catch (error) {
			  toast.error("An error occurred while adding the category.");
		  }
	  };
	return <>
		<Title order={4}> Hello World {isLogin?"true":"false"} </Title>
		<button onClick={()=>isLoginHandler()}> Zustand state manage</button>
		<img src='https://i.imgur.com/ooaayWf.png' alt='img' />
	</>
};

export default Landing

