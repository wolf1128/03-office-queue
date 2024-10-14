# Office Queue Management System

The Office Queue Management is a system that manages the queues for desk services open the public (e.g., post office, medical office). In the same office, various counters can handle different types of services (e.g., shipping or accounts management).

Each counter can handle several types of services, which are defined at configuration time. The definition consist of a tag name that identifies the service type and an estimate of the average time needed to process that service type (known as service time). A service type can be served by multiple counters.

When clients get at the office, they specify the service type and receive a ticket with a wait list code. Ticket codes are unique for the whole office. The codes will be used to call clients to the correct counter when their request can be served.

The system maintains different queues, one for each service type, so it is possible to know the number of people waiting for each type. Every morning the queues are reset.

When an officer tells the system to call the next client, based on the counter id (and the services it can offer) the system returns the ticket code that will be handled by that counter.

The next ticket to serve is selected with the following rule: 

select the first number from the longest queue among those corresponding to the service types the counter can handle. If two or more queues have the same length, the queue associated with request type having the lowest service time is selected.

If all the queues the counter can serve are empty, the system does nothing.

Selected tickets are considered served and removed from their queue (which is therefore shortened by one).
The system sends notifications concerning the length of the queues and the ticket codes called to the counters. When a new ticket is issued, one queue changes, therefore, the system shows on the main display board the updated queue lengths (and possibly notify all the interested customers).

Each time a new ticket is selected the following actions must be performed:

• show on the main display board when a new ticket number is being called to a given counter;

• show on the main display board the updated length of the queue associated with the type of served ticket

The system should also provide an estimate of the waiting (minimum) time for the holder of a given ticket number. The waiting time is evaluated as:

$$
T_r = t_r \cdot \left( \frac{n_r}{\sum_i \frac{1}{k_i} \cdot s_{i,r}} + \frac{1}{2} \right)
$$

where:

• tr is the service time for request type r

• nr is the number of people in queue for request type r

• ki is the number of different types of requests served by counter i

• si,r is an indicator variable equal to 1 if counter i can serve request r, 0 otherwise.

A manager in the office must be able to know how many customers have been served for each service type. In addition the system should provide the number of customers each counter has served, further divided by service type. Stats must be provided per day, week, month.


# Sprint 0
Regarding the Agile approach for the first sprint after the technology discussion, 3 features have been chosen to be done:
* Get ticket

* Next customer

* Call customer

The tasks are assigned to each feature by clarifying the stories and requirements according to the primary system design and database scheme

# System design

![GeneralSystemIdea](/assets/mockups/GeneralSystemIdea.jpg)

# Database Structure

| SQL Table | Columns |
| --- | --- |
| Service | ServiceID, ServiceName, ServiceTime |
| Counter | CounterID, CounterLabel |
| Queue | QueueID/TicketID, ServiceID, IssuedTime, EstimatedWaitTime |
| QueueHistory | QueueID/TicketID, ServiceID, CounterID, Date, ServedTime |
| CounterConfiguration | CounterID, ServiceID, Date |

## Get ticket
 ### Story 

As a customer
I want to select a service
So that I get served when my turn comes

## Next customer
 ### Story 

As an officer
I want to call the next client to my counter
So that I can serve him or her

## Call customer
 ### Story 

As a customer
I want to know when my turn comes and where to go

## Tasks
For each feature the taskes are defined in the following order
### FrontEnd 
				
* Create mockup 	
* Develop page  	
* Styling the page 
* Documentation 	
* Code review 		

### BackEnd
* API design 
* Develop backend 
* Unit test 
* Integration test
* Documentation
* DB changes
* Code review
