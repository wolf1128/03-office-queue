## Overview
This document outlines the core API functionalities that power the Office Queue Management system. The system allows users to view available services, request tickets for a chosen service, and track their ticket details, including estimated wait times.

## API overview
## Get ticket
### 1. GET /api/service

### Description:
This API retrieves the list of available services for which a customer can request a ticket.

### Request:
- **Method**: `GET`
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
### Purpose:
* Enables customers to view the services that the office offers. Each service has a unique ID used when creating tickets.

### 2. POST /api/tickets

### Description:
This API creates a new ticket for the specified service.

### Request:
- **Method**: `POST`
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
### Purpose:
* Allows users to generate a ticket for a selected service, returning ticket details including the estimated wait time for the user to be served.

### Error Responses:
- **400 Bad Request**: If required parameters are missing or invalid.
- **500 Internal Server Error**: If there is an issue processing the request.

## Next Customer
### 1. PATCH /api/next-customer

### Description:
This API is used by the counter staff/officer to call the next customer based on the service types handled by their counter. It selects the next ticket based on the longest queue or, if queues are of the same length, based on the shortest service time.

### Request:
- **Method**: `PATCH`
- **URL**: `/api/tickets/next-custormer/:officerID`
- **Body Parameters**:
    - **officerID** (number): The ID of the officer who needs to call next customer.

#### Example Request:
```json
{
  "ID": 123
}
```

### Response:
- **Status**: 200 ok
- **Body** (JSON):
```json
{
  { "ticketID": 9876, 
    "serviceID": 42, 
    "issuedTime": "2024-10-10T10:00:00Z", 
    "estimatedTime": 15,
    "status": "in progress"}
}
```

### Error Responses:
- **404 Not Found:** If the parameter officerID is missing.
- **422 Unprocessable Entity:** If the parameter officerID less than or equal to 0, or is not an integer.
- **503 Internal Server Error:** If there is an issue processing the request.

## Call Customer
### 1. GET /api/tickets/:ticketID/notifications

### Description:
This API is used by the customer to be notified about status of their ticket. Also, provide the data for the display board.

### Request:
- **Method**: `GET`
- **URL**: `/api/tickets/:ticketID/notifications`
- **Body Parameters**:
    - **ticketID** (number): an integer number greater than 0, representing the ID of the Ticket that customer have.

#### Example Request:
```json
{
  "myTicket": {
    "ticketID": 9876,
    "serviceID": 42,
    "counterID": 1,
    "issuedTime": "2024-10-10T10:00:00Z",
    "estimatedTime": 15,
    "status": "in queue"
  },
  "displayBoard": {
    "nextTicket": {
      "ticketID": 9876,
      "serviceID": 42,
      "counterID": 2,
      "issuedTime": "2024-10-10T10:00:00Z",
      "estimatedTime": 15,
      "status": "in progress"
    },
    "queues": [
      {
        "name": "queue-1",
        "length": 0
      }
    ]
  }
}
```

### Error Responses:
- **404 Not Found:** If the parameter officerID is missing.
- **422 Unprocessable Entity:** If the parameter officerID less than or equal to 0, or is not an integer.
- **503 Internal Server Error:** If there is an issue processing the request.

## Data Models
### Service
Represents a service available in the office for which customers can request a ticket.

### Attributes:
* `serviceID` (number): The unique identifier for the service.
* `serviceName` (string): The name of the service (e.g., "Service A").
* `serviceTime` (number): The average time (in minutes) to process a customer for this service.

### Ticket
Represents a customer ticket for a specific service.

### Attributes:
* `ticketID` (number): The unique identifier for the ticket.
* `serviceID` (number): The service ID for which the ticket was created.
* `issuedTime` (string): The time the ticket was issued.
* `estimatedTime` (number): The estimated waiting time before the ticket is served.
* `status` (string): The current status of the ticket (e.g., "Pending").

### Officer
Represents officer data about his ID and the service which served by.

### Attributes:
* `serviceID` (number): The unique identifier for the service.
* `OfficerID` (number): The unique identifier for the officer.

### Ticket History
Tracks tickets issued for different services and counters that is going to be used by manager for the statistical investigation.

### Attributes:
* `serviceID` (number): The unique identifier for the service.
* `ticketID` (number): The unique identifier for the ticket.
* `issuedTime` (string): The time the ticket was issued.
* `counter` (number): The unique identifier for each counter that give service.
