'use client';
import MyComponent from '@/components/my-component';
import { count } from 'console';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export interface UseMemoProps{
  data: any,
  setData: any,
}
export default function ComponentUseMemo<UseMemoProps>({ data, setData }) {
  //const hookTitle = 'WELCOME HOOKS PAGE';

  const hardCalculate = useMemo(()=>{
    console.log('counter changed');
    let total = 0;
     data.map((res: any) => total = total + res.value)
    return total;
  }, [data])

  // const handleData = useCallback(() => {
  //   console.log('executing this')
  // },[setData])
  //USE EFFECT

  // useEffect(() => {
  //   const total
  //   data.map((res: any) => total = total + res.value)
  //   setTotal(total)
  // }, [setData]);

  return (
    <>
     <div>
        <h2>RESULT: </h2> 
        <p>{hardCalculate}</p>
     </div>
    </>
  );
}