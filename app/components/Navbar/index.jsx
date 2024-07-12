import Link from "next/link";
import InputSearch from "./InputSearch";
import UserActionButton from "./UserActionButton";

const Navbar = () => {
    return (
        <header style={{ backgroundColor: '#222831' }}>
            <div className="flex md:flex-row flex-col justify-between md:items-center p-4 gap-2">
                <Link href="/" className="font-bold text-2xl" style={{ color: '#76ABAE' }}>WORKGUILDHUB</Link>
                {/* <InputSearch /> */}
                <UserActionButton />
            </div>
        </header>
    );
};

export default Navbar;
