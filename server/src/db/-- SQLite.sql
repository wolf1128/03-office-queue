-- SQLite
DROP TABLE IF EXISTS Ticket;
DROP TABLE IF EXISTS TicketHistory;

CREATE TABLE Ticket(
    TicketID INTEGER PRIMARY KEY,
    ServiceID INTEGER REFERENCES Service(ServiceID) ON DELETE NO ACTION ON UPDATE CASCADE,
    IssuedTime DATE DEFAULT NULL,
    EstimatedTime INTEGER DEFAULT NULL,
    Status TEXT CHECK(Status IN('in queue','in progress','completed')) DEFAULT 'in queue'
);
CREATE TABLE TicketHistory(
    TicketID INTEGER PRIMARY KEY,
    ServiceID INTEGER REFERENCES Service(ServiceID) ON DELETE NO ACTION ON UPDATE CASCADE,
    IssuedTime DATE DEFAULT NULL,
    Counter INTEGER DEFAULT 0
);

DELETE FROM Service;

INSERT INTO Service VALUES(1,'S1',5);
INSERT INTO Service VALUES(2,'S2',10);
INSERT INTO Service VALUES(3,'S3',1);
INSERT INTO Service VALUES(4,'S4',5);

INSERT INTO Ticket VALUES(1,1,null,null,'completed');
INSERT INTO Ticket VALUES(2,1,null,null,'completed');
INSERT INTO Ticket VALUES(3,2,null,null,'in progress');
--INSERT INTO Ticket VALUES(4,1,null,null,'in progress');
INSERT INTO Ticket VALUES(4,1,null,null,'in queue');
INSERT INTO Ticket VALUES(5,2,null,null,'in queue');
INSERT INTO Ticket VALUES(6,1,null,null,'in queue');
INSERT INTO Ticket VALUES(7,3,null,null,'in queue');
INSERT INTO Ticket VALUES(8,3,null,null,'in queue');
INSERT INTO Ticket VALUES(9,1,null,null,'in queue');
INSERT INTO Ticket VALUES(10,4,null,null,'in queue');