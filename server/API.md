# Office Queue Management Full API Specifications

This document lists all the expected behaviors for the APIs that compose the Office Queue Management application.
# API Design - Queue Management System

## GET /api/notifications

### Description:
This endpoint returns all tickets that are in the "in queue" status, grouped by service type. It provides the next ticket to be served and number of people in queue

