import React, { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigate } from 'react-router-dom'

export default function Principal(){
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const uid = localStorage.getItem('authUid')
    if(!uid){
      navigate('/login')
      return
    }
    const fetchUser = async () => {
      try{
        const snap = await getDoc(doc(db, 'users', uid))
        if(snap.exists()){
          setUserData(snap.data())
        } else {
          setUserData(null)
        }
      }catch(err){
        console.error(err)
      }finally{
        setLoading(false)
      }
    }
    fetchUser()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('authUid')
    navigate('/login')
  }

  if(loading) return <div>Carregando...</div>

  if(!userData) return <div>Usuário não encontrado. <button onClick={handleLogout}>Voltar ao login</button></div>

  return (
    <div className="page principal">
      <h2>Página Principal</h2>
      <p>Nome: {userData.firstName}</p>
      <p>Sobrenome: {userData.lastName}</p>
      <p>Data de nascimento: {userData.birthdate}</p>
      <button onClick={handleLogout}>Sair</button>
    </div>
  )
}
