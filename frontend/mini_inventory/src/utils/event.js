import { formatDistanceToNow } from 'date-fns';
export function formatEvent(event) {
    const { action, quantity, product_title, source_warehouse_title, destination_warehouse_title, created_at } = event;

    let timeAgo = formatDistanceToNow(new Date(created_at), { addSuffix: true });

    switch (action.toLowerCase()) {
        case 'remove':
            return `Removed ${quantity}x ${product_title} from ${source_warehouse_title} ${timeAgo}.`;

        case 'transfer':
            return `Transferred ${quantity}x ${product_title} from ${source_warehouse_title} to ${destination_warehouse_title} ${timeAgo}.`;

        case 'update':
            return `Updated ${product_title} stock to ${quantity} in ${source_warehouse_title} ${timeAgo}.`;
    }
}