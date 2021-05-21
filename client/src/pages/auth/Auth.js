import React, {useContext, useEffect, useState} from 'react';
import { useStyles } from './Auth.styles'
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import {AuthContext} from "../../context/AuthContext";

export const Auth = () => {
    const auth = useContext(AuthContext)

    const styles = useStyles()

    const message = useMessage()
    const { loading, error, request, clearError } = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request(
                '/api/auth/register',
                'POST',
                {...form})
            message(data.message)
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request(
                '/api/auth/login',
                'POST',
                {...form})
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Make link smaller</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизація</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Введіть email"
                                    id="email"
                                    type="email"
                                    name="email"
                                    className={styles.input}
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                    <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Введіть пароль"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className={styles.input}
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                    <label htmlFor="email">Пароль</label>
                            </div>


                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            style={{marginRight: 10}}
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Увійти
                        </button>
                        <button
                            className="btn grey lighten-1 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Зареєструватись
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
