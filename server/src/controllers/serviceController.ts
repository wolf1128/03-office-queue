import Service from "../components/service"
import ServiceDAO from "../dao/serviceDAO"


class ServiceController {
    private serviceDAO: ServiceDAO;

    constructor() {
        this.serviceDAO = new ServiceDAO();
    }

    async getServices(): Promise<any[] | null> {
        return this.serviceDAO.getServices();
    }

}

export default ServiceController;