import React, { useEffect, useState } from 'react';
import { approveUser, rejectUser, getPendingUsers } from '../Firebase';
import { Table } from 'react-bootstrap';

const AdminPortal = () => {
    // State to store pending registrations
    const [registrations, setRegistrations] = useState([]);
    const [isHandled, setIsHandled] = useState({});

    useEffect(() => {
        // Fetch pending registrations
        getPendingUsers()
            .then((pendingUsers) => {
                setRegistrations(pendingUsers);
                // Initialize isHandled state for each registration
                const handledState = {};
                pendingUsers.forEach(user => {
                    handledState[user.id] = false;
                });
                setIsHandled(handledState);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleApprove = async (userId) => {
        try {
            const isH = await approveUser(userId);
            setIsHandled(prevState => ({ ...prevState, [userId]: isH }));
        } catch (error) {
            console.error('Error approving user:', error);
        }
    };

    const handleReject = async (userId) => {
        try {
            const isH = await rejectUser(userId);
            setIsHandled(prevState => ({ ...prevState, [userId]: isH }));
        } catch (error) {
            console.error('Error rejecting user:', error);
        }
    };

    return (
        <div className='d-flex align-items-center justify-content-center flex-column p-5'>
            <h1 className='mb-5'>Admin Portal</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {registrations.map((registration) => (
                        !isHandled[registration.id] && (
                            <tr key={registration.id}>
                                <td>{registration.email}</td>
                                <td className=' d-flex flex-column flex-md-row align-items-center justify-content-center gap-2'>
                                    <button onClick={() => handleApprove(registration.id)}>Approve</button>
                                    <button onClick={() => handleReject(registration.id)}>Disapprove</button>
                                </td>
                            </tr>
                        )
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default AdminPortal;
