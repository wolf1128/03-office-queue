## Overview
The frontend of Office Queue Management is built using React, a popular JavaScript library for building user interfaces. Our frontend is structured as a single-page application (SPA), which means that the app loads a single HTML page and dynamically updates the page as the user interacts with it, without requiring a full page reload.

## Components

- `home` (in `home.tsx`): The component lets customers select a service, create a corresponding ticket, and then navigates them to a detailed ticket page after the ticket is successfully created.

- `navbar` (in `navbar.tsx`): The navbar provides basic navigation: a button to go back to the home page and an information button that shows helpful instructions in a tooltip.

- `ticket` (in `ticket.tsx`): The component displays the details of a ticket, including its ID, estimated waiting time, and the type of service it was issued for.

## Styling
This section describes the visual design of the frontend, including the layout, color scheme, typography, and other design elements.
### home
This the first page that customer will face with
![1-get-ticket-0](/assets/mockups/1-get-ticket-0.png)
### ticket
This page shows the detail of ticket that customer gets
![1-get-ticket-1](/assets/mockups/1-get-ticket-1.png)

## API overview
The API file provides two main functions that are used to interact with the backend:
### getAllServices(): 
Fetches the list of available services from the backend (likely called when the app needs to display the services a user can choose from).
### createTicket(serviceID): 
Creates a ticket for a selected service by sending a `POST` request to the backend with the serviceID. The response contains a Ticket object.
