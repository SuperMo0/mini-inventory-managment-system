export function formatEvent(event) {
    const { action, quantity, product_title, source_warehouse_title, destination_warehouse_title } = event;

    switch (action.toLowerCase()) {
        case 'remove':
            return `Removed ${quantity}x ${product_title} from ${source_warehouse_title}.`;

        case 'transfer':
            return `Transferred ${quantity}x ${product_title} from ${source_warehouse_title} to ${destination_warehouse_title}.`;

        case 'update':
            return `Updated ${product_title} stock to ${quantity} in ${source_warehouse_title}.`;
    }
}