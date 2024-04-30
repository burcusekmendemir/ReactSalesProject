import { useState } from 'react';
import userController from '../../config/UserController';
import './Register.css'

function Register(){
    const[adsoyad, setAdsoyad] =useState('');
    const[username, setUsername] =useState('');
    const[password, setPassword] =useState('');

    const register = () => {
        /**
         * 1- Gerekli olan girişlerin alınması.[adsoyad, username,password]
         * 2- Almış olduğum bilgileri sunucuya iletmeliyim. [fetch -> post]
         * 3- Login page return.
         */

        fetch(userController.register,{ /*javadaki post methoduna gidiş yoludur*/
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  /*gödnereceğim veri tipi applicaiton json olacak demek*/
            },
            body:JSON.stringify({  /*javada requestbody içinde gönderdiğimiz verileri yazıyoruz*/
                'adsoyad': adsoyad,
                'username': username,
                'password': password
            })
        }).then(data => data.json())
        .then(data => {
            console.log(data);
        })
    }

    return(
        <div className="wrapper fadeInDown">
            <div id="formContent">                
                <div className="fadeIn first mt-2 p-4">
                    <img src="/lock.png" id="icon" alt="User Icon" />
                    <h1 className='mt-5'>Yeni Kayıt</h1>
                </div>
 
                <form>
                    <input onChange={(evt) => {
                        setAdsoyad(evt.target.value);
                    }} type="text" id="name" className="fadeIn second" name="login" placeholder="name surname" />

                    <input onChange={(evt) => {
                        setUsername(evt.target.value); }} type="text" id="login" className="fadeIn second" name="login" placeholder="username" />
                    
                    <input onChange={(evt) => {
                        setPassword(evt.target.value); }}  type="text" id="password" className="fadeIn third" name="login" placeholder="password" />
                    <input type="button" className="fadeIn fourth" value="Register"  onClick={register}/>
                </form>
               
                <div id="formFooter">
                    <a className="underlineHover" href="/login">Go to the Login</a>
                </div>
 
            </div>
        </div>
    );

}

export default Register;