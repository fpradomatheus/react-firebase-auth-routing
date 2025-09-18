import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    try{
      const cred = await signInWithEmailAndPassword(auth, email, password)
      const uid = cred.user.uid
      localStorage.setItem('authUid', uid)
      navigate('/principal')
    }catch(err){
      console.error(err)
      setError('Usuário não cadastrado ou senha incorreta')
    }
  }

  return (
    <div className="page login">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email<input value={email} onChange={e => setEmail(e.target.value)} type="email" required /></label>
        <label>Senha<input value={password} onChange={e => setPassword(e.target.value)} type="password" required /></label>
        <button type="submit">Acessar</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>Não tem conta? <a href="/register">Cadastre-se</a></p>
    </div>
  )
}
