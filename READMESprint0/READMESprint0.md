
# Sprint 0
Regarding the Agile approach for the first sprint after the technology discussion, 3 features have been chosen to be done:
* Next customer

* Call customers

* Get ticket 

The tasks are assigned to each feature by clarifying the stories and requirements according to the primary system design and database scheme

# System design

![General system idea](General%20system%20idea.jpg)

# Database Structure

| SQL Table | Columns |
| --- | --- |
| Service | ServiceID, ServiceName, ServiceTime |
| Counter | CounterID, CounterLabel |
| Queue | QueueID/TicketID, ServiceID, IssuedTime, EstimatedWaitTime |
| QueueHistory | QueueID/TicketID, ServiceID, CounterID, Date, ServedTime |
| CounterConfiguration | CounterID, ServiceID, Date |

## Next customer
 ### Story 

As an officer
I want to call the next client to my counter
So that I can serve him or her

### Tasks

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

## Call customer
 ### Story 

As a customer
I want to know when my turn comes and where to go

### Tasks

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

## Get ticket
 ### Story 

As a customer
I want to select a service
So that I get served when my turn comes

### Tasks

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