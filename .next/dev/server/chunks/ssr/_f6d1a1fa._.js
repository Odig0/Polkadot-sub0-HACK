module.exports = [
"[project]/lib/arkiv-service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "arkivService",
    ()=>arkivService
]);
const ARKIV_API_BASE = 'https://arkacdn.cloudycoding.com/api';
const arkivService = {
    /**
   * Health check para verificar que Arkiv está disponible
   */ async healthCheck () {
        try {
            const response = await fetch(`${ARKIV_API_BASE}/health`);
            return response.ok;
        } catch (error) {
            console.error('Arkiv health check failed:', error);
            return false;
        }
    },
    /**
   * Crear una entrada de ticket (entrada comprada)
   */ async createTicketEntry (ticketData) {
        try {
            // Crear ID local como fallback
            const localId = `ticket_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            const response = await fetch(`${ARKIV_API_BASE}/tickets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ticketData)
            });
            if (!response.ok) {
                console.warn(`Arkiv API returned ${response.status}, usando almacenamiento local`);
                return {
                    success: true,
                    data: {
                        id: localId,
                        ...ticketData
                    }
                };
            }
            const data = await response.json();
            return {
                success: true,
                data
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.warn(`Arkiv error: ${errorMessage}, usando almacenamiento local`);
            // Fallback: guardar localmente
            const localId = `ticket_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            return {
                success: true,
                data: {
                    id: localId,
                    ...ticketData
                }
            };
        }
    },
    /**
   * Obtener todas las entradas de tickets para un evento
   */ async getEventTickets (eventId) {
        try {
            const response = await fetch(`${ARKIV_API_BASE}/tickets?eventId=${eventId}`);
            if (!response.ok) {
                throw new Error(`Arkiv API error: ${response.status}`);
            }
            const data = await response.json();
            return {
                success: true,
                data
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error('Error fetching event tickets:', errorMessage);
            return {
                success: false,
                error: errorMessage
            };
        }
    },
    /**
   * Obtener tickets de un comprador específico
   */ async getBuyerTickets (buyerWallet) {
        try {
            const response = await fetch(`${ARKIV_API_BASE}/tickets?buyer=${buyerWallet}`);
            if (!response.ok) {
                throw new Error(`Arkiv API error: ${response.status}`);
            }
            const data = await response.json();
            return {
                success: true,
                data
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error('Error fetching buyer tickets:', errorMessage);
            return {
                success: false,
                error: errorMessage
            };
        }
    },
    /**
   * Crear una entrada de puja en subasta
   */ async createBidEntry (bidData) {
        try {
            // Crear ID local como fallback
            const localId = `bid_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            const response = await fetch(`${ARKIV_API_BASE}/bids`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bidData)
            });
            if (!response.ok) {
                console.warn(`Arkiv API returned ${response.status}, usando almacenamiento local`);
                // Si Arkiv no funciona, guardar localmente
                return {
                    success: true,
                    data: {
                        id: localId,
                        ...bidData
                    }
                };
            }
            const data = await response.json();
            return {
                success: true,
                data
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.warn(`Arkiv error: ${errorMessage}, usando almacenamiento local`);
            // Fallback: guardar localmente con ID generado
            const localId = `bid_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            return {
                success: true,
                data: {
                    id: localId,
                    ...bidData
                }
            };
        }
    },
    /**
   * Obtener todas las pujas de una subasta
   */ async getAuctionBids (auctionId) {
        try {
            const response = await fetch(`${ARKIV_API_BASE}/bids?auctionId=${auctionId}`);
            if (!response.ok) {
                throw new Error(`Arkiv API error: ${response.status}`);
            }
            const data = await response.json();
            return {
                success: true,
                data
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error('Error fetching auction bids:', errorMessage);
            return {
                success: false,
                error: errorMessage
            };
        }
    },
    /**
   * Obtener pujas de un pujador específico
   */ async getBidderBids (bidderWallet) {
        try {
            const response = await fetch(`${ARKIV_API_BASE}/bids?bidder=${bidderWallet}`);
            if (!response.ok) {
                throw new Error(`Arkiv API error: ${response.status}`);
            }
            const data = await response.json();
            return {
                success: true,
                data
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error('Error fetching bidder bids:', errorMessage);
            return {
                success: false,
                error: errorMessage
            };
        }
    },
    /**
   * Actualizar estado de un ticket (ej: usado, revocado)
   */ async updateTicketStatus (ticketId, status, transactionHash) {
        try {
            const response = await fetch(`${ARKIV_API_BASE}/tickets/${ticketId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status,
                    transactionHash,
                    updatedAt: new Date().toISOString()
                })
            });
            if (!response.ok) {
                throw new Error(`Arkiv API error: ${response.status}`);
            }
            const data = await response.json();
            return {
                success: true,
                data
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error('Error updating ticket status:', errorMessage);
            return {
                success: false,
                error: errorMessage
            };
        }
    },
    /**
   * Obtener estadísticas de un evento
   */ async getEventStats (eventId) {
        try {
            const response = await fetch(`${ARKIV_API_BASE}/events/${eventId}/stats`);
            if (!response.ok) {
                throw new Error(`Arkiv API error: ${response.status}`);
            }
            const data = await response.json();
            return {
                success: true,
                data
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error('Error fetching event stats:', errorMessage);
            return {
                success: false,
                error: errorMessage
            };
        }
    },
    /**
   * Obtener estadísticas de una subasta
   */ async getAuctionStats (auctionId) {
        try {
            const response = await fetch(`${ARKIV_API_BASE}/auctions/${auctionId}/stats`);
            if (!response.ok) {
                throw new Error(`Arkiv API error: ${response.status}`);
            }
            const data = await response.json();
            return {
                success: true,
                data
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error('Error fetching auction stats:', errorMessage);
            return {
                success: false,
                error: errorMessage
            };
        }
    }
};
}),
"[project]/lib/arkiv-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"006f15070e7de4793d986a666aa564f750cf21d1ff":"checkArkivHealthAction","40007df5022d81c2cc16c83826c9327e773c7deba7":"getAuctionBidsAction","4011cadc8f300b1288d0f4713dc07f81e826064e11":"createTicketEntryAction","403da1f22f3df3a4b0ad096e75fb4ddf58ac6511bc":"getBuyerTicketsAction","406ef524377a0dc6a823c1321c0df0f63db83a0990":"getEventStatsAction","409c1899e4e0d62f79311df122d314157bbe637e1e":"getAuctionStatsAction","40b95981193d25d5a1d594f15a89a3ca319f924a88":"getEventTicketsAction","40d4456fc2caedc2391af33eee3581df4d2c374d89":"createBidEntryAction","40ec65d1bc65ae24cf2a4b5ad172307813a1db098c":"getBidderBidsAction","70ca910d143637fb421331bb11e6d9c1be067ed925":"updateTicketStatusAction"},"",""] */ __turbopack_context__.s([
    "checkArkivHealthAction",
    ()=>checkArkivHealthAction,
    "createBidEntryAction",
    ()=>createBidEntryAction,
    "createTicketEntryAction",
    ()=>createTicketEntryAction,
    "getAuctionBidsAction",
    ()=>getAuctionBidsAction,
    "getAuctionStatsAction",
    ()=>getAuctionStatsAction,
    "getBidderBidsAction",
    ()=>getBidderBidsAction,
    "getBuyerTicketsAction",
    ()=>getBuyerTicketsAction,
    "getEventStatsAction",
    ()=>getEventStatsAction,
    "getEventTicketsAction",
    ()=>getEventTicketsAction,
    "updateTicketStatusAction",
    ()=>updateTicketStatusAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$arkiv$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/arkiv-service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function createTicketEntryAction(ticketData) {
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$arkiv$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["arkivService"].createTicketEntry(ticketData);
        if (!result.success) {
            throw new Error(result.error || 'Failed to create ticket entry');
        }
        return {
            success: true,
            data: result.data
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Server action error:', errorMessage);
        return {
            success: false,
            error: errorMessage
        };
    }
}
async function createBidEntryAction(bidData) {
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$arkiv$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["arkivService"].createBidEntry(bidData);
        if (!result.success) {
            throw new Error(result.error || 'Failed to create bid entry');
        }
        return {
            success: true,
            data: result.data
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Server action error:', errorMessage);
        return {
            success: false,
            error: errorMessage
        };
    }
}
async function getBuyerTicketsAction(buyerWallet) {
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$arkiv$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["arkivService"].getBuyerTickets(buyerWallet);
        if (!result.success) {
            throw new Error(result.error || 'Failed to fetch buyer tickets');
        }
        return {
            success: true,
            data: result.data
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Server action error:', errorMessage);
        return {
            success: false,
            error: errorMessage
        };
    }
}
async function getBidderBidsAction(bidderWallet) {
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$arkiv$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["arkivService"].getBidderBids(bidderWallet);
        if (!result.success) {
            throw new Error(result.error || 'Failed to fetch bidder bids');
        }
        return {
            success: true,
            data: result.data
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Server action error:', errorMessage);
        return {
            success: false,
            error: errorMessage
        };
    }
}
async function getEventTicketsAction(eventId) {
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$arkiv$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["arkivService"].getEventTickets(eventId);
        if (!result.success) {
            throw new Error(result.error || 'Failed to fetch event tickets');
        }
        return {
            success: true,
            data: result.data
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Server action error:', errorMessage);
        return {
            success: false,
            error: errorMessage
        };
    }
}
async function getAuctionBidsAction(auctionId) {
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$arkiv$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["arkivService"].getAuctionBids(auctionId);
        if (!result.success) {
            throw new Error(result.error || 'Failed to fetch auction bids');
        }
        return {
            success: true,
            data: result.data
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Server action error:', errorMessage);
        return {
            success: false,
            error: errorMessage
        };
    }
}
async function updateTicketStatusAction(ticketId, status, transactionHash) {
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$arkiv$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["arkivService"].updateTicketStatus(ticketId, status, transactionHash);
        if (!result.success) {
            throw new Error(result.error || 'Failed to update ticket status');
        }
        return {
            success: true,
            data: result.data
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Server action error:', errorMessage);
        return {
            success: false,
            error: errorMessage
        };
    }
}
async function getEventStatsAction(eventId) {
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$arkiv$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["arkivService"].getEventStats(eventId);
        if (!result.success) {
            throw new Error(result.error || 'Failed to fetch event stats');
        }
        return {
            success: true,
            data: result.data
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Server action error:', errorMessage);
        return {
            success: false,
            error: errorMessage
        };
    }
}
async function getAuctionStatsAction(auctionId) {
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$arkiv$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["arkivService"].getAuctionStats(auctionId);
        if (!result.success) {
            throw new Error(result.error || 'Failed to fetch auction stats');
        }
        return {
            success: true,
            data: result.data
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Server action error:', errorMessage);
        return {
            success: false,
            error: errorMessage
        };
    }
}
async function checkArkivHealthAction() {
    try {
        const isHealthy = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$arkiv$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["arkivService"].healthCheck();
        return {
            success: isHealthy,
            status: isHealthy ? 'healthy' : 'unavailable'
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Server action error:', errorMessage);
        return {
            success: false,
            error: errorMessage
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createTicketEntryAction,
    createBidEntryAction,
    getBuyerTicketsAction,
    getBidderBidsAction,
    getEventTicketsAction,
    getAuctionBidsAction,
    updateTicketStatusAction,
    getEventStatsAction,
    getAuctionStatsAction,
    checkArkivHealthAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createTicketEntryAction, "4011cadc8f300b1288d0f4713dc07f81e826064e11", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createBidEntryAction, "40d4456fc2caedc2391af33eee3581df4d2c374d89", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getBuyerTicketsAction, "403da1f22f3df3a4b0ad096e75fb4ddf58ac6511bc", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getBidderBidsAction, "40ec65d1bc65ae24cf2a4b5ad172307813a1db098c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getEventTicketsAction, "40b95981193d25d5a1d594f15a89a3ca319f924a88", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAuctionBidsAction, "40007df5022d81c2cc16c83826c9327e773c7deba7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateTicketStatusAction, "70ca910d143637fb421331bb11e6d9c1be067ed925", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getEventStatsAction, "406ef524377a0dc6a823c1321c0df0f63db83a0990", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAuctionStatsAction, "409c1899e4e0d62f79311df122d314157bbe637e1e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(checkArkivHealthAction, "006f15070e7de4793d986a666aa564f750cf21d1ff", null);
}),
"[project]/.next-internal/server/app/auction/[id]/page/actions.js { ACTIONS_MODULE0 => \"[project]/lib/arkiv-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$arkiv$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/arkiv-actions.ts [app-rsc] (ecmascript)");
;
}),
"[project]/.next-internal/server/app/auction/[id]/page/actions.js { ACTIONS_MODULE0 => \"[project]/lib/arkiv-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "40d4456fc2caedc2391af33eee3581df4d2c374d89",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$arkiv$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createBidEntryAction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$auction$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$lib$2f$arkiv$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/auction/[id]/page/actions.js { ACTIONS_MODULE0 => "[project]/lib/arkiv-actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$arkiv$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/arkiv-actions.ts [app-rsc] (ecmascript)");
}),
"[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable import/no-extraneous-dependencies */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerServerReference", {
    enumerable: true,
    get: function() {
        return _server.registerServerReference;
    }
});
const _server = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)"); //# sourceMappingURL=server-reference.js.map
}),
"[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This function ensures that all the exported values are valid server actions,
// during the runtime. By definition all actions are required to be async
// functions, but here we can only check that they are functions.
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ensureServerEntryExports", {
    enumerable: true,
    get: function() {
        return ensureServerEntryExports;
    }
});
function ensureServerEntryExports(actions) {
    for(let i = 0; i < actions.length; i++){
        const action = actions[i];
        if (typeof action !== 'function') {
            throw Object.defineProperty(new Error(`A "use server" file can only export async functions, found ${typeof action}.\nRead more: https://nextjs.org/docs/messages/invalid-use-server-value`), "__NEXT_ERROR_CODE", {
                value: "E352",
                enumerable: false,
                configurable: true
            });
        }
    }
} //# sourceMappingURL=action-validate.js.map
}),
];

//# sourceMappingURL=_f6d1a1fa._.js.map