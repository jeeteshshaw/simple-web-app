import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Config/request';
import UserTable from '../Component/UserTable.component';
import  { SetUserList, } from '../store/users';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';


interface DashboardProps {
    onLogout: () => void;
}
const Dashboard: React.FC<DashboardProps> = (props) => {
    const history = useNavigate();
    // const [users, setUsers] = useState<User[]>([]);
     const user_list = useSelector((state: RootState) => state.users.user_list)

    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from local storage
        props.onLogout();
        dispatch(SetUserList([]));

        history('/'); // Redirect to login page
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/users?page=${currentPage}`);
                dispatch(SetUserList(response.data.data));
                setTotalPages(response.data.total_pages);
                
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };

        fetchData();
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Dashboard</h2>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                    >
                        Logout
                    </button>
                </div>
                <UserTable
                    users={user_list}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default Dashboard;