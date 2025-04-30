'use client';
import MyComponent from '@/components/my-component';
import { count } from 'console';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { useEffect, useRef, useState } from 'react';

export default function HooksPage() {
  //const hookTitle = 'WELCOME HOOKS PAGE';
  const [hookTitle, setHookTitle] = useState('WELCOME HOOKS PAGE USING USE STATE');
  const [counter, setCounter] = useState(0);
  const [invoice, setInvoice] = useState({ cus_id: 0, order_id: 0, date: new Date() });
  const [hookCOndition, setConditionHook] = useState(false);
  const [loading, setLoading] = useState(false);
  //const hookCOndition = false;
  const router = useRouter();
  //useRef
  const inputRef = useRef<HTMLInputElement>(null);

  const onButtonClick = () => {
    console.log('focusing input');
    inputRef?.current?.focus();
  };

  //USE EFFECT
  useEffect(() => {
    let isMounted = true;
    console.log('🚀 ~ useEffect ~ isMounted:', isMounted);
    const fetchInvoice = async () => {
      try {
        setLoading(true);
        const dataInvoiceFromBack = { cus_id: 1, order_id: 3, date: new Date() };
        console.log('🚀 ~ fetchInvoice ~ dataInvoiceFromBack:', dataInvoiceFromBack);
        if (isMounted) {
          setInvoice(dataInvoiceFromBack);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchInvoice();

    return () => {
      isMounted = false;
      console.log('🚀 ~ return ~ isMounted:', isMounted);
    };
  }, []);

  return (
    <>
      <h1>{hookTitle}</h1>
      <div>
        <p>Clicked button {counter} times</p>
        <Button
          label="Check"
          icon="pi pi-check"
          onClick={() => setCounter(counter + 1)}
        />
        <h2>USE EFFECT EXAMPLE</h2>
        <Button
          label="Check"
          icon="pi pi-check"
          onClick={() => router.back()}
        />
        <p>{invoice.cus_id}</p>
      </div>
      <div>
        <h1>Use REf HOOK</h1>
        <input
          type="text"
          ref={inputRef}
        />
        <Button
          label="Focus input"
          severity="info"
          onClick={() => onButtonClick()}
        />
      </div>
    </>
  );
}
