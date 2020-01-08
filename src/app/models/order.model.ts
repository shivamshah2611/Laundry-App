export class Order {
    constructor(public id: string, public noOfGarments: number, public services: string, public amount: number,
    public address: string,public pincode: string, public orderCreateddate: string, public pickupDate: string, public pickupTimeslot:string,
    public deliveryDate: string, public orderStatus: string, public payStauts: string) {}
}
