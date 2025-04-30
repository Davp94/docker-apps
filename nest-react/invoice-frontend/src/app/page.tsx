'use client';
import MyComponent from "@/components/my-component";
import axios from "axios";
import { Button } from "primereact/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="w-full flex justify-content-center">
      <img src="http://74.208.201.97:3000/uploads/nest-1723770568489_790749583.png" width={800} height={300} alt="Nest banner"/>
      </div>
      <Button label="Exit" icon="pi pi-check"  severity="warning" onClick={() => {
        Cookies.remove("token")
        router.push("/auth/login")}
      }/>
      <h1>HOLA MUNDO</h1>
      <div className="card flex justify-content-center">
        <Button label="Check" icon="pi pi-check" />
      </div>
      <div className="card flex justify-content-center">
        <Button label="Check" icon="pi pi-check" />
        <Button label="Check" icon="pi pi-check" />
        <Button label="Check" icon="pi pi-check" />
        <Button label="Check" icon="pi pi-check" />
      </div>
      <MyComponent underline={true} text="hola mundo" />
      <MyComponent underline={true} text="hola mundo 2" />
      <MyComponent underline={true} text="hola mundo 3" />
      <MyComponent underline={true} text="hola mundo 4" />
      <MyComponent underline={true} text="hola mundo 5" />
      <MyComponent underline={true} text="hola mundo 6" />
    </>
  );
}
