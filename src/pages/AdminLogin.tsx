import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { saveAdminSession } from '../utils/localStorage';
import { motion } from 'framer-motion';
import { fadeIn, fadeInUp } from '../utils/animations';
import './AdminLogin.css';

const AdminLogin: React.FC = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Simple password check (you can change this password)
        if (password === 'admin123') {
            saveAdminSession(true);
            navigate('/admin/dashboard');
        } else {
            setError('Incorrect password');
            setPassword('');
        }
    };

    return (
        <div className="admin-login-page">
            <motion.div
                className="login-container glass"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <motion.div className="login-icon" variants={fadeInUp}>
                    <Lock size={48} />
                </motion.div>

                <motion.h1 variants={fadeInUp}>Admin Login</motion.h1>
                <motion.p variants={fadeInUp}>Enter your password to access the admin panel</motion.p>

                <motion.form onSubmit={handleSubmit} variants={fadeInUp}>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            autoFocus
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </motion.form>

                <motion.p className="login-hint" variants={fadeInUp}>
                    Default password: <code>admin123</code>
                </motion.p>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
