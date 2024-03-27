import React, { FormEvent, useState } from "react";
import Mobile from "./Components/Mobile";
import { useNavigate } from "react-router-dom";

interface CheckboxProp {
    label: string;
}

const Ask: React.FC<CheckboxProp> = ({ label }) => {
    const [checked, setCheck] = useState<string>('p');
    const navigate = useNavigate();
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (checked === 'p') {
            navigate('/account');
        } else if (checked === 'a') {
            navigate('/pending');
        }
    }
    function handleCheck(type: string) {
        setCheck(type);
    }

    return (
        <div>
            <Mobile>
                <div>
                    <h1 className="font-medium mb-3 text-xl" >Choose account type : </h1>
                    <div className="options flex gap-2 flex-col">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3" >
                            <label className="flex gap-2" ><input type="radio" name="radio-1" className="radio" onClick={() => handleCheck('p')} checked />Personal Account</label>
                            <label className="flex gap-2" ><input type="radio" name="radio-1" className="radio" onClick={() => handleCheck('a')} />Hospital</label>
                            <button type="submit" className=" btn mt-3">Submit</button>
                        </form>

                    </div>


                </div>
            </Mobile>
        </div>
    )
}

export default Ask;