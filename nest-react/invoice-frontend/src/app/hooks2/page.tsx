'use client';
import ComponentUseMemo from '@/components/component-use-memo';
import MyComponent from '@/components/my-component';
import { initialState, reducer } from '@/state-management/reducer';
import { count } from 'console';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { useEffect, useMemo, useReducer, useRef, useState } from 'react';


export default function Hooks2Page() {
  //const hookTitle = 'WELCOME HOOKS PAGE';
    const[data, setData] = useState([{id: 1, value: 1}, {id: 2, value: 2}, {id: 3, value: 3}])

    const [state, dispatch] = useReducer(reducer, initialState);
  //USE EFFECT

  useEffect(() => {
    console.log('updating state');
  }, [state]);

  return (
    <>
    <div>
        <ComponentUseMemo data={data} setData={setData}/>
        Counter: {state.counter}
        <br />
        <Button
          label="Increment"
          icon="pi pi-check"
          onClick={() => dispatch({type: 'increment'})}
        />
        <Button
          label="Decrement"
          icon="pi pi-check"
          onClick={() => dispatch({type: 'decrement'})}
        />
    </div>
    </>
  );
}
