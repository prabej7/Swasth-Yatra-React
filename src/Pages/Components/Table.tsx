import React from "react";
import Admin from "../Admin";

const Table: React.FC = () => {
    return (
        <div className="">
                <h1 className=' font-bold text-2xl'>Dashboard</h1>
                <p className=' mt-10 font-semibold '>New Patients</p>

                <div className="overflow-x-auto relative right-4">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>S.N</th>
                                <th>Name</th>
                                <th>Phone No.</th>
                                <th>Doctor</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>1</th>
                                <td>Cy Ganderton</td>
                                <td>9812312345</td>
                                <td>Dr. Ram Shah</td>
                                <td><button className=' bg-crimsonRed text-white p-2 pl-3 pr-3' >Delete</button></td>
                            </tr>
                            <tr>
                                <th>2</th>
                                <td>Cy Ganderton</td>
                                <td>9812312345</td>
                                <td>Dr. Ram Shah</td>
                                <td><button className=' bg-crimsonRed text-white p-2 pl-3 pr-3' >Delete</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

     
    )
}

export default Table;