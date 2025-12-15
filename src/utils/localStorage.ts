import type { PortfolioData } from '../types/types';

const STORAGE_KEY = 'portfolio_data';
const ADMIN_SESSION_KEY = 'admin_session';

export const savePortfolioData = (data: PortfolioData): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving portfolio data:', error);
    }
};

export const loadPortfolioData = (): PortfolioData | null => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error loading portfolio data:', error);
        return null;
    }
};

export const saveAdminSession = (isAuthenticated: boolean): void => {
    try {
        localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({ isAuthenticated, timestamp: Date.now() }));
    } catch (error) {
        console.error('Error saving admin session:', error);
    }
};

export const loadAdminSession = (): boolean => {
    try {
        const session = localStorage.getItem(ADMIN_SESSION_KEY);
        if (!session) return false;

        const { isAuthenticated, timestamp } = JSON.parse(session);
        // Session expires after 24 hours
        const isExpired = Date.now() - timestamp > 24 * 60 * 60 * 1000;

        return isAuthenticated && !isExpired;
    } catch (error) {
        console.error('Error loading admin session:', error);
        return false;
    }
};

export const clearAdminSession = (): void => {
    try {
        localStorage.removeItem(ADMIN_SESSION_KEY);
    } catch (error) {
        console.error('Error clearing admin session:', error);
    }
};
