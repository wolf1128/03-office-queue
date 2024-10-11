class Service {
    serviceID: number
    serviceName: string
    serviceTime: number

    constructor(ServiceID: number, ServiceName: string, ServiceTime: number) {
        this.serviceID = ServiceID;
        this.serviceName = ServiceName;
        this.serviceTime = ServiceTime;
    }
}

export default Service