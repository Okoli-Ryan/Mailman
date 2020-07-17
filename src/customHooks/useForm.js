import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../actions/loginAction";

export const useForm = () => {
  const [userDetails, setUserDetails] = useState({ public: false, roomName: '', friend: '' });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    e.persist();
    setUserDetails({ ...userDetails, [name]: value.toLowerCase() });
  };

  const handleChangeWithCase = (e) => {
    const { target } = e;
    const { name, value } = target;
    e.persist();
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleCheckbox = (e) => {
    const { target } = e;
    const { name, checked } = target;
    e.persist();
    setUserDetails({ ...userDetails, [name]: checked });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(userDetails);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userDetails);
    dispatch(login());
    // history.push('/chatpage')
  };

  return {
    handleChange,
    handleChangeWithCase,
    handleSubmit,
    handleFormSubmit,
    handleCheckbox,
    userDetails,
    setUserDetails,
  };
};
