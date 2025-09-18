import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

export default function Register(){
  const [form, setForm] = useState({ email: '', password: '', firstName: '', lastName: '', birthdate: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try{
      const userCred = await createUserWithEmailAndPassword(auth, form.email, form.password)
      const uid = userCred.user.uid
      await setDoc(doc(db, 'users', uid), {
        uid,
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        birthdate: form.birthdate,
        createdAt: new Date().toISOString()
      })
      localStorage.setItem('authUid', uid)
      navigate('/principal')
    }catch(err){
      console.error(err)
      setError(err.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="page register">
      <h2>Cadastro</h2>
      <form onSubmit={handleRegister}>
        <label>Email<input name="email" value={form.email} onChange={onChange} type="email" required /></label>
        <label>Senha<input name="password" value={form.password} onChange={onChange} type="password" required minLength={6} /></label>
        <label>Nome<input name="firstName" value={form.firstName} onChange={onChange} required /></label>
        <label>Sobrenome<input name="lastName" value={form.lastName} onChange={onChange} required /></label>
        <label>Data de nascimento<input name="birthdate" value={form.birthdate} onChange={onChange} type="date" required /></label>
        <button type="submit" disabled={loading}>{loading ? 'Cadastrando...' : 'Cadastrar'}</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  )
}
