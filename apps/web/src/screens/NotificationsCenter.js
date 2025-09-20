import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import SideNav from '../components/SideNav/SideNav';
import '../App.css';

function UserNotificationView({ isSideNavActive, toggleSideNav, closeSideNav }) {
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('role') !== 'STUDENT') {
            navigate('/login');
            return;
        }
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/notifications/user/${userId}`);
                setNotifications(response.data);
            } catch (err) {
                setError('Failed to fetch notifications');
                console.error(err);
            }
        };
        fetchNotifications();
    }, [userId, navigate]);

    return (
        <div>
            <Navbar toggleSideNav={toggleSideNav} />
            <SideNav isActive={isSideNavActive} closeSideNav={closeSideNav} />
            <div className="main-section">
                <h1>User Notifications</h1>
                {error && <p className="error">{error}</p>}
                <div className="message-history">
                    <h2>Received Messages</h2>
                    {notifications.length === 0 ? (
                        <p>No notifications yet.</p>
                    ) : (
                        <div className="message-list">
                            {notifications.map((msg, index) => (
                                <div key={index} className="message-card">
                                    <h3>{msg.subject}</h3>
                                    <p>{msg.content}</p>
                                    <p><strong>Recipient:</strong> {msg.recipient}</p>
                                    <p><strong>Sent:</strong> {msg.timestamp}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserNotificationView;