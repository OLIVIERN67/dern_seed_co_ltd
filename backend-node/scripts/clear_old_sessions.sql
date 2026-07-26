-- Migration: Clear old cookie-based sessions
-- This removes all existing sessions to ensure clean slate for new token-based auth
-- Run this after updating to the new session management system

DELETE FROM sessions;
