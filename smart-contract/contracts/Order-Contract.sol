// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OrderManagement {
    enum AdminOrderStatus {
        Ordered,
        Producing,
        WaitingOnPayment,
        Shipping,
        Delivered,
        Cancelled
    }

    struct Product {
        uint256 id;
        string name;
        uint256 price;
        uint256 quantity;
    }

    struct Order {
        string id;
        Product product;
        AdminOrderStatus status;
        uint256 timestamp;
        bool paymentReceived;
    }

    mapping(string => Order) private orders;
    string[] private orderIds;
    uint256 private orderIdCounter;

    event OrderCreated(string orderId, string productName);
    event OrderStatusUpdated(string orderId, AdminOrderStatus newStatus);
    event PaymentReceived(string orderId, uint256 amount);
    event PaymentFailed(string orderId, uint256 attemptedAmount);
    event ContractReset();

    constructor() {
        orderIdCounter = 0;
    }

    function generateOrderId() private returns (string memory) {
        return string(abi.encodePacked("ORDER", uint2str(orderIdCounter++)));
    }

    function createOrder(
        uint256 productId,
        string memory productName,
        uint256 productPrice,
        uint256 productQuantity
    ) public returns (string memory) {
        require(productPrice > 0, "Product price must be greater than 0");
        require(productQuantity > 0, "Product quantity must be greater than 0");

        string memory orderId = generateOrderId();

        Product memory newProduct = Product({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: productQuantity
        });

        Order memory newOrder = Order({
            id: orderId,
            product: newProduct,
            status: AdminOrderStatus.Ordered,
            timestamp: block.timestamp,
            paymentReceived: false
        });

        orders[orderId] = newOrder;
        orderIds.push(orderId);

        emit OrderCreated(orderId, productName);
        return (orderId);
    }

    function updateOrderStatus(
        string memory orderId,
        AdminOrderStatus newStatus
    ) public {
        require(bytes(orderId).length > 0, "Order ID must not be empty");
        require(orders[orderId].timestamp != 0, "Order does not exist");

        if (
            newStatus == AdminOrderStatus.Shipping ||
            newStatus == AdminOrderStatus.Delivered
        ) {
            require(
                orders[orderId].paymentReceived,
                "Payment not received for this order"
            );
        }

        orders[orderId].status = newStatus;

        emit OrderStatusUpdated(orderId, newStatus);
    }

    function markPaymentReceived(string memory orderId) public payable {
        require(bytes(orderId).length > 0, "Order ID must not be empty");
        require(orders[orderId].timestamp != 0, "Order does not exist");
        require(
            msg.value ==
                (orders[orderId].product.price *
                    orders[orderId].product.quantity),
            "Incorrect payment amount"
        );

        uint256 excessAmount = msg.value -
            (orders[orderId].product.price * orders[orderId].product.quantity);
        if (excessAmount > 0) {
            payable(msg.sender).transfer(excessAmount);
        }

        orders[orderId].paymentReceived = true;

        emit PaymentReceived(orderId, msg.value);
    }

    function getOrder(
        string memory orderId
    )
        public
        view
        returns (string memory, Product memory, AdminOrderStatus, uint256, bool)
    {
        require(bytes(orderId).length > 0, "Order ID must not be empty");
        require(orders[orderId].timestamp != 0, "Order does not exist");

        Order memory order = orders[orderId];
        return (
            order.id,
            order.product,
            order.status,
            order.timestamp,
            order.paymentReceived
        );
    }

    function getAllOrders() public view returns (Order[] memory) {
        Order[] memory allOrders = new Order[](orderIds.length);
        for (uint256 i = 0; i < orderIds.length; i++) {
            allOrders[i] = orders[orderIds[i]];
        }
        return allOrders;
    }

    function resetContract() public {
        uint256 length = orderIds.length;
        for (uint256 i = 0; i < length; i++) {
            delete orders[orderIds[i]];
        }
        delete orderIds;

        emit ContractReset();
    }

    // Helper function to convert uint256 to string
    function uint2str(
        uint256 _i
    ) private pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 length;
        while (j != 0) {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint256 k = length;
        j = _i;
        while (j != 0) {
            bstr[--k] = bytes1(uint8(48 + (j % 10)));
            j /= 10;
        }
        return string(bstr);
    }
}
