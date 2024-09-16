import { divide } from "cypress/types/lodash";
import Link from "next/link";

interface SlideInLoginProps {
    isOpen: boolean;
    onClose: () => void;
}

const SlideInLogin = ({ isOpen, onClose}: SlideInLoginProps) => {

    return (
        <>
            {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>}
            <div className={`fixed top-0 right-0 h-full w-[300px] bg-white z-50 shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6">
                    <button className="text-black text-xl" onClick={onClose}> X </button>
                    <h2 className="text-2xl text-gray-900 text-center font-bold mb-4">Log in / Sign up</h2>
                    <p className="text-gray-900 font-bold text-center mb-10">With a free account, you can Shop tickets, earn points from refferal & get a discount.</p>
                    <Link href="/login">
                        <button className="bg-red-600 text-white px-4 py-2 rounded w-full mb-4"
                            onClick={onClose}
                        >
                            Log In
                        </button>
                    </Link>
                    <Link href="/register">
                        <button className="border border-red-600 text-red-600 px-4 py-2 rounded w-full"
                            onClick={onClose}
                        >
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default SlideInLogin;