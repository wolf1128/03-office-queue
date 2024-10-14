# Office Queue Management Full API Specifications

This document lists all the expected behaviors for the APIs for next-customer that compose the Office Queue Management application.


# GET TICKET API Documentation

## 1. GET /api/service

### Description:
This API retrieves the list of available services for which a customer can request a ticket.

### Request:
- **Method**: GET
- **URL**: `/api/services`
- **Parameters**: None

### Response:
- **Status**: 200 OK
- **Body** (JSON):
```json
[
  {
    "serviceName": "Service A",
    "serviceID": 1
  },
  {
    "serviceName": "Service B",
    "serviceID": 2
  },
  {
    "serviceName": "Service C",
    "serviceID": 3
  },
  {
    "ServiceName": "Service D",
    "serviceID": 4
  }
]
```

---

## 2. POST /api/tickets

### Description:
This API creates a new ticket for the specified service.

### Request:
- **Method**: POST
- **URL**: `/api/tickets`
- **Body Parameters**:
    - **serviceID** (number): The ID of the service for which the ticket is being requested

#### Example Request:
```json
{
  "serviceID": 1
}
```

### Response:
- **Status**: 201 Created
- **Body** (JSON):
```json
{
  "ticket": {
    "ticketID": 12345,
    "issuedTime": "2024-10-10T10:00:00Z",
    "status": "Pending",
    "waitingTime": "15 minutes",
    "serviceID": "Service A"
  }
}
```

---

## Error Responses:

- **400 Bad Request**: If required parameters are missing or invalid.
- **500 Internal Server Error**: If there is an issue processing the request.

---


# NEXT CUSTOMER API Documentation

## 1. PATCH /api/next-customer

### Description:

This API is used by the counter staff/officer to call the next customer based on the service types handled by their counter. It selects the next ticket based on the longest queue or, if queues are of the same length, based on the shortest service time.

### Request:
- **Method**: PATCH
- **URL**: `/api/tickets/next-custormer/:officerID`
- **Parameters**: 
  - officerID: an integer number


### Response:
- **Status**: 200 OK
- **Body** (JSON):
```json
[
  { "ticketNumber": 9876, 
    "serviceName": "Deposit Money", 
    "serviceTime": "5 minutes", 
    "queueLength": 3,
    "status": "in progress"}
]
```

---

## Error Responses:

- **400 Bad Request**: If required parameters are missing or invalid.
- **500 Internal Server Error**: If there is an issue processing the request.

---
