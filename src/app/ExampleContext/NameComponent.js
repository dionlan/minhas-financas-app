import { useContext } from "react";
import { UserContext } from "./UserContext";

const NameComponent = () => {
    const user = useContext(UserContext)

    return(
        <div>
            <h2 className="mt-4">
                <strong>Name: </strong> {user.name}
            </h2>
        </div>
    )
}
export default NameComponent;