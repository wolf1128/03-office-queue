# Office Queue Management Full API Specifications

This document lists all the expected behaviors for the APIs for next-customer that compose the Office Queue Management application.


# NEXT CUSTOMER API Documentation

## 1. GET /api/next-customer

### Description:

This API is used by the counter staff/officer to call the next customer based on the service types handled by their counter. It selects the next ticket based on the longest queue or, if queues are of the same length, based on the shortest service time.

### Request:
- **Method**: PATCH
- **URL**: `/api/next-custormer`
- **Parameters**: 
```json
[
  { 
  "serviceId": 101,  
  "officerId": 456
}
]
```


### Response:
- **Status**: 200 OK
- **Body** (JSON):
```json
[
  { "ticketNumber": 9876, 
    "serviceName": "Deposit Money", 
    "serviceTime": "5 minutes", 
    "queueLength": 3}
]
```

---

## Error Responses:

- **400 Bad Request**: If required parameters are missing or invalid.
- **500 Internal Server Error**: If there is an issue processing the request.

---

