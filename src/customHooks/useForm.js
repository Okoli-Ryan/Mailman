import {useState} from 'react';
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {login} from '../actions/loginAction'

export const useForm = () => {

    const [userDetails, setUserDetails] = useState({}); 
    const history = useHistory()
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { target } = e;
        const {name, value } = target;
        e.persist();
        setUserDetails({...userDetails, [name]: value})
    }

    const handleSubmit = () => {
        console.log(userDetails);
        dispatch(login())
        // history.push('/chatpage')
    }

    return (
        {handleChange, handleSubmit, userDetails}
    )
}