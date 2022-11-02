import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../../contexts/user";

interface IErrors {
    email: string;
    password: string;
}

const LoginPage = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<IErrors>({email: '', password: ''});

    const navigate = useNavigate();
    const { setUserId, setToken } = useUser();

    const handleSubmit = async () => {
        const response = await fetch(`http://localhost:4000/api/auth/login`, {
            method: 'POST',
            headers : {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })

        const data = await response.json();
        
        console.log(data);
        setUserId(data.user_id);
        setToken(data.token);
        setErrors(data.errors);

        if(data.status === 200) {
            navigate('/dashboard');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <Link to={'/'}>Home</Link>
            <br />
            <br />
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
                <label htmlFor="Email">
                    <p>Email</p>
                    <input type="text" name="email" onChange={(e) => setEmail((prevEmail) => prevEmail = e.target.value)} />
                    <p>{errors.email}</p>
                </label>
                <br />
                <label htmlFor="Password">
                    <p>Password</p>
                    <input type="password" name="password" onChange={(e) => setPassword((prevPassword) => prevPassword = e.target.value)} />
                    <p>{errors.password}</p>
                </label>
                <br />
                <input type="submit" value="Login" />
            </form>
        </div>
    );
};

export default LoginPage;