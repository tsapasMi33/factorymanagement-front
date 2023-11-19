import {Component} from '@angular/core';
import {Product} from "../../../core/models/product.model";
import {Step} from "../../../core/enums/step.enum";

@Component({
    selector: 'app-planning',
    templateUrl: './planning.component.html',
    styleUrls: ['./planning.component.css']
})
export class PlanningComponent {

    products: Product[] = [
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "ENCODED",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "PRODUCTION",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "CUT",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "BENT",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "COMBINED",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "WELDED",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "ASSEMBLED",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "FINISHED",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "PACKED",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "SENT",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "ENCODED",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "ENCODED",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "ENCODED",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "ENCODED",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "ENCODED",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "ENCODED",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "ENCODED",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "ENCODED",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "ENCODED",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "ENCODED",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "ENCODED",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "ENCODED",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "ENCODED",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "ENCODED",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "ENCODED",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "ENCODED",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "ENCODED",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "ENCODED",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "ENCODED",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "ENCODED",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "ENCODED",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "ENCODED",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "ENCODED",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "ENCODED",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
        {
            id: 1,
            comments: "An product order comment",
            currentStep: "ENCODED",
            variant: {
                id: 1,
                material: "T304",
                width: 700,
                length: 1000,
                height: 850,
                code: 'TABT304[L1000xW700xH850]C',
                price: 225,
                description: "Table description in variant",
                productFamily: {
                    id: 1,
                    name: "Table",
                    productionPath: ['ENCODED', "PRODUCTION", "CUT", "BENT", "COMBINED", "WELDED", "FINISHED", "PACKED", "SENT"]
                },
                components: [
                    {id: 1, name: "top", type: "PLATE", material: "T304", thickness: 8, length: 1100, width: 800, price: 60},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                    {id: 32, name: "foot", type: "TUBE", material: "T304", thickness: null, length: 800, width: null, price: 22},
                ]
            },
            orderId: null,
            batchId: null,
            batchCode: null,
            packetId: null,
            packetCode: null,
            order: {
                createdDate: new Date(),
                id: 2
                ,
                plannedDeliveryDate: new Date(),
                client: {
                    id: 1,
                    name: 'TestClient'
                }
            }
        },
]

    protected readonly Step = Step;
}
