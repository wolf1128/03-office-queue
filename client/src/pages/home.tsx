import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";


function Home() {


    return (
        <>
            <div>
                <IoIosInformationCircleOutline size={28} />

            </div>
            <div>
                <MdOutlineLocalPostOffice size={28} />
            </div>
            <h2>
                Italian Post Office
            </h2>
            <h1>
                Select A Serivce
            </h1>
            <div>
                <Button>Service 02</Button>
                <Button>Service 03</Button>
                <Button>Service 04</Button>
                <Button>Service 01</Button>
            </div>
            <div>
                <Button>Need Help?</Button>
            </div>


        </>
    )
}

export default Home