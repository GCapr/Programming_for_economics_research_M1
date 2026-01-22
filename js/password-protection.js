/**
 * ProTools ER1 - Password Protection System
 *
 * This system provides client-side password protection for course materials.
 *
 * IMPORTANT NOTE FOR FUTURE MONETIZATION:
 * -----------------------------------------
 * This is a basic client-side protection suitable for sharing with students.
 * For selling access, you should upgrade to:
 *
 * 1. SERVER-SIDE AUTHENTICATION: Use a service like:
 *    - Memberful (memberful.com) - integrates with Stripe
 *    - Teachable (teachable.com) - full course platform
 *    - Gumroad (gumroad.com) - simple product sales
 *    - Payhip (payhip.com) - digital product sales
 *
 * 2. These services provide:
 *    - Secure payment processing
 *    - User accounts and login
 *    - Content drip/scheduling
 *    - Analytics and student tracking
 *    - Revocable access
 *
 * Current password (for students): firsT_coursE2026
 * To change: modify the HASHED_PASSWORD below
 */

(function() {
    'use strict';

    // Simple hash function (for basic protection)
    // The password is: firsT_coursE2026
    // This is NOT cryptographically secure - for real monetization, use server-side auth
    const HASHED_PASSWORD = 'Zmlyc1RfY291cnNFMjAyNg=='; // base64 of the password: firsT_coursE2026

    const STORAGE_KEY = 'protools_er1_access';
    const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

    // Check if user has valid session
    function hasValidSession() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) return false;

            const data = JSON.parse(stored);
            const now = new Date().getTime();

            // Check if session hasn't expired
            if (data.expires && data.expires > now && data.verified) {
                return true;
            }

            // Session expired, clear it
            localStorage.removeItem(STORAGE_KEY);
            return false;
        } catch (e) {
            return false;
        }
    }

    // Verify password
    function verifyPassword(input) {
        // Simple base64 comparison (basic protection)
        const inputEncoded = btoa(input);
        return inputEncoded === HASHED_PASSWORD;
    }

    // Grant access
    function grantAccess() {
        const data = {
            verified: true,
            expires: new Date().getTime() + SESSION_DURATION,
            grantedAt: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        hideOverlay();
    }

    // Show overlay
    function showOverlay() {
        const overlay = document.getElementById('password-overlay');
        if (overlay) {
            overlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    // Hide overlay
    function hideOverlay() {
        const overlay = document.getElementById('password-overlay');
        if (overlay) {
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    // Initialize password protection
    function init() {
        // Check if overlay exists on this page
        const overlay = document.getElementById('password-overlay');
        if (!overlay) return;

        // Check for valid session
        if (hasValidSession()) {
            hideOverlay();
            return;
        }

        // Show the overlay
        showOverlay();

        // Set up event listeners
        const submitBtn = document.getElementById('password-submit');
        const passwordInput = document.getElementById('password-input');
        const errorMsg = document.getElementById('password-error');

        if (submitBtn && passwordInput) {
            // Handle submit button click
            submitBtn.addEventListener('click', function() {
                const password = passwordInput.value.trim();

                if (verifyPassword(password)) {
                    grantAccess();
                    if (errorMsg) errorMsg.style.display = 'none';
                } else {
                    if (errorMsg) errorMsg.style.display = 'block';
                    passwordInput.value = '';
                    passwordInput.focus();
                }
            });

            // Handle Enter key
            passwordInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    submitBtn.click();
                }
            });

            // Focus the input
            passwordInput.focus();
        }
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
