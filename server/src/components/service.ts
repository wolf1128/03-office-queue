class Service {
    ServiceID: number
    ServiceName: string
    ServiceTime: number

    constructor(ServiceID: number, ServiceName: string, ServiceTime: number) {
        this.ServiceID = ServiceID;
        this.ServiceName=ServiceName;
        this.ServiceTime=ServiceTime;
    }
}

export default Service