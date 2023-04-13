import React from 'react'
import { useGetDocentesQuery } from "../../api/apiSlice";
import Loading from '../Loading';

const Docente = () => {

  const { data, isLoading, isError, error } = useGetDocentesQuery();

  if(isLoading){
    return <Loading />
  }

  if(isError){
    <div>{error.message}</div>
  }

  console.log(data)

  return (
    <div>Docente</div>
  )
}

export default Docente