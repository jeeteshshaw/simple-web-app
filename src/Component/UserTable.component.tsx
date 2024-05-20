import React from 'react';
import { User } from '../store/users';



interface UserTableProps {
    users: User[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, currentPage, totalPages, onPageChange }) => {
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Avatar</th>
                            <th className="px-4 py-2 border">First Name</th>
                            <th className="px-4 py-2 border">Last Name</th>
                            <th className="px-4 py-2 border">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="px-4 py-2 border">
                                    <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="w-10 h-10 rounded-full" />
                                </td>
                                <td className="px-4 py-2 border">{user.first_name}</td>
                                <td className="px-4 py-2 border">{user.last_name}</td>
                                <td className="px-4 py-2 border">{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default UserTable;
