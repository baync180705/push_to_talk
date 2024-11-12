import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-gray-800 h-screen w-screen flex flex-col justify-around items-center">
    <h1 className="text-7xl font-bold">Push Button to Record</h1>
    <button><Image src = 'record-button-svgrepo-com.svg' alt="record button" width={500} height={500}></Image></button>
    </main>
  );
}
